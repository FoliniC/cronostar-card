# Changelog

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
    -   Added `Ctrl+A` keyboard shortcut to select all points on the chart.
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
