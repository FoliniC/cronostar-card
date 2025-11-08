/**
 * Utility functions for CronoStar Card
 * @module utils
 */

/**
 * Wait for a promise to resolve with timeout
 * @param {Promise} promise - Promise to wait for
 * @param {number} timeoutMs - Timeout in milliseconds
 * @returns {Promise}
 */
export async function waitWithTimeout(promise, timeoutMs) {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), timeoutMs)
    )
  ]);
}

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function}
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Round number to specified decimal places
 * @param {number} value - Value to round
 * @param {number} decimals - Number of decimal places
 * @returns {number}
 */
export function roundTo(value, decimals = 1) {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
}

/**
 * Clamp value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Format hour string with padding
 * @param {number} hour - Hour (0-23 or 1-24)
 * @param {number} base - Base (0 or 1)
 * @returns {string}
 */
export function formatHourString(hour, base = 0) {
  const num = hour + base;
  return num.toString().padStart(2, '0');
}

/**
 * Parse float safely
 * @param {*} value - Value to parse
 * @param {number} defaultValue - Default if parse fails
 * @returns {number}
 */
export function safeParseFloat(value, defaultValue = null) {
  const parsed = parseFloat(value);
  return Number.isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Deep clone object
 * @param {Object} obj - Object to clone
 * @returns {Object}
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Get unique array elements
 * @param {Array} arr - Input array
 * @returns {Array}
 */
export function unique(arr) {
  return [...new Set(arr)];
}

/**
 * Check if value is defined and not null
 * @param {*} value - Value to check
 * @returns {boolean}
 */
export function isDefined(value) {
  return value !== undefined && value !== null;
}

/**
 * Logging utility with tags
 */
const LOG_LEVELS = {
  none: 0,
  config: 1,
  error: 2,
  warn: 3,
  info: 4,
  debug: 5,
  verbose: 6,
};

let currentLogLevel = LOG_LEVELS.info;

export const Logger = {
  setLevel: (level) => {
    if (level in LOG_LEVELS) {
      currentLogLevel = LOG_LEVELS[level];
      console.log(`[Logger] Log level set to '${level}'`);
    }
  },
  error: (tag, ...args) => {
    if (currentLogLevel >= LOG_LEVELS.error) {
      console.error(`[${tag}]`, ...args);
    }
  },
  warn: (tag, ...args) => {
    if (currentLogLevel >= LOG_LEVELS.warn) {
      console.warn(`[${tag}]`, ...args);
    }
  },
  info: (tag, ...args) => {
    if (currentLogLevel >= LOG_LEVELS.info) {
      console.log(`[${tag}]`, ...args);
    }
  },
  debug: (tag, ...args) => {
    if (currentLogLevel >= LOG_LEVELS.debug) {
      console.log(`%c[${tag}]`, 'color: #03a9f4;', ...args);
    }
  },
  verbose: (tag, ...args) => {
    if (currentLogLevel >= LOG_LEVELS.verbose) {
      console.log(`%c[${tag}]`, 'color: #9e9e9e;', ...args);
    }
  },

  config: (tag, ...args) => {
    if (currentLogLevel >= LOG_LEVELS.config) {
      console.log(`%c[${tag}]`, 'color: #4caf50;', ...args);
    }
  },

  // Aliases for specific log types
  state: (...args) => Logger.debug('STATE', ...args),
  load: (...args) => Logger.info('LOAD', ...args),
  save: (...args) => Logger.info('SAVE', ...args),
  sel: (...args) => Logger.debug('SEL', ...args),
  memo: (...args) => Logger.debug('MEMO', ...args),
  diff: (...args) => Logger.debug('DIFF', ...args),
  key: (...args) => Logger.debug('KEY', ...args),
  base: (...args) => Logger.info('BASE', ...args),
};

window.Logger = Logger;