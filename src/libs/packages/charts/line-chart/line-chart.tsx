import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

import styleConfig from '@/libs/configs/styleConfig';

import { mapToChartItem } from '../utils/mapToChartItem';
import { createLineChart, updateLineChart } from './utils/d3LineChartUtils'; // Update the import path

interface LineChartProps {
  data: number[] | ChartDataItem[];
  color?: string;
  margins?: { top: number; right: number; bottom: number; left: number };
  width?: number;
  height?: number;
  stroke?: number;
}

const LineChart: React.FC<LineChartProps> = ({
  data: passedData,
  color = styleConfig.colors.primary.main,
  margins = { top: 0, right: 0, bottom: 0, left: 0 },
  width = 250,
  height = 100,
  stroke = 2,
}) => {
  const ref = useRef<SVGGElement>(null);

  const data = mapToChartItem(passedData);

  const effectiveWidth = width - margins.left - margins.right;
  const effectiveHeight = height - margins.top - margins.bottom;

  const xScale = d3
    .scaleBand()
    .domain(data.map(d => d.name))
    .rangeRound([-stroke / 2, effectiveWidth + effectiveWidth / 8]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, d => d.value) as [number, number])
    .range([effectiveHeight - stroke / 2, stroke / 2])
    .nice();

  const lineGenerator = d3
    .line<ChartDataItem>()
    .x(d => xScale(d.name) as number)
    .y(d => yScale(d.value) as number)
    .curve(d3.curveMonotoneX);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const initialData = data.map(d => ({ name: d.name, value: 0 }));

    const svg = createLineChart({
      node,
      initialData,
      xScale,
      yScale,
      lineGenerator,
      color,
      width: effectiveWidth,
      height: effectiveHeight,
      stroke,
    });

    updateLineChart({ data, lineGenerator });

    return () => {
      svg.remove();
    };
  }, [
    data,
    color,
    lineGenerator,
    effectiveHeight,
    effectiveWidth,
    margins,
    xScale,
    yScale,
    stroke,
  ]);

  return (
    <svg
      width={width + margins.left + margins.right}
      height={height + margins.top + margins.bottom}
    >
      <g transform={`translate(${margins.left}, ${margins.top})`} ref={ref} />
    </svg>
  );
};

export default LineChart;
