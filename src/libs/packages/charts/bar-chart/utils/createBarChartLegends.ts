export const createBarChartLegends = (args: {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  data: ChartDataItem[];
  barWidth: number;
  gap: number;
  svgHeight: number;
}) => {
  const { svg, data, barWidth, gap, svgHeight } = args;
  svg
    .selectAll('.legend')
    .data(data)
    .enter()
    .append('text')
    .attr('class', 'legend')
    .text(d => d.name)
    .attr('x', (_, i) => i * (barWidth + gap) + gap / 2 + barWidth / 2)
    .attr('y', svgHeight - 5)
    .attr('text-anchor', 'middle')
    .attr('font-size', '16px')
    .attr('font-weight', '500');
};
