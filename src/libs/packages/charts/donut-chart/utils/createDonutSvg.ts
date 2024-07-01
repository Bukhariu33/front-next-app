import * as d3 from 'd3';

export const createDonutSvg = (node: HTMLDivElement, _width: number) => {
  const width = _width * 1.2; // 1.2 is a magic number to make the chart look better when click and select a slice to enlarge
  return d3
    .select(node)
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${width}`)
    .append('g')
    .attr('transform', `translate(${width / 2}, ${width / 2})`);
};
