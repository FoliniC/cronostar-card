
/**
 * Temperature Scheduler Card - Main Component
 * @module temperature-scheduler-card
 */
import { LitElement, html } from 'lit';
import { cardStyles } from './styles.js';
import { VERSION, validateConfig, getStubConfig, PRESETS, TIMEOUTS } from './config.js';
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
      loggingEnabled: { type: Boolean },
      selectedPreset: { type: String },
      missingEntities: { type: Array }, // New property
      initialLoadComplete: { type: Boolean }, // New property
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
    this.loggingEnabled = false;
    this.selectedPreset = 'thermostat';
    this.missingEntities = []; // Initialize
    this.initialLoadComplete = false; // Initialize
    // Initialize managers
    this.localizationManager = new LocalizationManager();
    this.stateManager = new StateManager(this);
    this.profileManager = new ProfileManager(this);
    this.selectionManager = new SelectionManager(this);
    this.chartManager = new ChartManager(this);
    this.keyboardHandler = new KeyboardHandler(this);
    this.pointerHandler = new PointerHandler(this);
  }
  setConfig(config) {
    Logger.log('CONFIG', 'setConfig: config received', config);
    this.config = validateConfig(config);
    Logger.log('CONFIG', 'setConfig: validated config', this.config);
    
    // Initialize logging state
    this.loggingEnabled = this.config.logging_enabled;
    Logger.setEnabled(this.loggingEnabled);
    Logger.log('CONFIG', 'setConfig: Logger.setEnabled called with', this.loggingEnabled);
    
    // Initialize preset
    this.selectedPreset = this.config.preset;
    const hourBaseConfig = this.config.hour_base;
    if (typeof hourBaseConfig === 'object') {
      this.hourBase = hourBaseConfig.value;
      this.hourBaseDetermined = hourBaseConfig.determined;
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
      
	  Logger.log('DEBUG', '[handlePresetChange] Recreating chart with new options');
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
        this.selectedProfile = profilesSelectObj.state;
        this.profileOptions = profilesSelectObj.attributes.options || [];
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
  toggleMenu(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.isMenuOpen = !this.isMenuOpen;
    Logger.log('UI', 'toggleMenu: isMenuOpen is now', this.isMenuOpen);
    this.requestUpdate();
  }
    handleLanguageSelect(lang) {
      Logger.log('LANG', `handleLanguageSelect called with: ${lang}`);
      this.language = lang;
    this.isMenuOpen = false;
    this.chartManager.updateChartLabels();
    this.requestUpdate();
  }
  handleLoggingToggle(e) {
    e.stopPropagation();
    e.preventDefault();
    
    const newLoggingState = e.target.checked;
    Logger.log('UI', 'handleLoggingToggle: newLoggingState', newLoggingState);
    this.loggingEnabled = newLoggingState;
    this.config = { ...this.config, logging_enabled: newLoggingState };
    Logger.setEnabled(newLoggingState);
    
    Logger.log('UI', 'handleLoggingToggle: Logger enabled state is now', newLoggingState);
    
    // Close menu after a short delay to ensure the change is visible
    setTimeout(() => {
      this.isMenuOpen = false;
      this.requestUpdate();
    }, 150);
  }
  handlePresetChange(e) {
    e.stopPropagation();
    e.preventDefault();
    
    // Get the new preset value - ha-select uses detail.value or target.value
    const newPreset = e.detail?.value || e.target?.value;
    
    Logger.log('UI', 'handlePresetChange: Event type:', e.type);
    Logger.log('UI', 'handlePresetChange: newPreset', newPreset);
    Logger.log('UI', 'handlePresetChange: current preset', this.selectedPreset);
    
    if (!newPreset || newPreset === this.selectedPreset) {
      Logger.log('UI', 'handlePresetChange: No change detected, ignoring');
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
    
    Logger.log('UI', 'handlePresetChange: New config', this.config);
    
    // Re-validate config
    this.config = validateConfig(this.config);
    // Reset scheduleData to null values when preset changes
    this.stateManager.setData(new Array(24).fill(null));
    if (this.chartManager?.isInitialized()) {
	  Logger.log('DEBUG', '[handlePresetChange] Recreating chart with new options');
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
  /**
   * Initialize card components
   */
  async initializeCard() {
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
    Logger.log('INIT', "Card initialized successfully");
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
            
            <div class="menu-item-with-switch" @click=${(e) => e.stopPropagation()}>
              <span>${localize('menu.enable_logging')}</span>
              <ha-switch 
                .checked=${this.loggingEnabled} 
                @change=${this.handleLoggingToggle}
              ></ha-switch>
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
                ${Object.keys(PRESETS).map(
                  (presetKey) => html`<mwc-list-item .value=${presetKey}>${localize(`preset.${presetKey}`)}</mwc-list-item>`
                )}
              </ha-select>
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