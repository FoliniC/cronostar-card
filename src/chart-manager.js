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
    this.hideValueDisplayTimeout = null;
  }

  /**
   * Load Chart.js and plugins
   * @returns {Promise<boolean>}
   */
  async loadPlugins() {
    Logger.verbose('CHART', '[loadPlugins] called');
    if (pluginsLoaded) {
      Logger.debug('CHART', '[loadPlugins] Plugins already loaded');
      return true;
    }

    const loadScript = (url) => {
      Logger.debug('CHART', `[loadScript] Loading script from ${url}`);
      return new Promise((resolve, reject) => {
        const existingScript = document.querySelector(`script[src="${url}"]`);
        if (existingScript) {
          Logger.debug('CHART', `[loadScript] Script already in DOM: ${url}`);
          // If script is already in the DOM, it might be loaded or loading.
          // If it's loaded, window.Chart should be there.
          if (window.Chart) {
            Logger.debug('CHART', '[loadScript] window.Chart is already defined.');
            resolve();
          } else {
            // If it's not loaded yet, we can listen to the load event.
            existingScript.addEventListener('load', () => {
              Logger.debug('CHART', `[loadScript] Existing script loaded: ${url}`);
              resolve();
            });
            existingScript.addEventListener('error', () => {
              Logger.error('CHART', `[loadScript] Existing script failed to load: ${url}`);
              reject(new Error(`Failed to load script: ${url}`));
            });
          }
          return;
        }
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => {
          Logger.debug('CHART', `[loadScript] Script loaded: ${url}`);
          if (window.Chart) {
            Logger.debug('CHART', '[loadScript] window.Chart is now defined.');
          } else {
            Logger.warn('CHART', '[loadScript] window.Chart is still not defined after script load.');
          }
          resolve();
        };
        script.onerror = () => {
          Logger.error('CHART', `[loadScript] Error loading script: ${url}`);
          reject(new Error(`Failed to load script: ${url}`));
        };
        document.head.appendChild(script);
      });
    };

    try {
      if (!window.Chart) {
        Logger.debug('CHART', '[loadPlugins] Chart.js not loaded, invoking loadScript');
        await loadScript(this.card.config.chartjs_path);
      }

      if (!window.Chart) {
        Logger.error('CHART', '[loadPlugins] Chart.js could not be resolved');
        throw new Error("Chart.js could not be resolved");
      }

      if (!window.ChartJSdragDataPlugin) {
        Logger.debug('CHART', '[loadPlugins] dragDataPlugin not found, trying to load it');
        await loadScript(this.card.config.dragdata_path);
      }
      
      const dragDataPlugin = window.ChartJSdragDataPlugin || window.ChartDataDrag;

      if (dragDataPlugin) {
        Logger.debug('CHART', '[loadPlugins] Registering dragDataPlugin');
        // Avoid re-registering the plugin if it's already registered
        if (!window.Chart.registry.plugins.get('dragdata')) {
            window.Chart.register(dragDataPlugin);
            Logger.info('CHART', "chartjs-plugin-dragdata registered");
        }
      } else {
        Logger.warn('CHART', "dragdata plugin not found; proceeding");
      }

      pluginsLoaded = true;
      return true;

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
    Logger.verbose('CHART', '[initChart] called');
    const loaded = await this.loadPlugins();
    Logger.debug('CHART', `[initChart] Plugins loaded result: ${loaded}`);
    if (!loaded) return false;

    const ctx = canvas.getContext("2d");
    Logger.debug('CHART', `[initChart] Got canvas context: ${!!ctx}`);
    if (!ctx) return false;

    // Ensure any existing chart on this canvas context is destroyed
    if (window.Chart.getChart(ctx)) {
      Logger.warn('CHART', '[initChart] Found existing chart on canvas context, destroying it.');
      window.Chart.getChart(ctx).destroy();
    }

    const localize = (key, search, replace) => this.card.localizationManager.localize(this.card.language, key, search, replace);
    const yAxisLabel = this.card.config.y_axis_label
      ? `${this.card.config.y_axis_label} (${this.card.config.unit_of_measurement})`
      : localize('ui.temperature_label');
    Logger.debug('CHART', `[initChart] yAxisLabel: ${yAxisLabel}`);
    Logger.debug('CHART', `[initChart] stateManager scheduleData len: ${this.card.stateManager.scheduleData?.length}`);

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

    Logger.debug('CHART', '[initChart] Chart instance created');
    this.chartInitialized = true;
    this.updatePointStyling(
      this.card.selectionManager?.selectedPoint,
      this.card.selectionManager?.selectedPoints
    );
    Logger.verbose('CHART', '[initChart] Point styling updated');
    this.chart.update();
    Logger.verbose('CHART', '[initChart] chart.update() called');
    this.updateChartLabels(); // Ensure labels are set on initial load
    Logger.verbose('CHART', '[initChart] updateChartLabels() called');

    Logger.info('CHART', "Chart initialized successfully");
    return true;
  }

  /**
   * Get chart options configuration
   * @returns {Object}
   */
  getChartOptions() {
    Logger.verbose('CHART', '[getChartOptions] called');
    const localize = (key, search, replace) => this.card.localizationManager.localize(this.card.language, key, search, replace);
    const yAxisLabel = this.card.config.y_axis_label
      ? `${this.card.config.y_axis_label} (${this.card.config.unit_of_measurement})`
      : localize('ui.temperature_label');
    Logger.debug('CHART', `[getChartOptions] yAxisLabel: ${yAxisLabel}`);
    Logger.debug('CHART', `is_switch_preset: ${this.card.config.is_switch_preset}`);

    const yScaleConfig = {
      beginAtZero: false,
      min: this.card.config.min_value,
      max: this.card.config.max_value,
      title: {
        display: true,
        text: yAxisLabel,
      }
    };

    if (this.card.config.allow_max_value) {
      yScaleConfig.max = this.card.config.max_value + this.card.config.step_value;
      yScaleConfig.ticks = {
        ...yScaleConfig.ticks,
        callback: (value, index, ticks) => {
          if (value > this.card.config.max_value) {
            return "Max";
          }
          // For switch presets, handle On/Off labels
          if (this.card.config.is_switch_preset) {
            if (value === 0) return localize('ui.state_off');
            if (value === 1) return localize('ui.state_on');
            return '';
          }
          return value;
        }
      };
    }

    // LOG: Start custom Y-axis for switch preset
    if (this.card.config.is_switch_preset) {
      Logger.debug('CHART', '[getChartOptions] Configuring custom Y-axis ticks for switch preset');
      yScaleConfig.beginAtZero = true;
      yScaleConfig.ticks = {
        stepSize: 1,
        callback: function(value, index, ticks) {
          Logger.debug('CHART', `[Y-Tick callback] value=${value} index=${index} len=${ticks.length}`);
          Logger.debug('CHART', `[Y-Tick callback] ticks: ${JSON.stringify(ticks)}`);
          Logger.debug('CHART', `[Y-Tick callback] localize is: ${typeof localize}`);
          if (value === 0) {
            Logger.debug('CHART', '[Y-Tick callback] Returning OFF');
            return localize('ui.state_off');
          }
          if (value === 1) {
            Logger.debug('CHART', '[Y-Tick callback] Returning ON');
            return localize('ui.state_on');
          }
          Logger.debug('CHART', `[Y-Tick callback] Returning empty for value=${value}`);
          return '';
        }
      };
    }
    // LOG: End custom Y-axis for switch preset

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
   * Recreate chart options (called when config changes)
   * @returns {boolean}
   */
  recreateChartOptions() {
    Logger.verbose('CHART', '[recreateChartOptions] called');
    if (!this.chartInitialized || !this.chart) {
      Logger.debug('CHART', '[recreateChartOptions] Chart not initialized');
      return false;
    }

    Logger.debug('CHART', '[recreateChartOptions] Destroying and recreating chart');
    
    // Save current data and selection state
    const currentData = [...this.chart.data.datasets[0].data];
    const selectedPoint = this.card.selectionManager?.selectedPoint;
    const selectedPoints = this.card.selectionManager?.selectedPoints;
    
    // Get canvas element
    const canvas = this.card.shadowRoot?.getElementById("myChart");
    if (!canvas) {
      Logger.error('CHART', '[recreateChartOptions] Canvas not found');
      return false;
    }
    
    // Destroy old chart
    this.destroy();
    
    // Reinitialize with new options
    this.initChart(canvas).then(() => {
      Logger.debug('CHART', '[recreateChartOptions] Chart recreated');
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
    Logger.verbose('CHART', '[getDragDataOptions] called');
    return {
      round: this.card.config.step_value,
      dragX: false,
      onDragStart: (e, datasetIndex, index, value) => {
        if (this.hideValueDisplayTimeout) {
          clearTimeout(this.hideValueDisplayTimeout);
          this.hideValueDisplayTimeout = null;
        }
        Logger.debug('CHART', `[onDragStart] index=${index} value=${value}`);
        if (this.card.pointerHandler?.isSelecting) {
          Logger.debug('CHART', '[onDragStart] pointerHandler is selecting, abort');
          return false;
        }
        const selMgr = this.card.selectionManager;
        if (!selMgr) {
          Logger.debug('CHART', '[onDragStart] No selectionManager');
          return false;
        }
        if (!selMgr.isSelected(index)) {
          selMgr.selectIndices([index], false);
        } else {
          selMgr.setAnchor(index);
        }
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
        Logger.debug('CHART', `[onDrag] index=${index} value=${value}`);
        if (!this.dragStartValues || this.dragAnchorIndex === null) return;
        const anchorStartVal = this.dragStartValues[this.dragAnchorIndex];
        const delta = value - anchorStartVal;
        const dataset = this.chart.data.datasets[0];
        const selMgr = this.card.selectionManager;
        selMgr.getSelectedPoints().forEach(i => {
          let newVal = this.dragStartValues[i] + delta;
          const max_val = this.card.config.allow_max_value
              ? this.card.config.max_value + this.card.config.step_value
              : this.card.config.max_value;
          newVal = clamp(newVal, this.card.config.min_value, max_val);
          newVal = roundTo(newVal, this.card.config.is_switch_preset ? 0 : 1);
          dataset.data[i] = newVal;
        });
        this.chart.update('none');
        this.showDragValueDisplay(selMgr.getSelectedPoints(), dataset.data);
      },
      onDragEnd: (e, datasetIndex, index, value) => {
        Logger.debug('CHART', `[onDragEnd] index=${index} value=${value}`);
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
        if (this.hideValueDisplayTimeout) clearTimeout(this.hideValueDisplayTimeout);
        this.hideValueDisplayTimeout = setTimeout(() => {
          this.hideDragValueDisplay();
        }, 1500);
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
    if (this.card.wasLongPress) {
      this.card.wasLongPress = false; // Reset for next click
      return;
    }

    Logger.verbose('CHART', '[handleChartClick] called');
    if (Date.now() < this.card.suppressClickUntil) {
      Logger.debug('CHART', '[handleChartClick] Click suppressed');
      return;
    }
    const points = this.chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
    const isAdditive = !!(this.card.keyboardHandler?.ctrlDown || 
                          this.card.keyboardHandler?.metaDown || 
                          e.ctrlKey || e.metaKey);
    const selMgr = this.card.selectionManager;
    Logger.debug('CHART', `[handleChartClick] Found points: ${points?.length}`);
    if (points.length) {
      const index = points[0].index;
      Logger.debug('CHART', `[handleChartClick] Clicked index: ${index}`);
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
    Logger.verbose('CHART', '[updatePointStyling] called');
    if (!this.chartInitialized || !this.chart?.data?.datasets?.length) {
      Logger.debug('CHART', '[updatePointStyling] Not initialized');
      return;
    }
    const dataset = this.chart.data.datasets[0];
    const len = Array.isArray(dataset.data) ? dataset.data.length : 24;
    dataset.pointRadius = Array(len).fill(CHART_DEFAULTS.pointRadius);
    dataset.pointBackgroundColor = Array(len).fill(COLORS.primary);
    dataset.pointBorderColor = Array(len).fill(COLORS.primary);
    dataset.pointBorderWidth = Array(len).fill(CHART_DEFAULTS.borderWidth);
    if (Array.isArray(selectedPoints) && selectedPoints.length > 0) {
      selectedPoints.forEach(idx => {
        if (idx >= 0 && idx < len) {
          dataset.pointRadius[idx] = 8;
          dataset.pointBackgroundColor[idx] = COLORS.selected;
          dataset.pointBorderColor[idx] = COLORS.selectedDark;
          dataset.pointBorderWidth[idx] = 2;
          Logger.verbose('CHART', `[updatePointStyling] Styled selected point idx=${idx}`);
        }
      });
    }
    if (anchorPoint !== null && anchorPoint >= 0 && anchorPoint < len) {
      dataset.pointRadius[anchorPoint] = 9;
      dataset.pointBorderWidth[anchorPoint] = 3;
      dataset.pointBackgroundColor[anchorPoint] = COLORS.anchor;
      dataset.pointBorderColor[anchorPoint] = COLORS.anchorDark;
      Logger.verbose('CHART', `[updatePointStyling] Styled anchor point idx=${anchorPoint}`);
    }
  }

  /**
   * Show drag value display
   * @param {Array<number>} indices - Selected indices
   * @param {Array<number>} data - Chart data
   */
  showDragValueDisplay(indices, data) {
    Logger.verbose('CHART', '[showDragValueDisplay] called');
    const displayElement = this.card.shadowRoot?.getElementById('drag-value-display');
    if (!displayElement || indices.length === 0) {
      Logger.debug('CHART', '[showDragValueDisplay] No display element or indices empty');
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
      Logger.verbose('CHART', `[showDragValueDisplay] Display position: left=${containerX+10} top=${containerY-30}`);
    }
  }

  /**
   * Hide drag value display
   */
  hideDragValueDisplay() {
    Logger.verbose('CHART', '[hideDragValueDisplay] called');
    const displayElement = this.card.shadowRoot?.getElementById('drag-value-display');
    if (displayElement) {
      displayElement.style.display = 'none';
      Logger.debug('CHART', '[hideDragValueDisplay] Hiding display');
    }
  }

  /**
   * Get container-relative coordinates from canvas coordinates
   * @param {number} canvasX - Canvas X coordinate
   * @param {number} canvasY - Canvas Y coordinate
   * @returns {Object} {x, y}
   */
  getContainerRelativePointCoords(canvasX, canvasY) {
    Logger.verbose('CHART', '[getContainerRelativePointCoords] called');
    const container = this.card.shadowRoot?.querySelector(".chart-container");
    const canvas = this.card.shadowRoot?.getElementById("myChart");
    if (!container || !canvas) {
      Logger.debug('CHART', '[getContainerRelativePointCoords] container or canvas not found');
      return { x: 0, y: 0 };
    }
    const containerRect = container.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    const offsetX = canvasRect.left - containerRect.left;
    const offsetY = canvasRect.top - containerRect.top;
    Logger.verbose('CHART', `[getContainerRelativePointCoords] OffsetX=${offsetX} OffsetY=${offsetY}`);
    return { x: canvasX + offsetX, y: canvasY + offsetY };
  }

  /**
   * Update chart data
   * @param {Array<number>} data - New data
   */
  updateData(data) {
    Logger.verbose('CHART', '[updateData] called');
    if (!this.chartInitialized || !this.chart) {
      Logger.debug('CHART', '[updateData] Chart not initialized');
      return;
    }
    this.chart.data.datasets[0].data = [...data];
    Logger.debug('CHART', `[updateData] Data updated. Length: ${data.length}`);
    this.updatePointStyling(
      this.card.selectionManager?.selectedPoint,
      this.card.selectionManager?.selectedPoints
    );
    Logger.verbose('CHART', '[updateData] Point styling updated');
    this.chart.update();
    Logger.verbose('CHART', '[updateData] chart.update() called');
  }

  /**
   * Destroy chart
   */
  destroy() {
    Logger.verbose('CHART', '[destroy] called');
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
      this.chartInitialized = false;
      // Explicitly clear canvas dimensions
      const canvas = this.chart?.canvas;
      if (canvas) {
        canvas.width = 0;
        canvas.height = 0;
        Logger.debug('CHART', '[destroy] Canvas dimensions cleared');
      }
      Logger.debug('CHART', '[destroy] Chart destroyed');
    }
  }

  /**
   * Check if chart is initialized
   * @returns {boolean}
   */
  isInitialized() {
    Logger.verbose('CHART', '[isInitialized] called');
    return this.chartInitialized && this.chart !== null;
  }

  /**
   * Update chart (force redraw)
   */
  update() {
    Logger.verbose('CHART', '[update] called');
    if (this.chartInitialized && this.chart) {
      this.chart.update();
      Logger.verbose('CHART', '[update] chart.update() called');
    }
  }

  /**
   * Get chart instance
   * @returns {Chart|null}
   */
  getChart() {
    Logger.verbose('CHART', '[getChart] called');
    return this.chart;
  }

  updateChartLabels() {
    Logger.verbose('CHART', '[updateChartLabels] called');
    if (!this.chart) {
        Logger.warn('CHART', 'updateChartLabels: Chart not initialized');
        return;
    }
    Logger.verbose('CHART', 'updateChartLabels called');
    const localize = (key, search, replace) => this.card.localizationManager.localize(this.card.language, key, search, replace);

    const yAxisLabel = this.card.config.y_axis_label
      ? `${this.card.config.y_axis_label} (${this.card.config.unit_of_measurement})`
      : localize('ui.temperature_label');
    const newXLabel = localize('ui.time_label');

    Logger.debug('CHART', `New labels: ${yAxisLabel}, ${newXLabel}`);

    this.chart.data.datasets[0].label = yAxisLabel;
    this.chart.options.scales.y.title.text = yAxisLabel;
    this.chart.options.scales.x.title.text = newXLabel;
    Logger.verbose('CHART', 'Calling chart.update()');
    this.chart.update();
  }
}