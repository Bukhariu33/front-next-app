export const createHalfDonutChartSideText = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  radius: number,
  rightPercentage: string,
  leftPercentage: string,
) => {
  svg
    .append('text')
    .attr('x', -radius + radius / 5.6)
    .attr('y', radius / 7)
    .attr('text-anchor', 'middle')
    .attr('font-size', '20px')
    .attr('font-weight', '700')
    .text(`${rightPercentage}%`);

  svg
    .append('text')
    .attr('x', radius - radius / 8)
    .attr('y', radius / 7)
    .attr('text-anchor', 'middle')
    .attr('font-size', '20px')
    .attr('font-weight', '700')
    .text(`${leftPercentage}%`);
};
