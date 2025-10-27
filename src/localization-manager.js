
const translations = {
  en: {
    "ui.title": "Temperature Schedule",
    "ui.loading": "Loading data...",
    "ui.pause": "Pause",
    "ui.profile": "Profile",
    "ui.unsaved_changes": "Unsaved changes",
    "ui.reset": "Reset",
    "ui.value_display": "Value: {value}{unit}",
    "ui.temperature_label": "Temperature (°C)",
    "ui.time_label": "Time of Day",
    "ui.missing_entities_message": "Missing required entities. Please create the following input_number entities:",
    "ui.anomalous_operation_warning": "Anomalous operation: Some entities are missing. Activate logging and check the console for details.",
    "ui.anomalous_operation_watermark": "ANOMALOUS OPERATION - MISSING ENTITIES",
    "ui.state_off": "Off",
    "ui.state_on": "On",

    "menu.select_all": "Select All",
    "menu.help": "Help",
    "menu.language": "Language",
    "menu.enable_logging": "Enable Logging",
    "menu.select_preset": "Select Preset",
    "preset.thermostat": "Thermostat",
    "preset.ev_charging": "EV Charging",
    "preset.generic_kwh": "Generic kWh",
    "preset.generic_temperature": "Generic Temperature",
    "preset.generic_switch": "Generic Switch",
    "help.title": "Temperature Scheduler Help",
    "help.text": "Drag points on the graph to change the temperature. Hold Shift to select multiple points. Use Ctrl+A to select all points.",
  },
  it: {
    "ui.title": "Programma Temperatura",
    "ui.loading": "Caricamento dati...",
    "ui.pause": "Pausa",
    "ui.profile": "Profilo",
    "ui.unsaved_changes": "Modifiche non salvate",
    "ui.reset": "Reset",
    "ui.value_display": "Valore: {value}{unit}",
    "ui.temperature_label": "Temperatura (°C)",
    "ui.time_label": "Ora del Giorno",
    "ui.missing_entities_message": "Entità richieste mancanti. Si prega di creare le seguenti entità input_number:",
    "ui.anomalous_operation_warning": "Funzionamento anomalo: Alcune entità sono mancanti. Attiva il logging e controlla la console per i dettagli.",
    "ui.anomalous_operation_watermark": "FUNZIONAMENTO ANOMALO - ENTITÀ MANCANTI",
    "ui.state_off": "Spento",
    "ui.state_on": "Acceso",

    "menu.select_all": "Seleziona tutto",
    "menu.help": "Aiuto",
    "menu.language": "Lingua",
    "menu.enable_logging": "Abilita Log",
    "menu.select_preset": "Seleziona Preset",
    "preset.thermostat": "Cronotermostato",
    "preset.ev_charging": "Ricarica EV",
    "preset.generic_kwh": "kWh Generico",
    "preset.generic_temperature": "Temperatura Generica",
    "preset.generic_switch": "Interruttore Generico",
    "help.title": "Aiuto Programma Temperatura",
    "help.text": "Trascina i punti sul grafico per cambiare la temperatura. Tieni premuto Shift per selezionare più punti. Usa Ctrl+A per selezionare tutti i punti.",
  },
};

import { Logger } from './utils.js'; // Import Logger

export class LocalizationManager {
  localize(lang, key, search, replace) {
    let text = translations[lang]?.[key] || translations.en[key] || key;

    if (search && typeof search === 'object') {
      // Handle replacements object
      for (const s in search) {
        text = text.replace(new RegExp(s, 'g'), search[s]);
      }
    } else if (search && replace !== undefined) {
      // Handle old search/replace strings
      text = text.replace(search, replace);
    }

    return text;
  }
}
