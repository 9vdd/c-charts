import {
  select
} from 'd3-selection';
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

class ChartItem {
  constructor(chartConfig) {
    this.chartDom = chartConfig.chartDom;
    this.x = scaleLinear()
      .range([50, chartConfig.width + 50])
      .domain(chartConfig.xdomain);

    this.xAxis = axisBottom()
      .scale(this.x)

    this.chartDom.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${chartConfig.height + 10})`)
      .call(this.xAxis);

    this.y = scaleLinear()
      .range([10, chartConfig.height + 10])
      .domain(chartConfig.ydomain);

    this.yAxis = axisLeft()
      .scale(this.y)

    this.chartDom.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(50,0)')
      .call(this.yAxis);

    this.bindData(chartConfig.data);
  }

  bindData(data) {
    const lineHandler = line()
      .defined(d => d)
      .x(d => this.x(d[0]))
      .y(d => this.y(d[1]))

    this.chartDom.append('path')
      .attr('class', 'line')
      .attr('d', () => lineHandler(data))
      .style('stroke', 'red')
      .style('fill', 'none');
  }

  update(data) {
    this.bindData(data);
  }
}

export default ChartItem;