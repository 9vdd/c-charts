import {
  select
} from 'd3-selection';
import {
  min,
  max
} from 'd3-array';
import {
  scaleLinear
} from 'd3-scale';
import {
  axisBottom,
  axisLeft
} from 'd3-axis';

import drawCandleChart from './shapes/candle.js';
import drawMaHandler from './shapes/maLine.js';

class Chart {
  constructor(config) {
    const defaultConfig = {
      axisLeftWidth: 50,
      axisBottomHeight: 20,
      margin: 10
    };
    this.config = {
      ...config,
      ...defaultConfig
    };
    if (typeof config.dom === 'string') {
      this.dom = document.querySelector(config.dom);
    } else {
      this.dom = config.dom;
    }
    this.data = config.data;
    this.charts = config.charts;
    this.init();
    this.initMainChart();
    this.initStrategyChart();
  }
  init() {
    this.svgWidth = this.dom.offsetWidth;
    this.svgHeight = this.dom.offsetHeight;
    this.svg = select(this.dom).append('svg');
    this.svg.attr('width', this.svgWidth);
    this.svg.attr('height', this.svgHeight);
  }
  initMainChart() {
    this.x = scaleLinear()
      .range([this.config.axisLeftWidth, this.svgWidth - this.config.margin])
      .domain([0, this.config.data.length - 1]);

    const xAxis = axisBottom()
      .scale(this.x)

    this.svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${this.svgHeight - this.config.axisBottomHeight})`)
      .call(xAxis);

    const minY = min(this.config.data, d => d.low);
    const maxY = max(this.config.data, d => d.high);
    
    this.y = scaleLinear()
      .range([this.config.margin, this.svgHeight - this.config.axisBottomHeight])
      .domain([maxY, minY]);

    const yAxis = axisLeft()
      .scale(this.y)

    this.svg.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${this.config.axisLeftWidth},0)`)
      .call(yAxis);
    
    this.svg.append('g')
    .append('path')
    .attr('d', 'M30,30 L200,200');


    const candleDom = drawCandleChart(this.config.data, this.x, this.y);
    const g = this.svg.append('g');
    g.html(candleDom.html());
  }
  initStrategyChart() {
    console.log(123, drawMaHandler);
    const maDom = drawMaHandler(this.config.data, this.x, this.y, 5);
    const g = this.svg.append('g');
    g.html(maDom.html());
  }
}

function chart(config) {
  if (typeof config === 'object' && typeof config.dom !== 'undefined') {
    const c = new Chart(config);
    return c;
  } else {
    throw Error('dom is required');
  }
}

window.chart = chart;

export default chart;