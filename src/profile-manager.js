/**
 * Profile management for CronoStar Card
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

    Logger.info('SAVE', `Invoking script '${scriptName}' for profile '${profileName}'`);
    Logger.info('SAVE', `Parameters: entity_prefix='${this.card.config.entity_prefix}', hour_base=${this.card.hourBase}`);
    Logger.info('SAVE', `Data to save: ${JSON.stringify(this.card.stateManager.scheduleData)}`);

    try {
      await this.card.hass.callService("script", scriptName, {
        profile_name: profileName,
        entity_prefix: this.card.config.entity_prefix,
        hour_base: this.card.hourBase,
        payload_version: 2,
      });

      this.card.hasUnsavedChanges = false;
      this.lastLoadedProfile = profileName;
      Logger.info('SAVE', `Script '${scriptName}' completed for profile '${profileName}'`);
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
    
    const selectEntityId = this.card.config.profiles_select_entity;
    let profileTextEntityPrefix = 'input_text.';
    if (selectEntityId) {
      const parts = selectEntityId.split('.');
      if (parts.length === 2) {
        let baseName = parts[1];
        // Remove 's' if the base name ends with 's' (e.g., 'profiles' -> 'profile')
        if (baseName.endsWith('s')) {
          baseName = baseName.slice(0, -1);
        }
        profileTextEntityPrefix += `${baseName}_`;
      }
    } else {
      // Fallback if profiles_select_entity is not configured, though it should be for profiles
      profileTextEntityPrefix += 'profile_';
    }

    const profileTextEntityId = `${profileTextEntityPrefix}${profileName.toLowerCase().replace(/\s+/g, '_')}`;
    const profileTextState = this.card.hass.states[profileTextEntityId];

    if (!profileTextState || !profileTextState.state) {
        Logger.error('LOAD', `Profile input_text entity '${profileTextEntityId}' not found or empty.`);
        alert(`Error: Profile '${profileName}' input_text entity not found or empty.`);
        this.card.stateManager.isLoadingProfile = false;
        throw new Error(`Profile input_text entity '${profileTextEntityId}' not found or empty.`);
    }

    let newData;
    try {
        newData = JSON.parse(profileTextState.state);
        // Ensure values are numbers, not strings from JSON.parse
        newData = newData.map(val => safeParseFloat(val));
    } catch (e) {
        Logger.error('LOAD', `Error parsing JSON from '${profileTextEntityId}':`, e);
        alert(`Error: Invalid JSON in profile '${profileName}'.`);
        this.card.stateManager.isLoadingProfile = false;
        throw e;
    }

    // Update card's internal state and chart directly from input_text
    this.card.stateManager.setData(newData);
    this.card.chartManager.updateData(newData);
    Logger.info('LOAD', `Profile '${profileName}' loaded from input_text. Hours 00-05:`, newData.slice(0, 6));

    // Now, call the script to update the input_number entities
    const scriptName = this.card.config.load_script.startsWith('script.')
      ? this.card.config.load_script.substring(7)
      : this.card.config.load_script;

    Logger.info('LOAD', `Invoking script '${scriptName}' to set input_numbers for profile '${profileName}'`);
    Logger.info('LOAD', `Parameters: entity_prefix='${this.card.config.entity_prefix}', hour_base=${this.card.hourBase}, schedule_data=${JSON.stringify(newData)}`);

    try {
      await this.card.hass.callService("script", scriptName, {
        profile_name: profileName,
        entity_prefix: this.card.config.entity_prefix,
        hour_base: this.card.hourBase,
        schedule_data: newData, // Pass the data to the script
        payload_version: 2,
      });

      Logger.info("LOAD", "Script completed, waiting for state propagation...");
      await new Promise(resolve => setTimeout(resolve, TIMEOUTS.statePropagation));

      this.card.hasUnsavedChanges = false;
      this.lastLoadedProfile = profileName;
      Logger.info('LOAD', `Profile '${profileName}' loaded completely`);

    } catch (err) {
      Logger.error('LOAD', `Error calling load script '${scriptName}':`, err);
      alert(`Error setting input_numbers for profile '${profileName}'. Check console for details.`);
      throw err;
    } finally {
      this.card.stateManager.startCooldown(500);
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
    if (!newProfile) return;

    if (newProfile === '__ADD_NEW__') {
      this.createNewProfile();
      // Reset the selector back to the previously selected profile
      e.target.value = this.card.selectedProfile;
      return;
    }

    if (newProfile === this.card.selectedProfile) {
      return;
    }

    const previousProfile = this.lastLoadedProfile || this.card.selectedProfile;

    // Auto-save previous profile if changes exist
    if (this.card.hasUnsavedChanges && previousProfile) {
      try {
        Logger.info('SAVE', `Auto-saving previous profile '${previousProfile}' before switching`);
        await this.card.stateManager.ensureValuesApplied();
        this.card.stateManager.logPersistedValues(
          `auto-save profile '${previousProfile}'`,
          Array.from(this.card.stateManager.dirtyIndices)
        );
        await this.saveProfile(previousProfile);
        Logger.info('SAVE', `Auto-save of '${previousProfile}' completed`);
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

  async createNewProfile() {
    const newProfileName = prompt("Enter the name for the new profile:");
    if (!newProfileName || newProfileName.trim() === '') {
      Logger.info('PROFILE', 'Profile creation cancelled.');
      return;
    }

    const selectEntity = this.card.config.profiles_select_entity;
    if (!selectEntity) {
      alert("Cannot add a new profile because 'profiles_select_entity' is not configured for this card.");
      return;
    }

    const currentOptions = this.card.hass.states[selectEntity]?.attributes?.options || [];

    if (currentOptions.includes(newProfileName)) {
      alert(`Profile "${newProfileName}" already exists.`);
      return;
    }

    // --- Generate YAML and Instructions ---
    const slug = newProfileName.trim().toLowerCase().replace(/\s+/g, '_');
    const selectEntityId = selectEntity.split('.')[1];
    const textEntityPrefix = selectEntityId.endsWith('s') ? selectEntityId.slice(0, -1) : selectEntityId;
    const textEntityId = `${textEntityPrefix}_${slug}`;
    const newOptions = [...currentOptions, newProfileName.trim()];

    const inputTextYaml = `
# 1. Add this to your input_text configuration:
input_text:
  ${textEntityId}:
    name: "Profile ${newProfileName.trim()} (JSON)"
    max: 255
`;

    const inputSelectYaml = `
# 2. Update your input_select configuration (remove the '#' if this is a standalone file):
#input_select:
${selectEntityId}:
  options:
${newOptions.map(opt => `    - "${opt}"`).join('\n')}
`;

    // Show the YAML snippets in a custom dialog within the card
    this.card.displayYamlForProfileCreation(inputTextYaml, inputSelectYaml);
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
