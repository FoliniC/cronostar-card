/**
 * Temperature Scheduler Card - Entry Point
 * @module main
 */

import { TemperatureSchedulerCard } from './temperature-scheduler-card.js';

// Register custom element
customElements.define('temperature-scheduler-card', TemperatureSchedulerCard);

// Add card to custom card picker
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'temperature-scheduler-card',
  name: 'Temperature Scheduler Card',
  description: 'Visual temperature schedule editor with drag-and-drop control',
  preview: true,
  documentationURL: 'https://github.com/YOUR_USERNAME/temperature-scheduler-card',
});

console.info(
  `%c TEMPERATURE-SCHEDULER-CARD %c v${TemperatureSchedulerCard.VERSION || '2.18.0'} `,
  'color: white; background: #03a9f4; font-weight: 700;',
  'color: #03a9f4; background: white; font-weight: 700;'
);