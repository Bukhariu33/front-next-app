export const createHalfDonutChartCenterText = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  textValue: string,
) => {
  svg
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('x', 0)
    .attr('y', 0)
    .attr('dy', '-0.2em')
    .attr('text-anchor', 'middle')
    .attr('font-weight', '900')
    .attr('font-size', '25px')
    .text(textValue);
};
