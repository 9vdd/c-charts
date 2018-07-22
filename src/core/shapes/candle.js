import {
  select
} from 'd3-selection';

function drawCandleRect (data, x, y) {
  const width = 3
  const path = data.map((item, index) => {
    return `M ${x(index) - width} ${y(+item.open)} l ${2 * width} 0 L ${x(index) + width} ${y(+item.close)} l ${-2 * width} 0 L ${x(index) - width} ${y(+item.open)}`
  }).join(' ')
  return path
}
function drawCandleWick (data, x, y) {
  return data.map((item, index) => {
    return `M ${x(index)} ${y(+item.high)} L ${x(index)} ${y(+item.low)}`
  }).join(' ')
}
function drawCandleChart (data, x, y) {
  // this.svg.select('path.up-rect')
  //   .attr('d', () => {
  //     const path = drawCandleRect(this.upData)
  //     return path
  //   })
  // const group = document.createElement('g');
  // const test = d3.select(group);
  // this.svg.select('path.up-wick')
  //   .attr('d', () => this.drawCandleWick(this.upData))
  // this.svg.select('path.down-rect')
  //   .attr('d', () => this.drawCandleRect(this.downData))
  // this.svg.select('path.down-wick')
  //   .attr('d', () => this.drawCandleWick(this.downData))
  const group = select(document.createElement('g'))
  .attr('class', 'chart');

  group.append('path')
  .attr('class', 'rect')
  .attr('fill', 'none')
  .attr('stroke', 'red')
  // .style('fill', 'white')
  // .style('stroke', 'red')
  // .style('stroke-width', '2')
  .attr('d', drawCandleRect(data, x, y));

  group.append('path')
  .attr('class', 'wick')
  .attr('d', drawCandleWick(data, x, y));

  return group;
}

export default drawCandleChart;