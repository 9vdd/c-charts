// import drawLine from './line';
import {
  select
} from 'd3-selection';
import {
  line
} from 'd3-shape';
import ma from '../strategy/ma.js'

export default function drawMaHandler(data, x, y, day) {
  const computedData = ma(data, day);
  const lineHandler = line()
      .defined(d => d.ma)
      .x((d, index) => x(index))
      .y(d => y(d.ma))

  const pathData = lineHandler(computedData);

  const group = select(document.createElement('g'))
    .attr('class', 'line');

  group.append('path')
    .attr('d', pathData)
    .style('stroke', 'red')
    .style('fill', 'none');

  return group;
  // console.log(333, computedData);
  // return drawLine(computedData.map((item, index) => [index, item.ma]), x, y);
}