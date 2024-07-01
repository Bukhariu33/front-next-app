import * as d3 from 'd3';

import type { AreaChartProps } from '../area-chart';

export const createAreaChartSvg = (
  node: HTMLDivElement,
  data: ChartDataItem[],
  margin: AreaChartProps['margin'],
  color: string,
  effectiveWidth: number,
  effectiveHeight: number,
) => {
  const svg = d3
    .select(node)
    .append('svg')
    .attr('width', effectiveWidth)
    .attr('height', effectiveHeight);

  const x = d3
    .scaleLinear()
    .domain([0, data.length - 1])
    .range([margin!.left, effectiveWidth - margin!.right]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.value)!])
    .nice()
    .range([effectiveHeight - margin!.bottom, margin!.top]);

  const area = d3
    .area<ChartDataItem>()
    .x((_, i) => x(i))
    .y0(y(0))
    .y1(d => y(d.value));

  svg.append('path').datum(data).attr('fill', color).attr('d', area);

  return svg;
};
