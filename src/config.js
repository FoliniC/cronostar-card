/**
 * Configuration management for Temperature Scheduler Card
 * @module config
 */

export const VERSION = '2.18.0';

export const DEFAULT_CONFIG = {
  title: "Temperature Scheduler",
  entity_prefix: "temperature_hour_",
  chartjs_path: "/local/chart.min.js",
  dragdata_path: "/local/chartjs-plugin-dragdata.min.js",
  pause_entity: "input_boolean.temperature_schedule_paused",
  profiles_select_entity: "input_select.temperature_profiles",
  save_script: "script.save_temperature_profile",
  load_script: "script.load_temperature_profile",
  hour_base: "auto", // 'auto' | 0 | 1
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

export const COLORS = {
  primary: "rgba(3, 169, 244, 1)",
  primaryLight: "rgba(3, 169, 244, 0.2)",
  selected: "red",
  selectedDark: "darkred",
  anchor: "#ff5252",
  anchorDark: "#b71c1c",
};

export const TIMEOUTS = {
  entityStateWait: 3000,
  entityNumericStateWait: 4000,
  scriptCompletion: 5000,
  statePropagation: 600,
  clickSuppression: 500,
  menuSuppression: 1000,
};

/**
 * Validate and normalize configuration
 * @param {Object} config - User configuration
 * @returns {Object} Validated configuration
 * @throws {Error} If configuration is invalid
 */
export function validateConfig(config) {
  if (!config.entity_prefix) {
    throw new Error("Configuration error: entity_prefix is required");
  }

  const validated = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  // Normalize hour_base
  validated.hour_base = normalizeHourBase(config.hour_base);

  return validated;
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