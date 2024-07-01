import * as d3 from 'd3';

import { mapThicknessToRadii } from '../../utils/mapThicknessToRadii';
import type { DonutChartProps } from '../donut-chart';

export const createDonutChartSlices = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  props: DonutChartProps,
  radius: number,
) => {
  const { data, onSliceClick } = props;

  const pie = d3.pie<ChartDataItem>().value(({ value }) => value);
  if (props.sortAsPassed) pie.sort(null);

  const arc = d3
    .arc()
    .startAngle(
      ({ startAngle }: any) =>
        startAngle + (Math.PI / 180) * (props.rotationAngle || 0),
    )
    .endAngle(
      ({ endAngle }: any) =>
        endAngle + (Math.PI / 180) * (props.rotationAngle || 0),
    );

  svg
    .selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', (d: any) => {
      const { inner: defaultInner, outer: defaultOuter } = mapThicknessToRadii(
        props.thickness || 'medium',
        radius,
      );

      return arc.innerRadius(defaultInner).outerRadius(defaultOuter)(d);
    })
    .attr('fill', (d: any) => d.data.color)
    .style('cursor', 'pointer')
    .on('click', function handleClick(_, d) {
      if (onSliceClick) {
        onSliceClick(d.data);
        const { inner: defaultInner, outer: defaultOuter } =
          mapThicknessToRadii(props.thickness || 'medium', radius);
        const $s = d3.select(this);
        const newInner = defaultInner * 0.95;
        const newOuter = defaultOuter * 1.05;

        $s.transition()
          .duration(200)
          .attr('d', (_d: any) =>
            arc.innerRadius(newInner).outerRadius(newOuter)(_d),
          );

        // restore the size of other slices
        svg.selectAll('path').each(function restore(_d, i) {
          if (i !== d.index) {
            d3.select(this)
              .transition()
              .duration(200)
              .attr('d', (__d: any) =>
                arc.innerRadius(defaultInner).outerRadius(defaultOuter)(__d),
              )
              .transition();
          }
        });
      }
    });
};
