export const createDonutChartCenterText = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  textValue: string,
) => {
  svg
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('x', 0)
    .attr('y', 0)
    .attr('text-anchor', 'middle')
    .attr('font-weight', '900')
    .attr('font-size', '25px')
    .text(textValue);
};
