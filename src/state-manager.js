/**
 * State management for CronoStar Card
 * @module state-manager
 */

import { Logger, safeParseFloat, formatHourString } from './utils.js';

export class StateManager {
  constructor(card) {
    this.card = card;
    this.scheduleData = new Array(24).fill(null);
    this.dirtyIndices = new Set();
    this.isLoadingProfile = false;
    this.missingEntities = []; // New property
    this.missingEntitiesLogged = false; // New flag
    this.cooldownUntil = 0;
  }

  startCooldown(ms) {
    this.cooldownUntil = Date.now() + ms;
    Logger.debug('STATE', `Cooldown started for ${ms}ms`);
  }

  /**
   * Update schedule data from Home Assistant states
   * @param {Object} hass - Home Assistant object
   * @returns {boolean} True if data changed
   */
  updateFromHass(hass) {
    if (Date.now() < this.cooldownUntil) {
      Logger.debug('STATE', 'Update ignored during cooldown period.');
      return false;
    }

    const newData = [];
    let dataChanged = false;
    const currentMissingEntities = []; // Collect missing entities for this update cycle

    for (let hour = 0; hour < 24; hour++) {
      const entityId = this.getEntityIdForHour(hour);
      const stateObj = hass.states[entityId];
      let newValue = null;
      if (stateObj) {
        newValue = safeParseFloat(stateObj.state);
        Logger.verbose('STATE', `updateFromHass loop [h:${hour}] [id:${entityId}]: state='${stateObj.state}', parsedValue=${newValue}`);
      } else {
        currentMissingEntities.push(entityId); // Add to current missing entities
        newValue = this.scheduleData[hour] !== null ? this.scheduleData[hour] : this.card.config.min_value;
        Logger.verbose('STATE', `updateFromHass loop [h:${hour}] [id:${entityId}]: entity not found, using value=${newValue}`);
      }
      
      if (this.scheduleData[hour] !== newValue) {
        dataChanged = true;
        Logger.debug('STATE', `Read from hass: ${entityId} -> ${newValue} (old value: ${this.scheduleData[hour]})`);
      }
      newData[hour] = newValue;
    }

    // Check if the list of missing entities has changed
    const missingEntitiesChanged = JSON.stringify(this.missingEntities) !== JSON.stringify(currentMissingEntities);

    this.missingEntities = currentMissingEntities; // Update the stored list

    if (this.missingEntities.length > 0 && (!this.missingEntitiesLogged || missingEntitiesChanged)) {
      const groupedEntities = this.groupMissingEntities(this.missingEntities);
      Logger.config('STATE', `Missing ${this.missingEntities.length} entities. Using default values. Please create the following input_number entities:\n\n${groupedEntities}`);
      this.missingEntitiesLogged = true; // Mark as logged
    } else if (this.missingEntities.length === 0) {
      this.missingEntitiesLogged = false; // Reset if no missing entities
    }

    if (dataChanged && !this.isLoadingProfile) {
      Logger.debug("STATE", "Schedule data updated from hass. Hours 00-05:", newData.slice(0, 6));
      this.scheduleData = newData;
      return true;
    } else if (dataChanged && this.isLoadingProfile) {
      Logger.debug("STATE", "Update ignored during profile loading");
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
    Logger.debug('MEMO', `set_value call -> entity=${entityId} hour=${this.getHourLabel(hour)} value=${value}`);
    Logger.debug('STATE', `Setting ${entityId} to ${value}`);
    
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
          Logger.debug('MEMO', `State confirmed -> entity=${entityId}, expected=${expectedValue}, current=${current}`);
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
    Logger.debug("MEMO", "Ensuring values applied. Dirty indices:", Array.from(this.dirtyIndices));

    for (const hour of Array.from(this.dirtyIndices)) {
      const entityId = this.getEntityIdForHour(hour);
      const expected = this.scheduleData[hour];
      
      if (expected !== null) {
        Logger.debug('MEMO', `Waiting for entity sync -> hour=${this.getHourLabel(hour)}, entity=${entityId}, expected=${expected}`);
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
      Logger.debug('MEMO', `${context} -> hour=${label}, entity=${entityId}, value=${value}`);
    });
  }

  /**
   * Generates YAML definitions for missing input_number entities.
   * @param {Array<string>} entities - List of missing entity IDs
   * @returns {string} Concatenated YAML definitions for the missing entities.
   */
  groupMissingEntities(entities) {
    const yamlDefinitions = [];
    const yAxisLabel = this.card.config.y_axis_label || 'Value'; // Fallback label
    const unitOfMeasurement = this.card.config.unit_of_measurement || '';

    entities.forEach(entityId => {
      const match = entityId.match(/^(input_number\.(.+?))_(\d{1,2})$/);
      if (match) {
        const prefixName = match[2]; // e.g., temperature_hour
        const hour = parseInt(match[3], 10);
        const formattedHour = hour.toString().padStart(2, '0');
        const entityName = `${prefixName}_${formattedHour}`; // e.g., temperature_hour_00

        // Use actual newlines in the string literal
        const yaml = `
${entityName}:
  name: ${yAxisLabel} at ${formattedHour}
  min: ${this.card.config.min_value}
  max: ${this.card.config.max_value}
  step: ${this.card.config.step_value}
  initial: ${this.card.config.min_value}
  unit_of_measurement: "${unitOfMeasurement}"
`;
        yamlDefinitions.push(yaml);
      } else {
        // For entities that don't match the expected pattern, just list them
        yamlDefinitions.push(`- ${entityId} (unrecognized format)`);
      }
    });
    // Join all YAML definitions into a single string, separated by two newlines for readability
    return yamlDefinitions.join('\n\n');
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
