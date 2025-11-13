/**
 * Configuration management for Temperature Scheduler Card
 * @module config
 */

export const VERSION = '3.3.1';

export const PRESETS = {
  thermostat: {
    title: "CronoStar",
    entity_prefix: "temperature_hour_",
    y_axis_label: "Temperature",
    unit_of_measurement: '°C',
    min_value: 15,
    max_value: 30,
    step_value: 0.5,
    pause_entity: "input_boolean.temperature_schedule_paused",
    profiles_select_entity: "input_select.temperature_profiles",
    save_script: "script.cronostar_save_profile",
    load_script: "script.cronostar_load_profile",
  },
  ev_charging: {
    title: "CronoStar EV Charging",
    entity_prefix: "ev_charge_hour_",
    y_axis_label: "Power",
    unit_of_measurement: 'kW',
    min_value: 0,
    max_value: 11,
    step_value: 0.5,
    // These entities would need to be defined by the user for EV charging
    pause_entity: null,
    profiles_select_entity: null,
    save_script: null,
    load_script: null,
  },
  generic_kwh: { // New preset for generic kWh scheduling
    title: "CronoStar Generic kWh",
    entity_prefix: "generic_kwh_hour_", // A generic prefix
    y_axis_label: "Energy",
    unit_of_measurement: 'kWh',
    min_value: 0,
    max_value: 7,
    step_value: 0.5,
    pause_entity: null,
    profiles_select_entity: null,
    save_script: null,
    load_script: null,
  },
  generic_temperature: {
    title: "CronoStar Generic Temperature",
    entity_prefix: "generic_temp_hour_",
    y_axis_label: "Temperature",
    unit_of_measurement: '°C',
    min_value: 0,
    max_value: 40,
    step_value: 0.5,
    pause_entity: null,
    profiles_select_entity: null,
    save_script: null,
    load_script: null,
  },
  generic_switch: {
    title: "CronoStar Generic Switch",
    entity_prefix: "generic_switch_hour_",
    y_axis_label: "State",
    unit_of_measurement: '', // No unit for switch state
    min_value: 0, // 0 for Off
    max_value: 1, // 1 for On
    step_value: 1, // Only allow integer steps (0 or 1)
    pause_entity: null,
    profiles_select_entity: null,
    save_script: null,
    load_script: null,
    // Custom property to indicate this is a switch type, for Y-axis formatting
    is_switch_preset: true,
  }
};

export const LOG_LEVELS = ['none', 'config', 'error', 'warn', 'info', 'debug', 'verbose'];

export const DEFAULT_CONFIG = {
  preset: 'thermostat', // Default to thermostat preset
  chartjs_path: "/local/chart.min.js",
  dragdata_path: "/local/chartjs-plugin-dragdata.min.js",
  hour_base: "auto", // 'auto' | 0 | 1
  log_level: 'info',
  // These are now part of presets or can be overridden
  pause_entity: null,
  profiles_select_entity: null,
  save_script: null,
  load_script: null,
  allow_max_value: false,
  cronostar_custom_presets_entity: null,
};

export const CHART_DEFAULTS = {
  minTemperature: 0,
  maxTemperature: 50,
  suggestedMinTemperature: 15,
  suggestedMaxTemperature: 30,
  temperatureStep: 0.5,
  pointRadius: 5,
  pointHoverRadius: 8,
  pointHitRadius: 10,
  borderWidth: 2,
  tension: 0.4,
};

export const TIMEOUTS = {
  entityStateWait: 3000,
  entityNumericStateWait: 4000,
  scriptCompletion: 5000,
  statePropagation: 600,
  clickSuppression: 500,
  menuSuppression: 1000,
};

export const COLORS = {
  primary: "rgba(3, 169, 244, 1)",
  primaryLight: "rgba(3, 169, 244, 0.2)",
  selected: "red",
  selectedDark: "darkred",
  anchor: "#ff5252",
  anchorDark: "#b71c1c",
};

/**
 * Validate and normalize configuration
 * @param {Object} config - User configuration
 * @returns {Object} Validated configuration
 * @throws {Error} If configuration is invalid
 */
export function validateConfig(config) {
  const presetName = config.preset || DEFAULT_CONFIG.preset;
  const presetConfig = PRESETS[presetName] || PRESETS.thermostat; // Fallback to thermostat preset

  const mergedConfig = {
    ...DEFAULT_CONFIG,
    ...presetConfig,
    ...config,
  };

  if (!mergedConfig.entity_prefix) {
    throw new Error("Configuration error: entity_prefix is required");
  }

  // Normalize hour_base
  mergedConfig.hour_base = normalizeHourBase(mergedConfig.hour_base);

  return mergedConfig;
}

/**
 * Normalize hour_base configuration
 * @param {*} hourBase - Hour base value from config
 * @returns {Object} { value: number|null, determined: boolean }
 */
export function normalizeHourBase(hourBase) {
  if (hourBase === 0 || hourBase === 1) {
    return { value: hourBase, determined: true };
  }
  
  if (typeof hourBase === 'string') {
    const norm = hourBase.trim().toLowerCase();
    if (norm === '0' || norm === 'zero' || norm === '00') {
      return { value: 0, determined: true };
    }
    if (norm === '1' || norm === 'one' || norm === '01') {
      return { value: 1, determined: true };
    }
  }
  
  return { value: 0, determined: false }; // Auto-detect
}

/**
 * Get stub configuration for card picker
 * @returns {Object}
 */
export function getStubConfig() {
  return { ...DEFAULT_CONFIG };
}