
/**
 * Temperature Scheduler Card - Main Component
 * @module temperature-scheduler-card
 */
import { LitElement, html } from 'lit';
import { cardStyles } from './styles.js';
import { VERSION, validateConfig, getStubConfig, PRESETS, TIMEOUTS, LOG_LEVELS } from './config.js';
import { StateManager } from './state-manager.js';
import { ProfileManager } from './profile-manager.js';
import { SelectionManager } from './selection-manager.js';
import { ChartManager } from './chart-manager.js';
import { KeyboardHandler } from './keyboard-handler.js';
import { PointerHandler } from './pointer-handler.js';
import { Logger } from './utils.js';
import { LocalizationManager } from './localization-manager.js';
export class CronoStarCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
      isPaused: { type: Boolean },
      selectedProfile: { type: String },
      profileOptions: { type: Array },
      hasUnsavedChanges: { type: Boolean },
      isMenuOpen: { type: Boolean },
      language: { type: String },
      log_level: { type: String },
      selectedPreset: { type: String },
      missingEntities: { type: Array },
      initialLoadComplete: { type: Boolean },
      _isShowingYaml: { state: true },
      _yamlToShow: { state: true },
      _yamlStep: { state: true },
    };
  }

  static get styles() {
    return cardStyles;
  }

  constructor() {
    super();
    
    // Configuration
    this.config = null;
    this.hourBase = 0;
    this.hourBaseDetermined = false;
    // State
    this.isPaused = false;
    this.selectedProfile = "";
    this.profileOptions = [];
    this.hasUnsavedChanges = false;
    this.suppressClickUntil = 0;
    this.isMenuOpen = false;
    this.language = "it";
    this.log_level = "info";
    this.selectedPreset = 'thermostat';
    this.missingEntities = []; // Initialize
    this.initialLoadComplete = false; // Initialize
    this.wasLongPress = false;
    this._customPresets = {}; // Initialize custom presets storage

    // YAML Display State
    this._isShowingYaml = false;
    this._yamlToShow = '';
    this._yamlStep = 1;
    this._secondYaml = '';

    // Initialize managers
    this.localizationManager = new LocalizationManager();
    this.stateManager = new StateManager(this);
    this.profileManager = new ProfileManager(this);
    this.selectionManager = new SelectionManager(this);
    this.chartManager = new ChartManager(this);
    this.keyboardHandler = new KeyboardHandler(this);
    this.pointerHandler = new PointerHandler(this);
  }

  displayYamlForProfileCreation(inputTextYaml, inputSelectYaml) {
    this._yamlToShow = inputTextYaml;
    this._secondYaml = inputSelectYaml;
    this._yamlStep = 1;
    this._isShowingYaml = true;
  }

  _handleYamlDialogClick() {
    if (this._yamlStep === 1) {
      this._yamlToShow = this._secondYaml;
      this._yamlStep = 2;
    } else {
      this._isShowingYaml = false;
      this._yamlToShow = '';
      this._secondYaml = '';
      this._yamlStep = 1;
      this.chartManager.destroy(); // Destroy chart before re-rendering main view
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('_isShowingYaml') && !this._isShowingYaml) {
      // When YAML dialog is closed, the canvas is re-rendered, so we must re-initialize the chart
      this.initializeCard();
    }
  }

  _renderYamlDialog() {
    const instructions = this._yamlStep === 1
      ? 'To add the new profile, first copy the YAML for the new input_text entity:'
      : 'Next, copy the YAML to update your input_select configuration:';
    const buttonText = this._yamlStep === 1 ? 'Next' : 'Close';

    return html`
      <ha-card>
        <div class="yaml-display">
          <p>${instructions}</p>
          <textarea readonly>${this._yamlToShow}</textarea>
          <mwc-button outlined @click=${this._handleYamlDialogClick}>${buttonText}</mwc-button>
        </div>
      </ha-card>
    `;
  }

  setConfig(config) {
    Logger.debug('CONFIG', 'setConfig: config received', config);
    this.config = validateConfig(config);
    Logger.debug('CONFIG', 'setConfig: validated config', this.config);
    
    // Initialize logging state
    this.log_level = this.config.log_level;
    Logger.setLevel(this.log_level);
    Logger.info('CONFIG', 'setConfig: Logger.setLevel called with', this.log_level);
    
    // Initialize preset
    this.selectedPreset = this.config.preset;
    const hourBaseConfig = this.config.hour_base;
    if (typeof hourBaseConfig === 'object') {
      this.hourBase = hourBaseConfig.value;
      this.hourBaseDetermined = hourBaseConfig.determined;
    }

    // Load custom presets
    if (this.config.cronostar_custom_presets_entity && this.hass) {
      const customPresetsState = this.hass.states[this.config.cronostar_custom_presets_entity];
      if (customPresetsState && customPresetsState.state !== 'unknown' && customPresetsState.state !== 'unavailable') {
        try {
          this._customPresets = JSON.parse(customPresetsState.state);
          Logger.debug('PRESET', 'Loaded custom presets:', this._customPresets);
        } catch (e) {
          Logger.error('PRESET', 'Error parsing custom presets JSON:', e);
          this._customPresets = {};
        }
      }
    }
  }
  /**
   * Get stub configuration for card picker
   * @returns {Object}
   */
  static getStubConfig() {
    return getStubConfig();
  }
  /**
   * Detect hour base from entities (0-based vs 1-based)
   * @param {Object} hass - Home Assistant object
   */
  detectHourBase(hass) {
    if (this.hourBaseDetermined) return;
    const prefix = this.config.entity_prefix;
    let countZero = 0;
    let countOne = 0;
    // Check 0-based (00-23)
    for (let i = 0; i < 24; i++) {
      const id = `input_number.${prefix}${i.toString().padStart(2, '0')}`;
      if (hass.states[id] !== undefined) countZero++;
    }
    // Check 1-based (01-24)
    for (let i = 1; i <= 24; i++) {
      const id = `input_number.${prefix}${i.toString().padStart(2, '0')}`;
      if (hass.states[id] !== undefined) countOne++;
    }
    this.hourBase = countOne > countZero ? 1 : 0;
    this.hourBaseDetermined = true;
    
    Logger.base(
      `Hour base detection -> 0-based: ${countZero}, 1-based: ${countOne}. ` +
      `Selected: ${this.hourBase} (${this.hourBase === 0 ? '00-23' : '01-24'})`
    );
  }
  /**
   * Set hass object (called by Home Assistant)
   * @param {Object} hass - Home Assistant object
   */
  set hass(hass) {
    this._hass = hass;
    
    if (this.config && this.config.entity_prefix) {
      this.detectHourBase(hass);
      
            const dataChanged = this.stateManager.updateFromHass(hass);
      
            this.missingEntities = this.stateManager.missingEntities; // Update missing entities
      
            if (dataChanged && this.chartManager.isInitialized()) {
      
	  Logger.debug('CHART', '[handlePresetChange] Recreating chart with new options');
	  this.chartManager.recreateChartOptions();
	} else {
	  // Normal update if chart not yet initialized
	  this.chartManager?.updateData(this.stateManager.getData());
	}

      // Update pause state
      const pauseStateObj = hass.states[this.config.pause_entity];
      if (pauseStateObj) {
        this.isPaused = pauseStateObj.state === "on";
      }
      // Update profile options
      const profilesSelectObj = hass.states[this.config.profiles_select_entity];
      if (profilesSelectObj) {
        const oldSelectedProfile = this.selectedProfile;
        this.selectedProfile = profilesSelectObj.state;
        this.profileOptions = profilesSelectObj.attributes.options || [];

        // NEW LOGIC: Load profile on initial setup or if selected profile changes
        if (this.selectedProfile && this.selectedProfile !== oldSelectedProfile) {
            Logger.info('LOAD', `Initial/Changed profile detected: '${this.selectedProfile}'. Attempting to load.`);
            this.profileManager.loadProfile(this.selectedProfile);
        }
      }
    }
  }
  /**
   * Get hass object
   * @returns {Object}
   */
  get hass() {
    return this._hass;
  }

  async _saveCustomPresets(newPresets) {
    if (!this.config.cronostar_custom_presets_entity) {
      Logger.error('PRESET', 'Cannot save custom presets: cronostar_custom_presets_entity is not configured.');
      alert('Error: cronostar_custom_presets_entity is not configured in the card settings.');
      return;
    }

    try {
      await this.hass.callService('input_text', 'set_value', {
        entity_id: this.config.cronostar_custom_presets_entity,
        value: JSON.stringify(newPresets),
      });
      this._customPresets = newPresets;
      Logger.info('PRESET', 'Custom presets saved successfully.', newPresets);
    } catch (err) {
      Logger.error('PRESET', 'Error saving custom presets:', err);
      alert('Error saving custom presets. Check console for details.');
    }
  }
  toggleMenu(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.isMenuOpen = !this.isMenuOpen;
    Logger.debug('UI', 'toggleMenu: isMenuOpen is now', this.isMenuOpen);
    this.requestUpdate();
  }
    handleLanguageSelect(lang) {
      Logger.debug('LANG', `handleLanguageSelect called with: ${lang}`);
      this.language = lang;
    this.isMenuOpen = false;
    this.chartManager.updateChartLabels();
    this.requestUpdate();
  }
  handleLogLevelChange(e) {
    e.stopPropagation();
    const newLevel = e.detail?.value || e.target.value;
    if (newLevel && newLevel !== this.log_level) {
      this.log_level = newLevel;
      this.config = { ...this.config, log_level: newLevel };
      Logger.setLevel(newLevel);
      this.isMenuOpen = false;
      this.requestUpdate();
    }
  }
  handlePresetChange(e) {
    e.stopPropagation();
    e.preventDefault();
    
    // Get the new preset value - ha-select uses detail.value or target.value
    const newPreset = e.detail?.value || e.target?.value;
    
    Logger.debug('UI', 'handlePresetChange: Event type:', e.type);
    Logger.debug('UI', 'handlePresetChange: newPreset', newPreset);
    Logger.debug('UI', 'handlePresetChange: current preset', this.selectedPreset);

    if (newPreset === '__ADD_NEW_PRESET__') {
      this.handleAddNewPreset();
      // Reset the selector back to the previously selected preset
      e.target.value = this.selectedPreset;
      return;
    }
    
    if (!newPreset || newPreset === this.selectedPreset) {
      Logger.debug('UI', 'handlePresetChange: No change detected, ignoring');
      return;
    }
    this.selectedPreset = newPreset;
    
    // Rebuild config with new preset
    const presetConfig = PRESETS[newPreset];
    this.config = {
      ...this.config,
      preset: newPreset,
      ...presetConfig // Apply preset values
    };
    
    Logger.debug('UI', 'handlePresetChange: New config', this.config);
    
    // Re-validate config
    this.config = validateConfig(this.config);
    // Reset scheduleData to null values when preset changes
    this.stateManager.setData(new Array(24).fill(null));
    if (this.chartManager?.isInitialized()) {
	  Logger.debug('CHART', '[handlePresetChange] Recreating chart with new options');
	  this.chartManager.recreateChartOptions();
	} else {
	  // Normal update if chart not yet initialized
	  this.chartManager?.updateData(this.stateManager.scheduleData);
	}
    // Close menu and force update
    setTimeout(() => {
      this.isMenuOpen = false;
      this.requestUpdate();
      
      // Update chart if initialized
      if (this.chartManager.isInitialized()) {
        const chart = this.chartManager.getChart();
        if (chart) {
          chart.options.scales.y.min = this.config.min_value;
          chart.options.scales.y.max = this.config.max_value;
          chart.update(); // Force chart to re-render with new scale
        }
        this.chartManager.updateChartLabels();
      }
    }, 150);
  }
  handleSelectAll() {
    this.selectionManager.selectAll();
    this.isMenuOpen = false;
  }
    handleHelp() {
      alert(this.localizationManager.localize(this.language, 'help.text'));
      this.isMenuOpen = false;
    }
  
  async handleAddNewPreset() {
    if (!this.config.cronostar_custom_presets_entity) {
      const yaml = `input_text:
  cronostar_custom_presets:
    name: CronoStar Custom Presets
    initial: "{}"
    max: 2000 # Adjust as needed
`;

      const instructions = `
To add new presets, you first need to configure a storage entity.

1. Copy the YAML below and add it to your configuration.yaml:
--------------------------------------------------
${yaml}--------------------------------------------------

2. Go to Developer Tools > YAML and click "RELOAD INPUT TEXTS".

3. Once reloaded, refresh your Home Assistant dashboard.

After these steps, you can try adding a new preset again.
    `;

      prompt(instructions, yaml);
      return;
    }
    
        const presetName = prompt("Enter a unique name for the new preset:");
        if (!presetName || presetName.trim() === '') {
          Logger.info('PRESET', 'Preset creation cancelled.');
          return;
        }
    
        const existingPresets = { ...PRESETS, ...this._customPresets };
        if (existingPresets[presetName]) {
          alert(`Preset "${presetName}" already exists. Choose a different name.`);
          return;
        }
    
        const defaultPreset = existingPresets[this.selectedPreset] || PRESETS.thermostat;
    
        const newPresetTemplate = {
          title: `CronoStar ${presetName}`,
          entity_prefix: `${presetName.toLowerCase().replace(/\s+/g, '_')}_hour_`,
          y_axis_label: defaultPreset.y_axis_label || "Value",
          unit_of_measurement: defaultPreset.unit_of_measurement || "" ,
          min_value: defaultPreset.min_value || 0,
          max_value: defaultPreset.max_value || 25,
          step_value: defaultPreset.step_value || 0.5,
          pause_entity: defaultPreset.pause_entity || null,
          profiles_select_entity: defaultPreset.profiles_select_entity || null,
          save_script: defaultPreset.save_script || null,
          load_script: defaultPreset.load_script || null,
          // is_switch_preset: false, // Uncomment and set to true for switch types
        };
    
            const instructions = `
        1. Review and modify the JSON below for your new preset.
        2. Copy the final JSON (optional, for backup).
        
        3. Click OK to save this new preset to your 'custom_presets_entity'.
            `;    
        const userEditedJson = prompt(instructions, JSON.stringify(newPresetTemplate, null, 2));
        
        if (userEditedJson !== null) {
          try {
            const newPreset = JSON.parse(userEditedJson);
            const updatedCustomPresets = { ...this._customPresets, [presetName]: newPreset };
            await this._saveCustomPresets(updatedCustomPresets);
            
            // Force card to re-render with new preset available
            // This mimics setConfig being called from HA
            this.selectedPreset = presetName;
            this.config = { ...this.config, preset: presetName };
            this.requestUpdate();
            // Reload all data from HA to ensure template engine picks up new preset
            // this.hass.callService('homeassistant', 'reload_core_config'); // This can be too broad
            // Better to ask user to reload input_texts via dev tools after saving the custom_presets_entity
            alert(`Preset "${presetName}" created and saved. Please reload your custom_presets_entity (input_text)`);
            this.isMenuOpen = false;
          } catch (e) {
            Logger.error('PRESET', 'Error creating new preset:', e);
            alert(`Error creating preset: Invalid JSON or other issue. Check console.`);
          }
        }
      }  
    /**
     * Toggle pause state
   */
  togglePause() {
    this.hass.callService("input_boolean", "toggle", {
      entity_id: this.config.pause_entity,
    });
  }
  /**
   * First update lifecycle
   */
  async firstUpdated() {
    super.firstUpdated();
    await this.initializeCard();
    this.initialLoadComplete = true; // Mark initial load as complete
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.initialLoadComplete) {
        this.initializeCard();
    }
  }
  /**
   * Initialize card components
   */
  async initializeCard() {
    await this.updateComplete;
    if (this.chartManager.isInitialized()) {
      return;
    }

    const canvas = this.shadowRoot.getElementById("myChart");
    if (!canvas) {
      Logger.error('INIT', "Canvas element not found");
      return;
    }
    // Initialize chart
    const success = await this.chartManager.initChart(canvas);
    if (!success) {
      Logger.error('INIT', "Failed to initialize chart");
      return;
    }
    // Attach pointer listeners
    this.pointerHandler.attachListeners(canvas);
    // Setup keyboard handling
    const chartContainer = this.shadowRoot.querySelector(".chart-container");
    if (chartContainer) {
      chartContainer.setAttribute('tabindex', '0');
      this.keyboardHandler.attachListeners(chartContainer);
      chartContainer.addEventListener('pointerdown', () => {
        chartContainer.focus();
        this.keyboardHandler.enable();
      });
      chartContainer.focus();
    }
    Logger.info('INIT', "Card initialized successfully");
  }
  /**
   * Disconnected callback
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    
    // Cleanup chart
    this.chartManager.destroy();
    // Detach listeners
    const canvas = this.shadowRoot?.getElementById("myChart");
    if (canvas) {
      this.pointerHandler.detachListeners(canvas);
    }
    const chartContainer = this.shadowRoot?.querySelector(".chart-container");
    if (chartContainer) {
      this.keyboardHandler.detachListeners(chartContainer);
    }
  }
  /**
   * Render card
   * @returns {TemplateResult}
   */
  render() {
    if (this._isShowingYaml) {
      return this._renderYamlDialog();
    }

    const isLoading = this.stateManager.scheduleData.some(val => val === null);
    const localize = (key, search, replace) => this.localizationManager.localize(this.language, key, search, replace);
    const title = localize('ui.title');
    return html`
      <ha-card>
        <div class="card-header">
          <div class="name">${title} (v${VERSION})</div>
          <button class="menu-button" @click=${(e) => this.toggleMenu(e)}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
            </svg>
          </button>
        </div>
        ${this.isMenuOpen ? html`
          <div class="menu-content" @click=${(e) => e.stopPropagation()}>
            <mwc-list-item @click=${this.handleSelectAll}>${localize('menu.select_all')}</mwc-list-item>
            <mwc-list-item @click=${this.handleHelp}>${localize('menu.help')}</mwc-list-item>
            
            <div class="menu-item-with-select">
              <ha-select
                label="${localize('menu.log_level')}"
                .value=${this.log_level}
                @selected=${this.handleLogLevelChange}
              >
                ${LOG_LEVELS.map(
                  (level) => html`<mwc-list-item .value=${level}>${level}</mwc-list-item>`
                )}
              </ha-select>
            </div>
            <div class="menu-item-with-select">
              <ha-select
                label="${localize('menu.select_preset')}"
                .value=${this.selectedPreset}
                @selected=${this.handlePresetChange}
                @opened=${() => {
                  this.keyboardHandler.disable();
                  this.suppressClickUntil = Date.now() + TIMEOUTS.menuSuppression;
                }}
                @closed=${() => {
                  this.keyboardHandler.enable();
                  const container = this.shadowRoot.querySelector(".chart-container");
                  container?.focus();
                  this.suppressClickUntil = Date.now() + TIMEOUTS.clickSuppression;
                }}
              >
                ${Object.keys({ ...PRESETS, ...this._customPresets }).map(
                  (presetKey) => html`<mwc-list-item .value=${presetKey}>${localize(`preset.${presetKey}`) || presetKey}</mwc-list-item>`
                )}
                <mwc-list-item value="__ADD_NEW_PRESET__"><b>Add new preset...</b></mwc-list-item>
              </ha-select>
            </div>
            <div class="menu-info">
              <div class="info-row">
                <span class="info-label">Entity Prefix:</span>
                <input class="info-value" readonly .value=${this.config.entity_prefix}>
              </div>
              <div class="info-row">
                <span class="info-label">Profile Entity:</span>
                <input class="info-value" readonly .value=${this.config.profiles_select_entity || 'none'}>
              </div>
              <div class="info-row">
                <span class="info-label">Profiles:</span>
                <input class="info-value" readonly .value=${this.profileOptions.join(', ') || 'none'}>
              </div>
              <div class="info-row">
                <span class="info-label">'Max' Enabled:</span>
                <input class="info-value" readonly .value=${this.config.allow_max_value ? 'Yes' : 'No'}>
              </div>
            </div>
            <div class="language-menu">
              <mwc-list-item>${localize('menu.language')}</mwc-list-item>
              <mwc-button @click=${() => this.handleLanguageSelect('en')}>EN</mwc-button>
              <mwc-button @click=${() => this.handleLanguageSelect('it')}>IT</mwc-button>
            </div>
          </div>
        ` : ''}
                        <div class="card-content">
                
                          <div class="chart-container">
                            ${this.missingEntities.length > 0 && this.initialLoadComplete
                              ? html`<div class="loading-overlay anomalous-operation-overlay">
                                  <div>
                                    ${localize('ui.anomalous_operation_warning')}
                                  </div>
                                </div>`
                              : isLoading
                                ? html`<div class="loading-overlay"><div>${localize('ui.loading')}</div></div>`
                                : ''}
                            <canvas id="myChart"></canvas>
                            ${this.missingEntities.length > 0 && this.initialLoadComplete
                              ? html`<div class="anomalous-watermark">${localize('ui.anomalous_operation_watermark')}</div>`
                              : ''}
            <div id="selection-rect" class="selection-rect"></div>
            <div id="drag-value-display" class="drag-value-display"></div>
          </div>
          <div class="controls">
            <div class="control-group">
              <ha-switch
                .checked=${this.isPaused}
                @change=${this.togglePause}
              ></ha-switch>
              <span>${localize('ui.pause')}</span>
            </div>
            <div class="control-group">
              <ha-select
                label="${localize('ui.profile')}"
                .value=${this.selectedProfile}
                @selected=${(e) => this.profileManager.handleProfileSelection(e)}
                @opened=${() => {
                  this.keyboardHandler.disable();
                  this.suppressClickUntil = Date.now() + 1000;
                }}
                @closed=${() => {
                  this.keyboardHandler.enable();
                  const container = this.shadowRoot.querySelector(".chart-container");
                  container?.focus();
                  this.suppressClickUntil = Date.now() + 500;
                }}
              >
                ${this.profileOptions.map(
                  (option) => html`<mwc-list-item .value=${option}>${option}</mwc-list-item>`
                )}
                <mwc-list-item value="__ADD_NEW__"><b>Add new profile...</b></mwc-list-item>
              </ha-select>
            </div>
            ${this.hasUnsavedChanges ? html`
              <div class="control-group">
                <span class="unsaved-indicator">● ${localize('ui.unsaved_changes')}</span>
                <mwc-button outlined @click=${() => this.profileManager.resetChanges()}>
                  ${localize('ui.reset')}
                </mwc-button>
              </div>
            ` : ''}
          </div>
        </div>
      </ha-card>
    `;
  }
}