/**
 * Temperature Scheduler Card - Main Component
 * @module temperature-scheduler-card
 */

import { LitElement, html } from 'lit-element';
import { cardStyles } from './styles.js';
import { VERSION, validateConfig, getStubConfig } from './config.js';
import { StateManager } from './state-manager.js';
import { ProfileManager } from './profile-manager.js';
import { SelectionManager } from './selection-manager.js';
import { ChartManager } from './chart-manager.js';
import { KeyboardHandler } from './keyboard-handler.js';
import { PointerHandler } from './pointer-handler.js';
import { Logger } from './utils.js';

export class TemperatureSchedulerCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
      isPaused: { type: Boolean },
      selectedProfile: { type: String },
      profileOptions: { type: Array },
      hasUnsavedChanges: { type: Boolean },
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

    // Initialize managers
    this.stateManager = new StateManager(this);
    this.profileManager = new ProfileManager(this);
    this.selectionManager = new SelectionManager(this);
    this.chartManager = new ChartManager(this);
    this.keyboardHandler = new KeyboardHandler(this);
    this.pointerHandler = new PointerHandler(this);
  }

  /**
   * Set card configuration
   * @param {Object} config - User configuration
   */
  setConfig(config) {
    this.config = validateConfig(config);
    
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
      if (dataChanged && this.chartManager.isInitialized()) {
        this.chartManager.updateData(this.stateManager.getData());
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

    return html`
      <ha-card header="${this.config.title} (v${VERSION})">
        <div class="card-content">
          <div class="chart-container">
            ${isLoading 
              ? html`<div class="loading-overlay"><div>Caricamento dati...</div></div>` 
              : ''}
            <canvas id="myChart"></canvas>
            <div id="selection-rect" class="selection-rect"></div>
            <div id="drag-value-display" class="drag-value-display"></div>
          </div>

          <div class="controls">
            <div class="control-group">
              <ha-switch
                .checked=${this.isPaused}
                @change=${this.togglePause}
              ></ha-switch>
              <span>Pausa</span>
            </div>

            <div class="control-group">
              <ha-select
                label="Profilo"
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
                <span class="unsaved-indicator">● Modifiche non salvate</span>
                <mwc-button outlined @click=${() => this.profileManager.resetChanges()}>
                  Reset
                </mwc-button>
              </div>
            ` : ''}
          </div>
        </div>
      </ha-card>
    `;
  }
}