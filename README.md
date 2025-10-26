# Temperature Scheduler Card

[![hacs_badge](https://img.shields.io/badge/HACS-Default-41BDF5.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/release/YOUR_USERNAME/temperature-scheduler-card.svg)](https://github.com/YOUR_USERNAME/temperature-scheduler-card/releases)
[![License](https://img.shields.io/github/license/YOUR_USERNAME/temperature-scheduler-card.svg)](LICENSE)

A powerful and intuitive Lovelace card for managing temperature schedules in Home Assistant with visual hourly control.

![Temperature Scheduler Card](docs/images/screenshot.png)

## ✨ Features

- 📊 **Visual Schedule Editor** - Interactive Chart.js graph with drag-and-drop temperature control
- 🎯 **Multi-Point Selection** - Select and modify multiple hours simultaneously (Shift + drag)
- ⌨️ **Advanced Keyboard Controls** - Precise adjustments with arrow keys, plus Ctrl+A for select all.
- ⚙️ **Settings Menu** - Access additional options like language selection and help.
- 🌐 **Internationalization** - Support for multiple languages (English and Italian).
- 💾 **Profile Management** - Save and load multiple temperature profiles
- 🔄 **Auto-Save** - Automatically saves changes when switching profiles
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Theme Integration** - Respects Home Assistant themes

## 🚀 Quick Start

### Installation via HACS (Recommended)

1. Open HACS in Home Assistant
2. Click on "Frontend"
3. Click the "+" button
4. Search for "Temperature Scheduler Card"
5. Click "Install"
6. Restart Home Assistant

### Manual Installation

1. Download `temperature-scheduler-card.js` from the [latest release](https://github.com/YOUR_USERNAME/temperature-scheduler-card/releases)
2. Copy to `/config/www/temperature-scheduler-card.js`
3. Add resource to Lovelace:
   ```yaml
   resources:
     - url: /local/temperature-scheduler-card.js
       type: module
   ```

## 📖 Configuration

### Minimal Configuration

```yaml
type: custom:temperature-scheduler-card
title: Temperature Schedule
entity_prefix: temperature_hour_
```

### Full Configuration

```yaml
type: custom:temperature-scheduler-card
title: Temperature Schedule
entity_prefix: temperature_hour_
pause_entity: input_boolean.temperature_schedule_paused
profiles_select_entity: input_select.temperature_profiles
save_script: script.save_temperature_profile
load_script: script.load_temperature_profile
hour_base: auto  # 'auto' | 0 | 1
chartjs_path: /local/chart.min.js
dragdata_path: /local/chartjs-plugin-dragdata.min.js
```

### Required Entities

You need to create:

**24 Input Numbers** (for each hour):
```yaml
input_number:
  temperature_hour_00:
    name: "Temperature 00:00"
    min: 15
    max: 30
    step: 0.5
    unit_of_measurement: "°C"
  # ... repeat for 01 to 23
```

**Input Select** (for profiles):
```yaml
input_select:
  temperature_profiles:
    name: "Temperature Profiles"
    options:
      - Eco
      - Comfort
      - Away
```

**Input Text** (for profile storage):
```yaml
input_text:
  temperature_profile_eco:
    name: "Profile Eco (JSON)"
    max: 255
  temperature_profile_comfort:
    name: "Profile Comfort (JSON)"
    max: 255
```

See [examples/full-setup.yaml](examples/full-setup.yaml) for complete configuration.

## 🎮 Usage

### Basic Operations

- **Modify Single Hour**: Click and drag a point up/down
- **Select Multiple Hours**: Hold Shift + drag to select area
- **Keyboard Adjustment**: 
  - `↑` / `↓` - Increase/decrease temperature by 0.5°C
  - `←` - Sets the temperature of all selected points to be the same as the temperature of the leftmost selected point.
  - `→` - Sets the temperature of all selected points to be the same as the temperature of the rightmost selected point.
  - `Ctrl` + `A` - Select all points.
  - `Esc` - Clear selection
- **Add to Selection**: Ctrl/Cmd + click to toggle points

### Profile Management

1. Modify temperatures on the graph
2. Select a different profile → changes are auto-saved to previous profile
3. Click "Reset Changes" to reload current profile

## 🛠️ Scripts Setup

Copy the scripts from [scripts/temperature_profiles.yaml](scripts/temperature_profiles.yaml) to your Home Assistant configuration.

The scripts handle:
- ✅ Saving profiles to `input_text` entities (JSON format)
- ✅ Loading profiles and applying to hourly `input_number` entities
- ✅ Support for both 0-based and 1-based hour schemes
- ✅ Detailed logging for debugging

## 📊 Options Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | **required** | `custom:temperature-scheduler-card` |
| `title` | string | "Temperature Scheduler" | Card title |
| `entity_prefix` | string | **required** | Prefix for hourly entities (e.g., `temperature_hour_`) |
| `pause_entity` | string | - | Entity to pause/resume schedule |
| `profiles_select_entity` | string | - | Entity for profile selection |
| `save_script` | string | `script.save_temperature_profile` | Script to save profiles |
| `load_script` | string | `script.load_temperature_profile` | Script to load profiles |
| `hour_base` | number/string | `auto` | Hour numbering: `0` (00-23), `1` (01-24), or `auto` |
| `chartjs_path` | string | `/local/chart.min.js` | Path to Chart.js library |
| `dragdata_path` | string | `/local/chartjs-plugin-dragdata.min.js` | Path to drag plugin |

## 🐛 Troubleshooting

### Values are shifted after loading profile

**Solution**: Update to v2.18+ which fixes the indexing bug in load script.

### Graph doesn't resize

**Solution**: Make sure you're using v2.18+ with `responsive: true` enabled.

### Changes not saving

**Solution**: Check that `input_text` entities have `max: 255` and scripts are properly configured.

See [docs/troubleshooting.md](docs/troubleshooting.md) for more solutions.

## 📝 Changelog

See [docs/changelog.md](docs/changelog.md) for version history.

### v2.20.0 (Latest)
- ✅ Added settings menu with language selection (EN/IT) and help.
- ✅ Added Ctrl+A shortcut to select all points.
- ✅ Changed arrow key behavior to align with leftmost/rightmost selected point.
- ✅ Upgraded to Lit 3.
- ✅ Fixed several bugs related to localization and component initialization.

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 💬 Support

- 🐛 [Report a Bug](https://github.com/YOUR_USERNAME/temperature-scheduler-card/issues)
- 💡 [Request a Feature](https://github.com/YOUR_USERNAME/temperature-scheduler-card/issues)
- 💬 [Community Forum](https://community.home-assistant.io/)

## 🙏 Credits

- Built with [Lit](https://lit.dev/)
- Charting by [Chart.js](https://www.chartjs.org/)
- Drag functionality by [chartjs-plugin-dragdata](https://github.com/chrispahm/chartjs-plugin-dragdata)

---

**Made with ❤️ for Home Assistant**
