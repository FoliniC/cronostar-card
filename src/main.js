
/**
 * Temperature Scheduler Card - Entry Point
 * @module main
 */

import { CronoStarCard } from './CronoStar.js';
import { VERSION } from './config.js';

// Register custom element
customElements.define('cronostar-card', CronoStarCard);

// Add card to custom card picker
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'cronostar-card',
  name: 'CronoStar',
  description: 'Visual hourly schedule editor with drag-and-drop control',
  preview: true,
  documentationURL: 'https://github.com/FoliniC/cronostar-card',
});

Logger.log(
  'MAIN',
  `%c CRONOSTAR %c v${VERSION} `,
  'color: white; background: #03a9f4; font-weight: 700;',
  'color: #03a9f4; background: white; font-weight: 700;'
);