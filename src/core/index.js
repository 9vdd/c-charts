import { select } from "d3-selection";
import { scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { line } from 'd3-shape'

function chart(dom) {
  const svg = select(dom)
      .append('svg')
      .attr('width', 400)
      .attr('height', 400);
  const width = select(dom).width;
  const height = select(dom).height;
  const x = scaleLinear()
        .range([50, 350])
        .domain([0, 300]);

  const xAxis = axisBottom()
        .scale(x)

  svg.append('g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,320)')
  .call(xAxis);

  const y = scaleLinear()
        .range([20, 320])
        .domain([300, 0]);

  const yAxis = axisLeft()
        .scale(y)

  svg.append('g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(50,0)')
  .call(yAxis);

  const data = [[10,10], [50,50], [100, 100], [300, 300]];

  const lineHandler = line()
      .defined(d => d)
      .x(d => x(d[0]))
      .y(d => y(d[1]))

  const lineData = lineHandler(data);
  console.log(lineHandler);
  svg.append('path')
  .attr('d', () => lineHandler(data))
  .style('stroke', 'red');

  console.log(svg);
}

window.chart = chart;

export default chart;