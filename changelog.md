# Changelog

## 3.3.0 (2025-11-08)

### Added
- New 'Max' value option for scheduling, allowing dynamic power calculations (e.g., from `sensor.current_charging_power_calculated`).
- Automatic profile loading on card initialization or when the selected profile changes.
- Informational section in the settings menu to display current configuration details (entity prefix, profile entity, etc.) for easier debugging.

### Changed
- Improved "Add new profile" feature: now provides comprehensive YAML snippets in a custom UI (multi-line, copyable text area) for `input_text` and `input_select` entities, presented in two separate steps.
- Refactored profile loading mechanism: The card now directly reads profile data from `input_text` entities, updates its internal state and chart, and then calls the Home Assistant script to synchronize `input_number` entities.

### Fixed
- Resolved "Failed to save new profile" error when creating new profiles from the UI.
- Updated and corrected internationalization strings for English and Italian.
- The chart now correctly reappears after closing the "Add new profile" YAML display dialog.
- Implemented a cooldown period after profile loading to prevent race conditions that caused data corruption, especially for floating-point values.
- Corrected the generated YAML format for `input_select` entities when adding new profiles, ensuring compatibility with `!include_dir_merge_named` configurations.
- Corrected the `load_ev_charging_profile` script to explicitly convert values to floats before setting `input_number` entities, resolving issues with incorrect loading of floating-point values.
- Resolved "Canvas is already in use" error by implementing aggressive canvas cleanup before chart initialization and after chart destruction.

## 3.1.0 (2025-11-06)

### Added
- Multi-level logging system (`none`, `error`, `warn`, `info`, `debug`, `verbose`).
- UI dropdown for selecting log level.

### Changed
- Replaced `logging_enabled` configuration with `log_level`.
- Re-categorized log messages to appropriate levels.
- Improved `Chart.js` loading mechanism to prevent race conditions and "Canvas is already in use" errors.

### Fixed
- Chart disappearing bug on view navigation.
- `Logger.log is not a function` error.

## v3.0.0
-   **Features**:
    -   Added long-press support for multi-point selection on mobile devices.

## v2.3.0
-   **Improvements**:
    -   Project renamed to CronoStar. The name 'Crono' highlights its scheduling nature, making it clear it's designed for time-based controls, such as thermostats and other daily routines.

## v2.22.11

-   **Bug Fixes**:
    -   Fixed: Logging visibility issue resolved; `Logger.warn` now respects `logging_enabled` setting.
    -   Fixed: Interface no longer unresponsive when 'Anomalous operation' message is displayed (pointer events are now ignored by the overlay).
-   **Improvements**:
    -   Missing entities warning is now logged only once per change in missing entities list.
    -   Watermark styling further refined to be less intrusive.
    -   Version patch incremented.

## v2.22.9

-   **Bug Fixes**:
    -   Fixed: Logging visibility issue resolved by replacing direct `console.log` calls with `Logger.log`.
-   **Improvements**:
    -   Watermark styling refined to be less intrusive (transparent background, lighter color, dynamic text).
    -   Default configuration now uses a `generic_kwh` preset (0-7 kWh) if no preset is specified.
    -   Version patch incremented.

## v2.22.8

-   **Bug Fixes**:
    -   Fixed: `TIMEOUTS` ReferenceError resolved by importing `TIMEOUTS` in `temperature-scheduler-card.js`.
-   **Improvements**:
    -   Watermark styling refined to be less intrusive (lighter color, no background).
    -   Missing entities are now logged as a single, grouped message in the console.
    -   Version patch incremented.

## v2.22.7

-   **Bug Fixes**:
    -   Fixed: When `input_number` entities are missing, the card now uses default values and displays a clear warning message and a watermark on the chart.
-   **Improvements**:
    -   Version patch incremented.

## v2.22.6

-   **Bug Fixes**:
    -   Fixed: When loading presets with missing `input_number` entities, a clear message is now displayed listing the required entities.
-   **Improvements**:
    -   Version patch incremented.

## v2.22.5

-   **Bug Fixes**:
    -   Fixed: Logging is now correctly disabled at startup when `logging_enabled` is `false`.
-   **Improvements**:
    -   Version patch incremented.

## v2.22.4

-   **Bug Fixes**:
    -   Fixed: Logging toggle and preset selection now work correctly and close the menu.
-   **Improvements**:
    -   Added warning logs when `input_number` entities are not found for a preset.
    -   Version patch incremented.

## v2.22.3

-   **Bug Fixes**:
    -   Fixed: Logging toggle now correctly enables/disables console logging and properly closes the menu.
    -   Fixed: Preset selection now works correctly, applies the preset configuration, and closes the menu.
    -   Fixed: Improved event handling for ha-select and ha-switch components to prevent premature menu closure.
-   **Improvements**:
    -   Added setTimeout delays to ensure UI state changes are visible before menu closes.
    -   Enhanced debug logging for troubleshooting toggle and preset changes.
    -   Improved preset change handler to properly merge preset configuration with user config.

## v2.22.2

-   **Features**:
    -   Added UI controls in the card's menu for `logging_enabled` and `preset` selection.
-   **Improvements**:
    -   Fixed: Menu now closes after selecting logging or preset options.
    -   Version patch incremented.

## v2.22.1

-   **Features**:
    -   Added UI controls in the card's menu for `logging_enabled` and `preset` selection.
-   **Improvements**:
    -   Version patch incremented.

## v2.22.0

-   **Features**:
    -   Added `preset` option for quick configuration (`thermostat`, `ev_charging`).
    -   Added `logging_enabled` option to control console output for debugging.
-   **Improvements**:
    -   Versioning scheme updated to increment minor version for new features.
    -   Updated `README.md` to explain the new preset system.

## v2.21.0

-   **Features**:
    -   Made the card more generic for use with any scheduled value, not just temperature (e.g., EV charging power).
    -   Added `y_axis_label` config option for a custom Y-axis label.
    -   Added `unit_of_measurement` config option.
    -   Added `min_value`, `max_value`, and `step_value` config options to control the Y-axis and value adjustments.
-   **Documentation**:
    -   Updated `README.md` with detailed instructions and examples for different scheduler types.

## v2.20.0

-   **Features**:
    -   Made the card more generic for use with any scheduled value, not just temperature (e.g., EV charging power).
    -   Added `y_axis_label` config option for a custom Y-axis label.
    -   Added `unit_of_measurement` config option.
    -   Added `min_value`, `max_value`, and `step_value` config options to control the Y-axis and value adjustments.
-   **Documentation**:
    -   Updated `README.md` with detailed instructions and examples for different scheduler types.

## v2.20.0

-   **Features**:
    -   Added a settings menu with options for language selection and help.
    -   Implemented internationalization with support for English and Italian.
    -   Added `Ctrl+A` keyboard shortcut to select all points.
    -   The settings menu includes a "Select All" option.
-   **Changes**:
    -   The behavior of the left and right arrow keys has been updated. They now align the temperature of all selected points to the value of the leftmost or rightmost selected point, respectively.
-   **Upgrades**:
    -   Upgraded the component from LitElement to Lit 3 for improved performance and modern features.
-   **Bug Fixes**:
    -   Resolved issues where changing the language did not update all parts of the UI correctly (including chart axis labels and the card title).
    -   Fixed the visibility of the hamburger menu icon.
    -   Ensured keyboard shortcuts are active immediately after the card loads by setting the initial focus.
-   **Documentation**:
    -   Updated the `README.md` to reflect all new features, keyboard shortcuts, and behavior changes.