export const createBarChartBars = (args: {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  data: ChartDataItem[];
  barWidth: number;
  gap: number;
  barColor: string;
  yScale: d3.ScaleLinear<number, number>;
  showLegends: boolean;
}) => {
  const { svg, data, barWidth, gap, barColor, yScale, showLegends } = args;
  svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (_, i) => {
      if (showLegends) return i * (barWidth + gap) + gap / 2;
      return i * (barWidth + gap);
    })
    .attr('y', d => (showLegends ? yScale(d.value) - 20 : yScale(d.value)))
    .attr('width', barWidth)
    .attr(
      'height',
      d => (svg.attr('height') as unknown as number) - yScale(d.value),
    )
    .attr('fill', d => d.color || barColor);
};
