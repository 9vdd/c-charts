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
  const group = select(document.createElement('g'))
  .attr('class', 'chart');

  group.append('path')
  .attr('class', 'rect')
  .attr('fill', '#65c497')
  .attr('d', drawCandleRect(data, x, y));

  group.append('path')
  .attr('class', 'wick')
  .attr('stroke', '#65c497')
  .attr('d', drawCandleWick(data, x, y));

  return group;
}

export default drawCandleChart;