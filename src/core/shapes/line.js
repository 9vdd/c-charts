import {
  select
} from 'd3-selection';
import {
  line
} from 'd3-shape';

function drawLineHandler(data, x, y) {
  console.log(23, data);
  const lineHandler = line()
      .defined(d => d.ma)
      .x((d, index) => x(index))
      .y(d => y(d))

  const pathData = lineHandler(data);

  console.log(pathData);

  const group = select(document.createElement('g'))
    .attr('class', 'line');

  group.append('path')
    .attr('d', pathData)
    .style('stroke', 'red');

  return group;
}

export default drawLineHandler;
