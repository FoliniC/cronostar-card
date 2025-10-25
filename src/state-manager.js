/**
 * State management for Temperature Scheduler Card
 * @module state-manager
 */

import { Logger, safeParseFloat, formatHourString } from './utils.js';

export class StateManager {
  constructor(card) {
    this.card = card;
    this.scheduleData = new Array(24).fill(null);
    this.dirtyIndices = new Set();
    this.isLoadingProfile = false;
  }

  /**
   * Update schedule data from Home Assistant states
   * @param {Object} hass - Home Assistant object
   * @returns {boolean} True if data changed
   */
  updateFromHass(hass) {
    const newData = [];
    let dataChanged = false;

    for (let hour = 0; hour < 24; hour++) {
      const entityId = this.getEntityIdForHour(hour);
      const stateObj = hass.states[entityId];
      let newValue = stateObj ? safeParseFloat(stateObj.state) : null;
      
      if (this.scheduleData[hour] !== newValue) {
        dataChanged = true;
      }
      newData[hour] = newValue;
    }

    if (dataChanged && !this.isLoadingProfile) {
      Logger.state("Schedule data updated from hass. Hours 00-05:", newData.slice(0, 6));
      this.scheduleData = newData;
      return true;
    } else if (dataChanged && this.isLoadingProfile) {
      Logger.state("Update ignored during profile loading");
      return false;
    }

    return false;
  }

  /**
   * Get entity ID for specific hour
   * @param {number} hour - Hour index (0-23)
   * @returns {string}
   */
  getEntityIdForHour(hour) {
    const prefix = this.card.config.entity_prefix;
    const hourStr = formatHourString(hour, this.card.hourBase);
    return `input_number.${prefix}${hourStr}`;
  }

  /**
   * Get hour label
   * @param {number} hour - Hour index
   * @returns {string}
   */
  getHourLabel(hour) {
    return `${formatHourString(hour, this.card.hourBase)}:00`;
  }

  /**
   * Update temperature for specific hour
   * @param {number} hour - Hour index
   * @param {number} value - Temperature value
   */
  updateTemperatureAtHour(hour, value) {
    const entityId = this.getEntityIdForHour(hour);
    Logger.memo(`set_value call -> entity=${entityId} hour=${this.getHourLabel(hour)} value=${value}`);
    
    this.card.hass.callService("input_number", "set_value", {
      entity_id: entityId,
      value: value,
    });

    this.dirtyIndices.add(hour);
    this.card.hasUnsavedChanges = true;
  }

  /**
   * Wait for entity to reach expected numeric state
   * @param {string} entityId - Entity ID
   * @param {number} expectedValue - Expected value
   * @param {number} timeoutMs - Timeout in ms
   * @param {number} tolerance - Acceptable difference
   * @returns {Promise}
   */
  async waitForEntityNumericState(entityId, expectedValue, timeoutMs = 3000, tolerance = 0.001) {
    const start = Date.now();
    
    return new Promise((resolve, reject) => {
      const check = () => {
        const raw = this.card.hass?.states?.[entityId]?.state;
        const current = safeParseFloat(raw);
        
        if (current !== null && Math.abs(current - expectedValue) <= tolerance) {
          Logger.memo(`State confirmed -> entity=${entityId}, expected=${expectedValue}, current=${current}`);
          resolve();
          return;
        }
        
        if (Date.now() - start > timeoutMs) {
          Logger.warn('MEMO', `Timeout waiting for ${entityId}. Expected: ${expectedValue}, current: ${current}`);
          reject(new Error(`Timeout waiting for ${entityId}`));
          return;
        }
        
        setTimeout(check, 100);
      };
      check();
    });
  }

  /**
   * Ensure all dirty values are applied to Home Assistant
   * @returns {Promise}
   */
  async ensureValuesApplied() {
    const promises = [];
    Logger.memo("Ensuring values applied. Dirty indices:", Array.from(this.dirtyIndices));

    for (const hour of Array.from(this.dirtyIndices)) {
      const entityId = this.getEntityIdForHour(hour);
      const expected = this.scheduleData[hour];
      
      if (expected !== null) {
        Logger.memo(`Waiting for entity sync -> hour=${this.getHourLabel(hour)}, entity=${entityId}, expected=${expected}`);
        promises.push(
          this.waitForEntityNumericState(entityId, expected, 4000, 0.001)
            .catch(err => Logger.warn('MEMO', `Wait failed for ${entityId}:`, err))
        );
      }
    }

    if (promises.length > 0) {
      await Promise.all(promises);
    }
    
    this.dirtyIndices.clear();
  }

  /**
   * Log persisted values
   * @param {string} context - Context label
   * @param {Array<number>} indices - Hour indices
   */
  logPersistedValues(context, indices) {
    indices.forEach(hour => {
      const entityId = this.getEntityIdForHour(hour);
      const label = this.getHourLabel(hour);
      const value = this.scheduleData[hour];
      Logger.memo(`${context} -> hour=${label}, entity=${entityId}, value=${value}`);
    });
  }

  /**
   * Reset dirty indices
   */
  clearDirty() {
    this.dirtyIndices.clear();
  }

  /**
   * Get schedule data
   * @returns {Array<number>}
   */
  getData() {
    return [...this.scheduleData];
  }

  /**
   * Set schedule data
   * @param {Array<number>} data - New schedule data
   */
  setData(data) {
    this.scheduleData = [...data];
  }
}