
/**
 * Keyboard input handling for Temperature Scheduler Card
 * @module keyboard-handler
 */

import { Logger, clamp, roundTo } from './utils.js';
import { CHART_DEFAULTS } from './config.js';

export class KeyboardHandler {
  constructor(card) {
    this.card = card;
    this.ctrlDown = false;
    this.metaDown = false;
    this.enabled = true;
    
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);
  }

  /**
   * Enable keyboard handling
   */
  enable() {
    this.enabled = true;
  }

  /**
   * Disable keyboard handling
   */
  disable() {
    this.enabled = false;
  }

  /**
   * Handle keydown event
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleKeydown(e) {
    if (!this.enabled) return;

    if (e.key === "Control") {
      this.ctrlDown = true;
      return;
    }
    if (e.key === "Meta") {
      this.metaDown = true;
      return;
    }

    if ((this.ctrlDown || this.metaDown) && e.key === 'a') {
        e.preventDefault();
        this.card.selectionManager.selectAll();
        return;
    }

    if (e.key === "Escape") {
      this.handleEscape();
      return;
    }

    const selMgr = this.card.selectionManager;
    const indices = selMgr.getActiveIndices();
    if (indices.length === 0) return;

    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      this.handleArrowLeftRight(e, indices);
      return;
    }

    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      this.handleArrowUpDown(e, indices);
      return;
    }
  }

  /**
   * Handle keyup event
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleKeyup(e) {
    if (e.key === "Control") {
      this.ctrlDown = false;
      return;
    }
    if (e.key === "Meta") {
      this.metaDown = false;
      return;
    }
    
    // Hide value display on key release
    if (e.key === "ArrowUp" || e.key === "ArrowDown" || 
        e.key === "ArrowLeft" || e.key === "ArrowRight") {
      this.card.chartManager?.hideDragValueDisplay();
    }
  }

  /**
   * Handle Escape key (clear selection)
   */
  handleEscape() {
    const selMgr = this.card.selectionManager;
    selMgr.clearSelection();
    this.card.chartManager?.updatePointStyling(null, []);
    this.card.chartManager?.update();
  }

  /**
   * Handle left/right arrow keys (align to anchor value)
   * @param {KeyboardEvent} e - Keyboard event
   * @param {Array<number>} indices - Active indices
   */
  handleArrowLeftRight(e, indices) {
    e.preventDefault();

    const stateMgr = this.card.stateManager;
    const chartMgr = this.card.chartManager;
    const dataset = chartMgr.chart.data.datasets[0];

    let targetIndex;
    if (e.key === "ArrowLeft") {
      targetIndex = Math.min(...indices);
    } else { // ArrowRight
      targetIndex = Math.max(...indices);
    }

    const targetVal = dataset.data[targetIndex] ?? stateMgr.scheduleData[targetIndex];
    const rounded = roundTo(targetVal, 1);

    Logger.key(
      `${e.key} -> align to index: ${targetIndex} ` +
      `(${stateMgr.getHourLabel(targetIndex)}) value=${rounded} ` +
      `indices=${JSON.stringify(indices)}`
    );

    const newData = [...stateMgr.scheduleData];
    indices.forEach(i => {
      newData[i] = rounded;
      dataset.data[i] = rounded;
      stateMgr.updateTemperatureAtHour(i, rounded);
    });
    stateMgr.setData(newData);

    chartMgr.updatePointStyling(this.card.selectionManager.selectedPoint, this.card.selectionManager.selectedPoints);
    chartMgr.update();
    chartMgr.showDragValueDisplay(indices, dataset.data);
  }

  /**
   * Handle up/down arrow keys (adjust temperature)
   * @param {KeyboardEvent} e - Keyboard event
   * @param {Array<number>} indices - Active indices
   */
  handleArrowUpDown(e, indices) {
    e.preventDefault();

    const delta = e.key === "ArrowUp" ? this.card.config.step_value : -this.card.config.step_value;
    const selMgr = this.card.selectionManager;
    const stateMgr = this.card.stateManager;
    const chartMgr = this.card.chartManager;
    const dataset = chartMgr.chart.data.datasets[0];
    const newData = [...stateMgr.scheduleData];

    Logger.key(`${e.key} -> delta=${delta} indices=${JSON.stringify(indices)}`);

    indices.forEach(i => {
      let val = (dataset.data[i] ?? stateMgr.scheduleData[i]) + delta;
      val = clamp(val, this.card.config.min_value, this.card.config.max_value);
      val = roundTo(val, 1);
      dataset.data[i] = val;
      newData[i] = val;
      stateMgr.updateTemperatureAtHour(i, val);
    });

    stateMgr.setData(newData);
    chartMgr.updatePointStyling(selMgr.selectedPoint, selMgr.selectedPoints);
    chartMgr.update();
    chartMgr.showDragValueDisplay(indices, dataset.data);
  }

  /**
   * Attach keyboard listeners
   * @param {HTMLElement} element - Element to attach to
   */
  attachListeners(element) {
    element.addEventListener('keydown', this.handleKeydown);
    element.addEventListener('keyup', this.handleKeyup);
  }

  /**
   * Detach keyboard listeners
   * @param {HTMLElement} element - Element to detach from
   */
  detachListeners(element) {
    element.removeEventListener('keydown', this.handleKeydown);
    element.removeEventListener('keyup', this.handleKeyup);
  }
}