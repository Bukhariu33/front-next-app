import * as d3 from 'd3';

import { mapThicknessToRadii } from '../../utils/mapThicknessToRadii';
import type { HalfDonutChartProps } from '../half-donut-chart';

export const createHalfDonutChartSlices = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  data: ChartDataItem[],
  props: HalfDonutChartProps | any,
  radius: number,
) => {
  const pie = d3
    .pie<ChartDataItem>()
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2)
    .value(({ value }) => value);

  if (props.sortAsPassed || props.showSidePercentage) pie.sort(null);

  const arc = d3.arc();

  svg
    .selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', (d: any) => {
      const { inner, outer } = mapThicknessToRadii(
        props.thickness || 'medium',
        radius,
      );
      return arc.innerRadius(inner).outerRadius(outer)(d);
    })
    .attr('fill', (d: any) => d.data.color);
};
