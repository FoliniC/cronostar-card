# CronoStar

[![hacs_badge](https://img.shields.io/badge/HACS-Default-41BDF5.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/release/FoliniC/cronostar-card.svg)](https://github.com/FoliniC/cronostar-card/releases)
[![License](https://img.shields.io/github/license/FoliniC/cronostar-card.svg)](LICENSE)

A powerful and intuitive Lovelace card for managing hourly schedules in Home Assistant with a visual editor, now named CronoStar.

![CronoStar](docs/images/screenshot.png)

## ✨ Features

- ✅ **Generic Scheduler** - Configure for any hourly value: temperature, power, etc.
- 📊 **Visual Schedule Editor** - Interactive Chart.js graph with drag-and-drop control.
- 🎯 **Multi-Point Selection** - Select and modify multiple hours simultaneously (Shift + drag).
- ⌨️ **Advanced Keyboard Controls** - Precise adjustments with arrow keys, plus Ctrl+A for select all.
- ⚙️ **Settings Menu** - Access additional options like language selection and help.
- 🌐 **Internationalization** - Support for multiple languages (English and Italian).
- 💾 **Profile Management** - Save and load multiple schedule profiles.
- 🔄 **Auto-Save** - Automatically saves changes when switching profiles.
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile.
- ✅ **Theme Integration** - Respects Home Assistant themes.
- ✅ **Dynamic 'Max' Value** - Set schedule points to a dynamic maximum value, ideal for solar-optimized EV charging.

## 🚀 Quick Start

### 💡 Simple Usage
Add the component, configure the value entities for each hour (you can find them ready in the browser log F12) and use them in your automation. Done!

### Installation

Installation is best done via HACS. If you do not have HACS, please install it first.

1.  Open HACS in Home Assistant.
2.  Go to "Frontend" -> Click the "+" button.
3.  Search for "CronoStar Card" and install it.
4.  Restart Home Assistant.

### Manual Installation

1.  Download `cronostar-card.js` from the [latest release](https://github.com/FoliniC/cronostar-card/releases).
2.  Copy it to your `/config/www/` directory.
3.  Add it as a resource in Lovelace:
    ```yaml
    resources:
      - url: /local/cronostar-card.js
        type: module
    ```

## 📖 Configuration

The card now includes presets to simplify configuration for common use cases. You can select a preset and override any specific option.

### Using Presets

The `preset` option allows you to quickly configure the card. Available presets are `thermostat` (default) and `ev_charging`.

**Example: Thermostat (Default Preset)**

This is the simplest configuration. It uses the `thermostat` preset by default.

```yaml
type: custom:cronostar-card
entity_prefix: temperature_hour_ # Make sure this matches your input_numbers
```

**Example: EV Charging**

To configure the card for EV charging, set the `preset` to `ev_charging`. You can then override any setting from the preset, like the `title`.

```yaml
type: custom:cronostar-card
preset: ev_charging
title: My EV Charging Schedule
entity_prefix: ev_charge_hour_ # Make sure this matches your input_numbers
```

### Custom Configuration

You can also define everything manually without using a preset by setting the options yourself.

```yaml
type: custom:cronostar-card
title: Custom Scheduler
entity_prefix: my_custom_hour_
y_axis_label: "My Value"
unit_of_measurement: "%"
min_value: 0
max_value: 100
step_value: 5
```

## 🏠 Home Assistant Configuration

To function, the CronoStar card requires several helper entities to be defined in your Home Assistant configuration (e.g., `input_number` for each hour, `input_select` for profiles). There are two main ways to organize these entities.

### Method 1: Split Configuration (Recommended)

This method uses Home Assistant's directory merge features to keep your `configuration.yaml` clean and your entities organized in separate files.

**1. Directory Structure**

Create a folder (e.g., `yaml_generator`) inside your main `/config` directory with the following structure:

```
<config>/
├── configuration.yaml
└── yaml_generator/
    ├── input_number/
    │   └── cronostar_schedule.yaml
    ├── input_select/
    │   └── cronostar_schedule.yaml
    ├── input_text/
    │   └── cronostar_schedule.yaml
    └── scripts/
        └── cronostar_schedule.yaml
```

**2. Main `configuration.yaml`**

Add the following lines to your main `configuration.yaml` file to tell Home Assistant to load the configuration from the directories you created:

```yaml
# configuration.yaml
input_number: !include_dir_merge_named yaml_generator/input_number
input_select: !include_dir_merge_named yaml_generator/input_select
input_text: !include_dir_merge_named yaml_generator/input_text
script: !include_dir_merge_named yaml_generator/scripts
```

**3. Entity Configuration Files**

Inside each file (e.g., `cronostar_schedule.yaml`), define your entities without the top-level domain key.

Example for `yaml_generator/input_number/cronostar_schedule.yaml`:
```yaml
# Note: "input_number:" is NOT needed here
ev_charging_power_00:
  name: "EV Power 00:00"
  min: 0
  max: 7.5
  step: 0.5
```

Example for `yaml_generator/input_select/cronostar_schedule.yaml`:
```yaml
# Note: "input_select:" is NOT needed here
ev_charging_profiles:
  name: "EV Charging Profiles"
  options:
    - "Notturno"
    - "Sempre"
```

*   **Pros**: Keeps `configuration.yaml` clean. Easy to manage and find entities. Modular and scalable.
*   **Cons**: Requires a specific directory structure.

### Method 2: Single File Configuration

Alternatively, you can define all entities directly in your main `configuration.yaml` file. This is simpler for small setups but can become difficult to manage.

**Example `configuration.yaml`**

```yaml
# configuration.yaml

input_number:
  ev_charging_power_00:
    name: "EV Power 00:00"
    min: 0
    max: 7.5
    step: 0.5
  ev_charging_power_01:
    name: "EV Power 01:00"
    min: 0
    max: 7.5
    step: 0.5
  # ... and so on for all 24 hours

input_select:
  ev_charging_profiles:
    name: "EV Charging Profiles"
    options:
      - "Notturno"
      - "Sempre"

input_text:
  ev_charging_profile_notturno:
    name: "Profile Notturno (JSON)"
    max: 255
  ev_charging_profile_sempre:
    name: "Profile Sempre (JSON)"
    max: 255

script:
  load_ev_charging_profile:
    alias: "Load EV Charging Profile"
    # ... script sequence ...
  save_ev_charging_profile:
    alias: "Save EV Charging Profile"
    # ... script sequence ...
```

*   **Pros**: Simple for very few entities. Everything is in one file.
*   **Cons**: `configuration.yaml` becomes very long and hard to read. Higher risk of YAML indentation errors.

For these reasons, the **Split Configuration** method is highly recommended.

## 📊 Options Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | **required** | `custom:cronostar-card` |
| `preset` | string | `thermostat` | Use a pre-defined configuration (`thermostat` or `ev_charging`). Options can be overridden. Can also be changed from the card's menu. |
| `entity_prefix` | string | **required** | Prefix for your 24 hourly `input_number` entities. |
| `title` | string | (from preset) | The card title. |
| `y_axis_label` | string | (from preset) | Custom label for the Y-axis. |
| `unit_of_measurement` | string | (from preset) | Unit of measurement to display. |
| `min_value` | number | (from preset) | Minimum value for the Y-axis. |
| `max_value` | number | (from preset) | Maximum value for the Y-axis. |
| `allow_max_value` | boolean | `false` | Enables a 'Max' value on the Y-axis, allowing schedule points to represent a dynamic maximum (e.g., available solar power). |
| `step_value` | number | (from preset) | Step for value adjustments. |
| `pause_entity` | string | - | `input_boolean` entity to pause/resume the schedule. |
| `profiles_select_entity` | string | - | `input_select` entity for profile selection. |
| `save_script` | string | `script.save_temperature_profile` | Script to save profiles. |
| `load_script` | string | `script.load_temperature_profile` | Script to load profiles. |
| `hour_base` | number/string | `auto` | Hour numbering: `0` (00-23) or `1` (01-24). |
| log_level | string | 'info' | Sets the logging level: 'none', 'error', 'warn', 'info', 'debug', 'verbose'. Can also be toggled from the card's menu. |
| `chartjs_path` | string | `/local/chart.min.js` | Path to Chart.js library. |
| `dragdata_path` | string | `/local/chartjs-plugin-dragdata.min.js` | Path to the Chart.js drag data plugin. |


## 📝 Changelog

See [changelog.md](changelog.md) for version history.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 💬 Support

- 🐛 [Report a Bug](https://github.com/FoliniC/cronostar-card/issues)
- 💡 [Request a Feature](https://github.com/FoliniC/cronostar-card/issues)
- 💬 [Community Forum](https://community.home-assistant.io/)

## 🙏 Credits

- Built with [Lit](https://lit.dev/)
- Charting by [Chart.js](https://www.chartjs.org/)
- Drag functionality by [chartjs-plugin-dragdata](https://github.com/chrispahm/chartjs-plugin-dragdata)

---

**Made with ❤️ for Home Assistant**

## Support

If you find this integration useful, you can [buy me a glass of white wine](https://buymeacoffee.com/carlofolinf).