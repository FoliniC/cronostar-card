/**
 * Profile management for Temperature Scheduler Card
 * @module profile-manager
 */

import { Logger, safeParseFloat } from './utils.js';
import { TIMEOUTS } from './config.js';

export class ProfileManager {
  constructor(card) {
    this.card = card;
    this.lastLoadedProfile = "";
  }

  /**
   * Wait for entity to reach expected state
   * @param {string} entityId - Entity ID
   * @param {string} expectedState - Expected state
   * @param {number} timeoutMs - Timeout in ms
   * @returns {Promise}
   */
  async waitForEntityState(entityId, expectedState, timeoutMs = TIMEOUTS.entityStateWait) {
    const start = Date.now();
    
    return new Promise((resolve, reject) => {
      const check = () => {
        const current = this.card.hass?.states?.[entityId]?.state;
        
        if (current === expectedState) {
          resolve();
          return;
        }
        
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Timeout waiting for ${entityId} to become '${expectedState}', current: '${current}'`));
          return;
        }
        
        setTimeout(check, 100);
      };
      check();
    });
  }

  /**
   * Save current profile
   * @param {string} profileName - Profile name
   * @returns {Promise}
   */
  async saveProfile(profileName = this.lastLoadedProfile) {
    if (!profileName) {
      Logger.warn('SAVE', "No profile specified");
      throw new Error("No profile specified for saving");
    }

    const scriptName = this.card.config.save_script.startsWith('script.')
      ? this.card.config.save_script.substring(7)
      : this.card.config.save_script;

    Logger.save(`Invoking script '${scriptName}' for profile '${profileName}'`);
    Logger.save(`Parameters: entity_prefix='${this.card.config.entity_prefix}', hour_base=${this.card.hourBase}`);

    try {
      await this.card.hass.callService("script", scriptName, {
        profile_name: profileName,
        entity_prefix: this.card.config.entity_prefix,
        hour_base: this.card.hourBase,
        payload_version: 2,
      });

      this.card.hasUnsavedChanges = false;
      this.lastLoadedProfile = profileName;
      Logger.save(`Script '${scriptName}' completed for profile '${profileName}'`);
    } catch (err) {
      Logger.error('SAVE', `Error calling save script '${scriptName}':`, err);
      alert(`Error saving profile '${profileName}'. Check console for details.`);
      throw err;
    }
  }

  /**
   * Load profile
   * @param {string} profileName - Profile name
   * @returns {Promise}
   */
  async loadProfile(profileName) {
    this.card.stateManager.isLoadingProfile = true;
    
    const preLoadData = [...this.card.stateManager.scheduleData];
    Logger.load(`PRE-load schedule data (00..05):`, preLoadData.slice(0, 6));

    const scriptName = this.card.config.load_script.startsWith('script.')
      ? this.card.config.load_script.substring(7)
      : this.card.config.load_script;

    Logger.load(`Invoking script '${scriptName}' for profile '${profileName}'`);
    Logger.load(`Parameters: entity_prefix='${this.card.config.entity_prefix}', hour_base=${this.card.hourBase}`);

    try {
      await this.card.hass.callService("script", scriptName, {
        profile_name: profileName,
        entity_prefix: this.card.config.entity_prefix,
        hour_base: this.card.hourBase,
        payload_version: 2,
      });

      Logger.load("Script completed, waiting for state propagation...");
      await new Promise(resolve => setTimeout(resolve, TIMEOUTS.statePropagation));

      // Force read updated values
      const newData = [];
      for (let hour = 0; hour < 24; hour++) {
        const entityId = this.card.stateManager.getEntityIdForHour(hour);
        const stateObj = this.card.hass.states[entityId];
        let newValue = stateObj ? safeParseFloat(stateObj.state) : null;
        newData[hour] = newValue;
      }

      Logger.load(`POST-load values read (00..05):`, newData.slice(0, 6));
      Logger.load(`POST-load values read (10..15):`, newData.slice(10, 16));

      // Log differences
      for (let i = 0; i < 24; i++) {
        if (preLoadData[i] !== newData[i]) {
          Logger.diff(`idx=${i} hour=${this.card.stateManager.getHourLabel(i)}: ${preLoadData[i]} -> ${newData[i]}`);
        }
      }

      // Update state
      this.card.stateManager.setData(newData);

      // Update chart if initialized
      if (this.card.chartManager && this.card.chartManager.isInitialized()) {
        this.card.chartManager.updateData(newData);
        Logger.load("Chart updated with new data");
      }

      this.card.hasUnsavedChanges = false;
      this.lastLoadedProfile = profileName;
      Logger.load(`Profile '${profileName}' loaded completely`);

    } catch (err) {
      Logger.error('LOAD', `Error calling load script '${scriptName}':`, err);
      alert(`Error loading profile '${profileName}'. Check console for details.`);
      throw err;
    } finally {
      this.card.stateManager.isLoadingProfile = false;
    }
  }

  /**
   * Handle profile selection change
   * @param {Event} e - Selection event
   */
  async handleProfileSelection(e) {
    this.card.suppressClickUntil = Date.now() + TIMEOUTS.menuSuppression + 500;
    
    // Snapshot selection for restoration
    if (this.card.selectionManager) {
      this.card.selectionManager.snapshotSelection();
    }

    const newProfile = e?.target?.value || e?.detail?.value || '';
    if (!newProfile || newProfile === this.card.selectedProfile) {
      return;
    }

    const previousProfile = this.lastLoadedProfile || this.card.selectedProfile;

    // Auto-save previous profile if changes exist
    if (this.card.hasUnsavedChanges && previousProfile) {
      try {
        Logger.save(`Auto-saving previous profile '${previousProfile}' before switching`);
        await this.card.stateManager.ensureValuesApplied();
        this.card.stateManager.logPersistedValues(
          `auto-save profile '${previousProfile}'`,
          Array.from(this.card.stateManager.dirtyIndices)
        );
        await this.saveProfile(previousProfile);
        Logger.save(`Auto-save of '${previousProfile}' completed`);
      } catch (err) {
        Logger.error('SAVE', "Error during auto-save:", err);
      }
    }

    // Update profile selector
    this.card.selectedProfile = newProfile;
    try {
      await this.card.hass.callService("input_select", "select_option", {
        entity_id: this.card.config.profiles_select_entity,
        option: newProfile,
      });
      await this.waitForEntityState(this.card.config.profiles_select_entity, newProfile, TIMEOUTS.entityStateWait);
    } catch (err) {
      Logger.warn('LOAD', "select_option or wait failed:", err);
    }

    // Load new profile
    try {
      await this.loadProfile(newProfile);
      
      // Restore selection
      if (this.card.selectionManager) {
        this.card.selectionManager.restoreSelectionFromSnapshot();
      }
      
      this.card.suppressClickUntil = Date.now() + TIMEOUTS.clickSuppression;
    } catch (err) {
      Logger.error('LOAD', "Error during auto-load:", err);
    }
  }

  /**
   * Reset changes (reload current profile)
   */
  async resetChanges() {
    const profileToReload = this.lastLoadedProfile || this.card.selectedProfile;
    if (!profileToReload) {
      Logger.warn('LOAD', "No profile to reload");
      return;
    }

    if (this.card.selectionManager) {
      this.card.selectionManager.snapshotSelection();
    }

    try {
      await this.loadProfile(profileToReload);
      
      if (this.card.selectionManager) {
        this.card.selectionManager.restoreSelectionFromSnapshot();
      }
    } catch (err) {
      Logger.error('LOAD', "Error while reloading profile:", err);
    }
  }
}