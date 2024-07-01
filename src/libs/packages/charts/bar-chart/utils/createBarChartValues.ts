import * as d3 from 'd3';

export const createBarChartValues = (args: {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  data: ChartDataItem[];
  barWidth: number;
  gap: number;
  yScale: d3.ScaleLinear<number, number>;
  showLegends: boolean;
  topRange: number;
  svgHeight: number;
  setBarWidth: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const {
    svg,
    data,
    barWidth,
    gap,
    yScale,
    showLegends,
    topRange,
    svgHeight,
    setBarWidth,
  } = args;
  svg
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .text(d => d.value.toLocaleString('en-sa'))
    .attr('x', (_, i) => {
      let xPos = i * (barWidth + gap) + barWidth / 2 + 10;
      if (showLegends) xPos += topRange + gap / 2;
      return xPos;
    }) // horizontally centered
    .attr('y', d => yScale(d.value) + 25)
    .attr('fill', 'white')
    .attr('font-size', '18px')
    .attr('text-anchor', 'end')
    .each(function positionText(d, i) {
      let xValue = i * (barWidth + gap) + barWidth / 2;
      if (showLegends) xValue += gap / 2;
      const yValue = yScale(d.value) + 20;
      const barHeight = svgHeight - yScale(d.value);

      const thisText = d3.select(this as SVGTextElement);
      const textWidth = thisText.node()!.getBBox().width;

      if (barHeight < textWidth + 20) {
        if (barWidth < textWidth) {
          setBarWidth(textWidth + 20);
        }

        d3.select(this)
          .attr('x', () => {
            if (showLegends)
              return i * (barWidth + gap) + gap / 2 + barWidth / 2;
            return i * (barWidth + gap) + barWidth / 2;
          })
          .attr('y', () => {
            let yPos = yScale(d.value) - 2;
            if (showLegends) yPos -= topRange;
            return yPos;
          })
          .attr('fill', 'black')
          .attr('text-anchor', 'middle');
        return;
      }

      d3.select(this).attr('transform', `rotate(-90, ${xValue}, ${yValue})`);
    });
};
