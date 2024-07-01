import * as d3 from 'd3';

export const createHalfDonutSvg = (
  node: HTMLDivElement,
  width: number,
  radius: number,
) => {
  return d3
    .select(node)
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${width / 2}`)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${radius})`);
};
