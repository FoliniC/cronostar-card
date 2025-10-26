
/**
 * Chart.js management for Temperature Scheduler Card
 * @module chart-manager
 */

import { Logger, clamp, roundTo } from './utils.js';
import { CHART_DEFAULTS, COLORS } from './config.js';

let pluginsLoaded = false;

export class ChartManager {
  constructor(card) {
    this.card = card;
    this.chart = null;
    this.chartInitialized = false;
    this.dragStartValues = null;
    this.dragAnchorIndex = null;
  }

  /**
   * Load Chart.js and plugins
   * @returns {Promise<boolean>}
   */
  async loadPlugins() {
    if (pluginsLoaded) return true;

    const loadScript = (url) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${url}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
        document.head.appendChild(script);
      });
    };

    try {
      if (!window.Chart) {
        await loadScript(this.card.config.chartjs_path);
      }

      let dragDataPlugin = window.ChartJSdragDataPlugin;
      if (!dragDataPlugin) {
        try {
          const dragDataModule = await import(this.card.config.dragdata_path);
          dragDataPlugin = dragDataModule.default || dragDataModule;
        } catch (err) {
          dragDataPlugin = window.ChartJSdragDataPlugin || window.ChartDataDrag || undefined;
        }
      }

      if (window.Chart && dragDataPlugin) {
        window.Chart.register(dragDataPlugin);
        pluginsLoaded = true;
        Logger.log('CHART', "chartjs-plugin-dragdata registered");
        return true;
      } else if (window.Chart) {
        pluginsLoaded = true;
        Logger.warn('CHART', "dragdata plugin not found; proceeding");
        return true;
      } else {
        throw new Error("Chart.js could not be resolved");
      }
    } catch (e) {
      Logger.error('CHART', "Error loading chart libraries:", e);
      return false;
    }
  }

  /**
   * Initialize chart
   * @param {HTMLCanvasElement} canvas - Canvas element
   * @returns {Promise<boolean>}
   */
  async initChart(canvas) {
    const loaded = await this.loadPlugins();
    if (!loaded) return false;

    const ctx = canvas.getContext("2d");
    if (!ctx) return false;

    const localize = (key, search, replace) => this.card.localizationManager.localize(key, search, replace);

    this.chart = new window.Chart(ctx, {
      type: "line",
      data: {
        labels: Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`),
        datasets: [{
          label: localize('ui.temperature_label'),
          data: this.card.stateManager.scheduleData,
          backgroundColor: COLORS.primaryLight,
          borderColor: COLORS.primary,
          borderWidth: CHART_DEFAULTS.borderWidth,
          pointRadius: CHART_DEFAULTS.pointRadius,
          pointHoverRadius: CHART_DEFAULTS.pointHoverRadius,
          pointHitRadius: CHART_DEFAULTS.pointHitRadius,
          fill: true,
          tension: CHART_DEFAULTS.tension,
        }],
      },
      options: this.getChartOptions(),
    });

    this.chartInitialized = true;
    this.updatePointStyling(
      this.card.selectionManager?.selectedPoint,
      this.card.selectionManager?.selectedPoints
    );
    this.chart.update();
    this.updateChartLabels(); // Ensure labels are set on initial load

    Logger.log('CHART', "Chart initialized successfully");
    return true;
  }

  /**
   * Get chart options configuration
   * @returns {Object}
   */
  getChartOptions() {
    const localize = (key, search, replace) => this.card.localizationManager.localize(key, search, replace);
    return {
      responsive: true,
      maintainAspectRatio: false,
      events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove', 'touchend', 
               'pointermove', 'pointerdown', 'pointerup', 'mousedown', 'mouseup'],
      scales: {
        y: {
          beginAtZero: false,
          suggestedMin: CHART_DEFAULTS.suggestedMinTemperature,
          suggestedMax: CHART_DEFAULTS.suggestedMaxTemperature,
          title: {
            display: true,
            text: localize('ui.temperature_label'),
          }
        },
        x: {
          title: {
            display: true,
            text: localize('ui.time_label'),
          }
        }
      },
      onClick: (e) => this.handleChartClick(e),
      plugins: {
        dragData: this.getDragDataOptions(),
        tooltip: {
          enabled: true,
        }
      },
    };
  }

  /**
   * Get drag data plugin options
   * @returns {Object}
   */
  getDragDataOptions() {
    return {
      round: CHART_DEFAULTS.temperatureStep,
      dragX: false,
      onDragStart: (e, datasetIndex, index, value) => {
        if (this.card.pointerHandler?.isSelecting) {
          return false;
        }

        const selMgr = this.card.selectionManager;
        if (!selMgr) return false;

        // If dragged point not in selection, select it alone
        if (!selMgr.isSelected(index)) {
          selMgr.selectIndices([index], false);
        } else {
          selMgr.setAnchor(index);
        }

        // Record start values
        this.dragStartValues = {};
        const currentData = this.chart.data.datasets[0].data;
        selMgr.getSelectedPoints().forEach(i => {
          this.dragStartValues[i] = currentData[i] ?? this.card.stateManager.scheduleData[i];
        });
        this.dragAnchorIndex = index;

        this.updatePointStyling(selMgr.selectedPoint, selMgr.selectedPoints);
        selMgr.logSelection("onDragStart");
        return true;
      },
      onDrag: (e, datasetIndex, index, value) => {
        if (!this.dragStartValues || this.dragAnchorIndex === null) return;

        const anchorStartVal = this.dragStartValues[this.dragAnchorIndex];
        const delta = value - anchorStartVal;
        const dataset = this.chart.data.datasets[0];
        const selMgr = this.card.selectionManager;

        selMgr.getSelectedPoints().forEach(i => {
          let newVal = this.dragStartValues[i] + delta;
          newVal = clamp(newVal, CHART_DEFAULTS.minTemperature, CHART_DEFAULTS.maxTemperature);
          newVal = roundTo(newVal, 1); // Round to 0.5
          dataset.data[i] = newVal;
        });

        this.chart.update('none');
        this.showDragValueDisplay(selMgr.getSelectedPoints(), dataset.data);
      },
      onDragEnd: (e, datasetIndex, index, value) => {
        const canvas = this.card.shadowRoot?.getElementById("myChart");
        if (canvas) {
          canvas.style.cursor = 'default';
        }

        const dataset = this.chart.data.datasets[0];
        const selMgr = this.card.selectionManager;
        const stateMgr = this.card.stateManager;
        const indices = selMgr.getActiveIndices();

        const newData = [...stateMgr.scheduleData];
        indices.forEach(i => {
          let finalValue = dataset.data[i];
          finalValue = roundTo(finalValue, 1);
          newData[i] = finalValue;
        });
        stateMgr.setData(newData);

        stateMgr.logPersistedValues("dragEnd", indices);
        indices.forEach(i => {
          stateMgr.updateTemperatureAtHour(i, newData[i]);
        });

        selMgr.setAnchor(index);
        this.updatePointStyling(selMgr.selectedPoint, selMgr.selectedPoints);
        this.hideDragValueDisplay();

        // Reset drag state
        this.dragStartValues = null;
        this.dragAnchorIndex = null;
      },
    };
  }

  /**
   * Handle chart click event
   * @param {Event} e - Click event
   */
  handleChartClick(e) {
    if (Date.now() < this.card.suppressClickUntil) {
      return;
    }

    const points = this.chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
    const isAdditive = !!(this.card.keyboardHandler?.ctrlDown || 
                          this.card.keyboardHandler?.metaDown || 
                          e.ctrlKey || e.metaKey);
    const selMgr = this.card.selectionManager;

    if (points.length) {
      const index = points[0].index;
      if (isAdditive) {
        selMgr.toggleIndexSelection(index);
      } else {
        selMgr.selectIndices([index], true);
      }
    } else {
      if (!isAdditive) {
        selMgr.clearSelection();
      }
    }

    this.updatePointStyling(selMgr.selectedPoint, selMgr.selectedPoints);
    if (this.chartInitialized) this.chart.update();
    selMgr.logSelection("onClick");
  }

  /**
   * Update point styling based on selection
   * @param {number|null} anchorPoint - Anchor point index
   * @param {Array<number>} selectedPoints - Selected points
   */
  updatePointStyling(anchorPoint, selectedPoints = []) {
    if (!this.chartInitialized || !this.chart?.data?.datasets?.length) return;

    const dataset = this.chart.data.datasets[0];
    const len = Array.isArray(dataset.data) ? dataset.data.length : 24;

    // Reset all points
    dataset.pointRadius = Array(len).fill(CHART_DEFAULTS.pointRadius);
    dataset.pointBackgroundColor = Array(len).fill(COLORS.primary);
    dataset.pointBorderColor = Array(len).fill(COLORS.primary);
    dataset.pointBorderWidth = Array(len).fill(CHART_DEFAULTS.borderWidth);

    // Style selected points
    if (Array.isArray(selectedPoints) && selectedPoints.length > 0) {
      selectedPoints.forEach(idx => {
        if (idx >= 0 && idx < len) {
          dataset.pointRadius[idx] = 8;
          dataset.pointBackgroundColor[idx] = COLORS.selected;
          dataset.pointBorderColor[idx] = COLORS.selectedDark;
          dataset.pointBorderWidth[idx] = 2;
        }
      });
    }

    // Style anchor point
    if (anchorPoint !== null && anchorPoint >= 0 && anchorPoint < len) {
      dataset.pointRadius[anchorPoint] = 9;
      dataset.pointBorderWidth[anchorPoint] = 3;
      dataset.pointBackgroundColor[anchorPoint] = COLORS.anchor;
      dataset.pointBorderColor[anchorPoint] = COLORS.anchorDark;
    }
  }

  /**
   * Show drag value display
   * @param {Array<number>} indices - Selected indices
   * @param {Array<number>} data - Chart data
   */
  showDragValueDisplay(indices, data) {
    const displayElement = this.card.shadowRoot?.getElementById('drag-value-display');
    if (!displayElement || indices.length === 0) return;

    const localize = (key, search, replace) => this.card.localizationManager.localize(key, search, replace);
    const leftmostIndex = Math.min(...indices);
    const leftmostValue = data[leftmostIndex];
    
    displayElement.style.display = 'block';
    displayElement.textContent = localize('ui.value_display', '{value}', leftmostValue);

    const meta = this.chart.getDatasetMeta(0);
    const pointElement = meta.data[leftmostIndex];
    if (pointElement) {
      const { x: pointX, y: pointY } = pointElement.tooltipPosition();
      const { x: containerX, y: containerY } = this.getContainerRelativePointCoords(pointX, pointY);
      displayElement.style.left = `${containerX + 10}px`;
      displayElement.style.top = `${containerY - 30}px`;
    }
  }

  /**
   * Hide drag value display
   */
  hideDragValueDisplay() {
    const displayElement = this.card.shadowRoot?.getElementById('drag-value-display');
    if (displayElement) {
      displayElement.style.display = 'none';
    }
  }

  /**
   * Get container-relative coordinates from canvas coordinates
   * @param {number} canvasX - Canvas X coordinate
   * @param {number} canvasY - Canvas Y coordinate
   * @returns {Object} {x, y}
   */
  getContainerRelativePointCoords(canvasX, canvasY) {
    const container = this.card.shadowRoot?.querySelector(".chart-container");
    const canvas = this.card.shadowRoot?.getElementById("myChart");
    if (!container || !canvas) return { x: 0, y: 0 };

    const containerRect = container.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();

    const offsetX = canvasRect.left - containerRect.left;
    const offsetY = canvasRect.top - containerRect.top;

    return { x: canvasX + offsetX, y: canvasY + offsetY };
  }

  /**
   * Update chart data
   * @param {Array<number>} data - New data
   */
  updateData(data) {
    if (!this.chartInitialized || !this.chart) return;

    this.chart.data.datasets[0].data = [...data];
    this.updatePointStyling(
      this.card.selectionManager?.selectedPoint,
      this.card.selectionManager?.selectedPoints
    );
    this.chart.update();
  }

  /**
   * Destroy chart
   */
  destroy() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
      this.chartInitialized = false;
    }
  }

  /**
   * Check if chart is initialized
   * @returns {boolean}
   */
  isInitialized() {
    return this.chartInitialized && this.chart !== null;
  }

  /**
   * Update chart (force redraw)
   */
  update() {
    if (this.chartInitialized && this.chart) {
      this.chart.update();
    }
  }

  /**
   * Get chart instance
   * @returns {Chart|null}
   */
  getChart() {
    return this.chart;
  }

  updateChartLabels() {
    if (!this.chart) {
        console.log('[CHART] updateChartLabels: Chart not initialized');
        return;
    }
    console.log('[CHART] updateChartLabels called');
    const localize = (key, search, replace) => this.card.localizationManager.localize(this.card.language, key, search, replace);

    const newLabel = localize('ui.temperature_label');
    const newYLabel = localize('ui.temperature_label');
    const newXLabel = localize('ui.time_label');

    console.log(`[CHART] New labels: ${newLabel}, ${newYLabel}, ${newXLabel}`);

    this.chart.data.datasets[0].label = newLabel;
    this.chart.options.scales.y.title.text = newYLabel;
    this.chart.options.scales.x.title.text = newXLabel;
    console.log('[CHART] Calling chart.update()');
    this.chart.update();
  }
}