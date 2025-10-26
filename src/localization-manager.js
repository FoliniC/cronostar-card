
const translations = {
  en: {
    "ui.title": "Temperature Schedule",
    "ui.loading": "Loading data...",
    "ui.pause": "Pause",
    "ui.profile": "Profile",
    "ui.unsaved_changes": "Unsaved changes",
    "ui.reset": "Reset",
    "ui.value_display": "Value: {value}°C",
    "ui.temperature_label": "Temperature (°C)",
    "ui.time_label": "Time of Day",
    "menu.select_all": "Select All",
    "menu.help": "Help",
    "menu.language": "Language",
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
    "ui.value_display": "Valore: {value}°C",
    "ui.temperature_label": "Temperatura (°C)",
    "ui.time_label": "Ora del Giorno",
    "menu.select_all": "Seleziona tutto",
    "menu.help": "Aiuto",
    "menu.language": "Lingua",
    "help.title": "Aiuto Programma Temperatura",
    "help.text": "Trascina i punti sul grafico per cambiare la temperatura. Tieni premuto Shift per selezionare più punti. Usa Ctrl+A per selezionare tutti i punti.",
  },
};

export class LocalizationManager {
  localize(lang, key, search, replace) {
    console.log(`[LOCALIZE] lang: ${lang}, key: ${key}`);
    let text = translations[lang]?.[key] || translations.en[key] || key;

    if (search && replace) {
      text = text.replace(search, replace);
    }

    return text;
  }
}
