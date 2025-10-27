/**
 * Chart.js management for CronoStar Card
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
    Logger.log('DEBUG', '[loadPlugins] called');
    if (pluginsLoaded) {
      Logger.log('DEBUG', '[loadPlugins] Plugins already loaded');
      return true;
    }

    const loadScript = (url) => {
      Logger.log('DEBUG', `[loadScript] Loading script from ${url}`);
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${url}"]`)) {
          Logger.log('DEBUG', `[loadScript] Script already in DOM: ${url}`);
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => {
          Logger.log('DEBUG', `[loadScript] Script loaded: ${url}`);
          resolve();
        };
        script.onerror = () => {
          Logger.error('DEBUG', `[loadScript] Error loading script: ${url}`);
          reject(new Error(`Failed to load script: ${url}`));
        };
        document.head.appendChild(script);
      });
    };

    try {
      if (!window.Chart) {
        Logger.log('DEBUG', '[loadPlugins] Chart.js not loaded, invoking loadScript');
        await loadScript(this.card.config.chartjs_path);
      }

      let dragDataPlugin = window.ChartJSdragDataPlugin;
      if (!dragDataPlugin) {
        Logger.log('DEBUG', '[loadPlugins] dragDataPlugin not found, trying import');
        try {
          const dragDataModule = await import(this.card.config.dragdata_path);
          dragDataPlugin = dragDataModule.default || dragDataModule;
          Logger.log('DEBUG', '[loadPlugins] dragDataModule imported');
        } catch (err) {
          Logger.error('DEBUG', `[loadPlugins] dragdata import failed`, err);
          dragDataPlugin = window.ChartJSdragDataPlugin || window.ChartDataDrag || undefined;
        }
      }

      if (window.Chart && dragDataPlugin) {
        Logger.log('DEBUG', '[loadPlugins] Registering dragDataPlugin');
        window.Chart.register(dragDataPlugin);
        pluginsLoaded = true;
        Logger.log('CHART', "chartjs-plugin-dragdata registered");
        return true;
      } else if (window.Chart) {
        pluginsLoaded = true;
        Logger.warn('CHART', "dragdata plugin not found; proceeding");
        Logger.log('DEBUG', '[loadPlugins] dragDataPlugin still not found');
        return true;
      } else {
        Logger.error('CHART', '[loadPlugins] Chart.js could not be resolved');
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
    Logger.log('DEBUG', '[initChart] called');
    const loaded = await this.loadPlugins();
    Logger.log('DEBUG', `[initChart] Plugins loaded result: ${loaded}`);
    if (!loaded) return false;

    const ctx = canvas.getContext("2d");
    Logger.log('DEBUG', `[initChart] Got canvas context: ${!!ctx}`);
    if (!ctx) return false;

    const localize = (key, search, replace) => this.card.localizationManager.localize(this.card.language, key, search, replace);
    const yAxisLabel = this.card.config.y_axis_label
      ? `${this.card.config.y_axis_label} (${this.card.config.unit_of_measurement})`
      : localize('ui.temperature_label');
    Logger.log('DEBUG', `[initChart] yAxisLabel: ${yAxisLabel}`);
    Logger.log('DEBUG', `[initChart] stateManager scheduleData len: ${this.card.stateManager.scheduleData?.length}`);

    this.chart = new window.Chart(ctx, {
      type: "line",
      data: {
        labels: Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`),
        datasets: [{
          label: yAxisLabel,
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

    Logger.log('DEBUG', '[initChart] Chart instance created');
    this.chartInitialized = true;
    this.updatePointStyling(
      this.card.selectionManager?.selectedPoint,
      this.card.selectionManager?.selectedPoints
    );
    Logger.log('DEBUG', '[initChart] Point styling updated');
    this.chart.update();
    Logger.log('DEBUG', '[initChart] chart.update() called');
    this.updateChartLabels(); // Ensure labels are set on initial load
    Logger.log('DEBUG', '[initChart] updateChartLabels() called');

    Logger.log('CHART', "Chart initialized successfully");
    return true;
  }

  /**
   * Get chart options configuration
   * @returns {Object}
   */
  getChartOptions() {
    Logger.log('DEBUG', '[getChartOptions] called');
    const localize = (key, search, replace) => this.card.localizationManager.localize(this.card.language, key, search, replace);
    const yAxisLabel = this.card.config.y_axis_label
      ? `${this.card.config.y_axis_label} (${this.card.config.unit_of_measurement})`
      : localize('ui.temperature_label');
    Logger.log('DEBUG', `[getChartOptions] yAxisLabel: ${yAxisLabel}`);
    Logger.log('CHART', `is_switch_preset: ${this.card.config.is_switch_preset}`);

    const yScaleConfig = {
      beginAtZero: false,
      min: this.card.config.min_value,
      max: this.card.config.max_value,
      title: {
        display: true,
        text: yAxisLabel,
      }
    };

    if (this.card.config.is_switch_preset) {
      Logger.log('DEBUG', '[getChartOptions] Configuring custom Y-axis ticks for switch preset');
      yScaleConfig.beginAtZero = true;
      yScaleConfig.ticks = {
        stepSize: 1,
        callback: function(value, index, ticks) {
          Logger.log('DEBUG', `[Y-Tick callback] value=${value} index=${index} len=${ticks.length}`);
          Logger.log('DEBUG', `[Y-Tick callback] ticks: ${JSON.stringify(ticks)}`);
          Logger.log('DEBUG', `[Y-Tick callback] localize is: ${typeof localize}`);
          if (value === 0) {
            Logger.log('DEBUG', '[Y-Tick callback] Returning OFF');
            return localize('ui.state_off');
          }
          if (value === 1) {
            Logger.log('DEBUG', '[Y-Tick callback] Returning ON');
            return localize('ui.state_on');
          }
          Logger.log('DEBUG', `[Y-Tick callback] Returning empty for value=${value}`);
          return '';
        }
      };
    }

    return {
      responsive: true,
      maintainAspectRatio: false,
      events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove', 'touchend',
               'pointermove', 'pointerdown', 'pointerup', 'mousedown', 'mouseup'],
      scales: {
        y: yScaleConfig,
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
  recreateChartOptions() {
    Logger.log('DEBUG', '[recreateChartOptions] called');
    if (!this.chartInitialized || !this.chart) {
      Logger.log('DEBUG', '[recreateChartOptions] Chart not initialized');
      return false;
    }

    Logger.log('DEBUG', '[recreateChartOptions] Destroying and recreating chart');
    
    // Save current data and selection state
    const currentData = [...this.chart.data.datasets[0].data];
    const selectedPoint = this.card.selectionManager?.selectedPoint;
    const selectedPoints = this.card.selectionManager?.selectedPoints;
    
    // Get canvas element
    const canvas = this.card.shadowRoot?.getElementById("myChart");
    if (!canvas) {
      Logger.error('DEBUG', '[recreateChartOptions] Canvas not found');
      return false;
    }
    
    // Destroy old chart
    this.destroy();
    
    // Reinitialize with new options
    this.initChart(canvas).then(() => {
      Logger.log('DEBUG', '[recreateChartOptions] Chart recreated');
      // Restore data and selection
      this.updateData(currentData);
      if (selectedPoint !== null || (selectedPoints && selectedPoints.length > 0)) {
        this.updatePointStyling(selectedPoint, selectedPoints);
      }
    });
    
    return true;
  }

  /**
   * Get drag data plugin options
   * @returns {Object}
   */
  getDragDataOptions() {
    Logger.log('DEBUG', '[getDragDataOptions] called');
    return {
      round: this.card.config.step_value,
      dragX: false,
      onDragStart: (e, datasetIndex, index, value) => {
        Logger.log('DEBUG', `[onDragStart] index=${index} value=${value}`);
        if (this.card.pointerHandler?.isSelecting) {
          Logger.log('DEBUG', '[onDragStart] pointerHandler is selecting, abort');
          return false;
        }

        const selMgr = this.card.selectionManager;
        if (!selMgr) {
          Logger.log('DEBUG', '[onDragStart] No selectionManager');
          return false;
        }
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
        Logger.log('DEBUG', `[onDrag] index=${index} value=${value}`);
        if (!this.dragStartValues || this.dragAnchorIndex === null) return;

        const anchorStartVal = this.dragStartValues[this.dragAnchorIndex];
        const delta = value - anchorStartVal;
        const dataset = this.chart.data.datasets[0];
        const selMgr = this.card.selectionManager;

        selMgr.getSelectedPoints().forEach(i => {
          let newVal = this.dragStartValues[i] + delta;
          newVal = clamp(newVal, this.card.config.min_value, this.card.config.max_value);
          newVal = roundTo(newVal, this.card.config.is_switch_preset ? 0 : 1);
          dataset.data[i] = newVal;
        });

        this.chart.update('none');
        this.showDragValueDisplay(selMgr.getSelectedPoints(), dataset.data);
      },
      onDragEnd: (e, datasetIndex, index, value) => {
        Logger.log('DEBUG', `[onDragEnd] index=${index} value=${value}`);
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
          finalValue = roundTo(finalValue, this.card.config.is_switch_preset ? 0 : 1);
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
    Logger.log('DEBUG', '[handleChartClick] called');
    if (Date.now() < this.card.suppressClickUntil) {
      Logger.log('DEBUG', '[handleChartClick] Click suppressed');
      return;
    }

    const points = this.chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
    const isAdditive = !!(this.card.keyboardHandler?.ctrlDown || 
                          this.card.keyboardHandler?.metaDown || 
                          e.ctrlKey || e.metaKey);
    const selMgr = this.card.selectionManager;
    Logger.log('DEBUG', `[handleChartClick] Found points: ${points?.length}`);
    if (points.length) {
      const index = points[0].index;
      Logger.log('DEBUG', `[handleChartClick] Clicked index: ${index}`);
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
    Logger.log('DEBUG', '[updatePointStyling] called');
    if (!this.chartInitialized || !this.chart?.data?.datasets?.length) {
      Logger.log('DEBUG', '[updatePointStyling] Not initialized');
      return;
    }
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
          Logger.log('DEBUG', `[updatePointStyling] Styled selected point idx=${idx}`);
        }
      });
    }

    // Style anchor point
    if (anchorPoint !== null && anchorPoint >= 0 && anchorPoint < len) {
      dataset.pointRadius[anchorPoint] = 9;
      dataset.pointBorderWidth[anchorPoint] = 3;
      dataset.pointBackgroundColor[anchorPoint] = COLORS.anchor;
      dataset.pointBorderColor[anchorPoint] = COLORS.anchorDark;
      Logger.log('DEBUG', `[updatePointStyling] Styled anchor point idx=${anchorPoint}`);
    }
  }

  /**
   * Show drag value display
   * @param {Array<number>} indices - Selected indices
   * @param {Array<number>} data - Chart data
   */
  showDragValueDisplay(indices, data) {
    Logger.log('DEBUG', '[showDragValueDisplay] called');
    const displayElement = this.card.shadowRoot?.getElementById('drag-value-display');
    if (!displayElement || indices.length === 0) {
      Logger.log('DEBUG', '[showDragValueDisplay] No display element or indices empty');
      return;
    }
    const localize = (key, search, replace) => this.card.localizationManager.localize(this.card.language, key, search, replace);
    const leftmostIndex = Math.min(...indices);
    const leftmostValue = data[leftmostIndex];
    
    displayElement.style.display = 'block';
    displayElement.textContent = localize('ui.value_display', {'{value}': leftmostValue, '{unit}': this.card.config.unit_of_measurement});

    const meta = this.chart.getDatasetMeta(0);
    const pointElement = meta.data[leftmostIndex];
    if (pointElement) {
      const { x: pointX, y: pointY } = pointElement.tooltipPosition();
      const { x: containerX, y: containerY } = this.getContainerRelativePointCoords(pointX, pointY);
      displayElement.style.left = `${containerX + 10}px`;
      displayElement.style.top = `${containerY - 30}px`;
      Logger.log('DEBUG', `[showDragValueDisplay] Display position: left=${containerX+10} top=${containerY-30}`);
    }
  }

  /**
   * Hide drag value display
   */
  hideDragValueDisplay() {
    Logger.log('DEBUG', '[hideDragValueDisplay] called');
    const displayElement = this.card.shadowRoot?.getElementById('drag-value-display');
    if (displayElement) {
      displayElement.style.display = 'none';
      Logger.log('DEBUG', '[hideDragValueDisplay] Hiding display');
    }
  }

  /**
   * Get container-relative coordinates from canvas coordinates
   * @param {number} canvasX - Canvas X coordinate
   * @param {number} canvasY - Canvas Y coordinate
   * @returns {Object} {x, y}
   */
  getContainerRelativePointCoords(canvasX, canvasY) {
    Logger.log('DEBUG', '[getContainerRelativePointCoords] called');
    const container = this.card.shadowRoot?.querySelector(".chart-container");
    const canvas = this.card.shadowRoot?.getElementById("myChart");
    if (!container || !canvas) {
      Logger.log('DEBUG', '[getContainerRelativePointCoords] container or canvas not found');
      return { x: 0, y: 0 };
    }
    const containerRect = container.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();

    const offsetX = canvasRect.left - containerRect.left;
    const offsetY = canvasRect.top - containerRect.top;
    Logger.log('DEBUG', `[getContainerRelativePointCoords] OffsetX=${offsetX} OffsetY=${offsetY}`);
    return { x: canvasX + offsetX, y: canvasY + offsetY };
  }

  /**
   * Update chart data
   * @param {Array<number>} data - New data
   */
  updateData(data) {
    Logger.log('DEBUG', '[updateData] called');
    if (!this.chartInitialized || !this.chart) {
      Logger.log('DEBUG', '[updateData] Chart not initialized');
      return;
    }
    this.chart.data.datasets[0].data = [...data];
    Logger.log('DEBUG', `[updateData] Data updated. Length: ${data.length}`);
    this.updatePointStyling(
      this.card.selectionManager?.selectedPoint,
      this.card.selectionManager?.selectedPoints
    );
    Logger.log('DEBUG', '[updateData] Point styling updated');
    this.chart.update();
    Logger.log('DEBUG', '[updateData] chart.update() called');
  }

  /**
   * Destroy chart
   */
  destroy() {
    Logger.log('DEBUG', '[destroy] called');
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
      this.chartInitialized = false;
      Logger.log('DEBUG', '[destroy] Chart destroyed');
    }
  }

  /**
   * Check if chart is initialized
   * @returns {boolean}
   */
  isInitialized() {
    Logger.log('DEBUG', '[isInitialized] called');
    return this.chartInitialized && this.chart !== null;
  }

  /**
   * Update chart (force redraw)
   */
  update() {
    Logger.log('DEBUG', '[update] called');
    if (this.chartInitialized && this.chart) {
      this.chart.update();
      Logger.log('DEBUG', '[update] chart.update() called');
    }
  }

  /**
   * Get chart instance
   * @returns {Chart|null}
   */
  getChart() {
    Logger.log('DEBUG', '[getChart] called');
    return this.chart;
  }

  updateChartLabels() {
    Logger.log('DEBUG', '[updateChartLabels] called');
    if (!this.chart) {
        Logger.log('CHART', 'updateChartLabels: Chart not initialized');
        return;
    }
    Logger.log('CHART', 'updateChartLabels called');
    const localize = (key, search, replace) => this.card.localizationManager.localize(this.card.language, key, search, replace);

    const yAxisLabel = this.card.config.y_axis_label
      ? `${this.card.config.y_axis_label} (${this.card.config.unit_of_measurement})`
      : localize('ui.temperature_label');
    const newXLabel = localize('ui.time_label');

    Logger.log('CHART', `New labels: ${yAxisLabel}, ${newXLabel}`);

    this.chart.data.datasets[0].label = yAxisLabel;
    this.chart.options.scales.y.title.text = yAxisLabel;
    this.chart.options.scales.x.title.text = newXLabel;
    Logger.log('CHART', 'Calling chart.update()');
    this.chart.update();
  }
}
