import * as d3 from 'd3';

interface CreateLineChartProps {
  node: SVGGElement | null;
  initialData: ChartDataItem[];
  xScale: d3.ScaleBand<string>;
  yScale: d3.ScaleLinear<number, number>;
  lineGenerator: d3.Line<ChartDataItem>;
  color: string;
  width: number;
  height: number;
  stroke: number;
}

export const createLineChart = ({
  node,
  initialData,
  lineGenerator,
  color,
  width,
  height,
  stroke,
}: CreateLineChartProps) => {
  return d3
    .select(node)
    .append('svg')
    .attr('width', width)
    .attr('height', height)

    .append('path')
    .datum<ChartDataItem[]>(initialData)
    .attr('id', 'line')
    .attr('stroke', color)
    .attr('stroke-width', stroke)
    .attr('fill', 'none')
    .attr('d', lineGenerator);
};

interface UpdateLineChartProps {
  data: ChartDataItem[];
  lineGenerator: d3.Line<ChartDataItem>;
}

export const updateLineChart = ({
  data,
  lineGenerator,
}: UpdateLineChartProps) => {
  const t = d3.transition().duration(1000);
  const lineId = d3.select('#line');
  lineId.datum(data).transition(t).attr('d', lineGenerator);
};
