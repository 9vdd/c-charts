import {
  select
} from "d3-selection";
import {
  scaleLinear
} from 'd3-scale';
import {
  axisBottom,
  axisLeft
} from 'd3-axis';
import {
  line
} from 'd3-shape';

// import defaultConfig from './defaultConfig';

class Chart {
  constructor(config) {
    this.config = config;
    this.dom = document.querySelector(config.query);
    this.svgWidth = this.config.width || this.dom.style.width || this.dom.offsetWidth;
    this.svgHeight = this.config.height || this.dom.style.height || this.dom.offsetHeight;
    this.svg = select(this.dom).append('svg');
    this.svg.attr('width', this.svgWidth);
    this.svg.attr('height', this.svgHeight);
    if (this.config.charts instanceof Array) {
      if (typeof this.charts === 'undefined') {
        this.charts = [];
      }
      this.config.charts.forEach((item, index) => {
        if (typeof item === 'object') {
          this.charts.push[this.initChart(item)];
        }
      });
    } else if (typeof this.config.charts === 'object') {
      this.charts = this.initChart(this.config.charts);
    }
  }
  initChart(chartConfig) {
    const x = scaleLinear()
      .range([50, chartConfig.width + 50])
      .domain(chartConfig.xdomain);

    const xAxis = axisBottom()
      .scale(x)

    this.svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${chartConfig.height + 10})`)
      .call(xAxis);

    const y = scaleLinear()
      .range([10, chartConfig.height + 10])
      .domain(chartConfig.ydomain);

    const yAxis = axisLeft()
      .scale(y)

    this.svg.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(50,0)')
      .call(yAxis);

    const lineHandler = line()
      .defined(d => d)
      .x(d => x(d[0]))
      .y(d => y(d[1]))

    this.svg.append('path')
      .attr('class', 'line')
      .attr('d', () => lineHandler(chartConfig.data))
      .style('stroke', 'red')
      .style('fill', 'none');
    
    return {
      x,
      y,
      xAxis,
      yAxis
    };
  }
}

function chart(config) {
  if (typeof config === 'object' && typeof config.query === 'string' && config.query.length > 0) {
    const c = new Chart(config);
    return c;
  } else {
    throw Error('query is required');
  }
}

window.chart = chart;

export default chart;