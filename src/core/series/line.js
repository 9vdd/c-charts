

import {
  line
} from 'd3-shape';

class LineSeries {
  constructor(dom, data, x, y) {
    this.parentDom = dom;
    this.data = data;
    this.x = x;
    this.y = y;
    this.init();
  }
  init() {
    this.lineHandler = line()
      .defined(d => d)
      .x(d => this.x(d[0]))
      .y(d => this.y(d[1]))

    this.pathData = this.lineHandler(this.data);

    this.seriesDom = this.parentDom.append('path')
      .attr('class', 'line');
    // const pathData = this.dataHandler(data);

    this.seriesDom.attr('d', this.pathData)
      .style('stroke', 'red')
      .style('fill', 'none');
  }
  update(data) {
    this.data = data;
    this.pathData = this.lineHandler(this.data);
    this.seriesDom.attr('d', this.pathData);
  }
}
export function lineSeries(dom, data, x, y) {
  return new LineSeries(dom, data, x, y);
}