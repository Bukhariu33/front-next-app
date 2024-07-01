import * as d3 from 'd3';

export const createBarChartSvg = (
  node: HTMLDivElement,
  minW: number,
  svgHt: number,
) => {
  return d3
    .select(node)
    .append('svg')
    .attr('width', minW)
    .attr('height', svgHt);
};
