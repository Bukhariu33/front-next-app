import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import type { ClassNameValue } from 'tailwind-merge';

import styleConfig from '@/libs/configs/styleConfig';

import { mapToChartItem } from '../utils/mapToChartItem';
import { createAreaChartSvg } from './utils/createAreaChartSvg';

export interface AreaChartProps {
  data: number[] | Omit<ChartDataItem, 'color'>[];
  color?: string;
  margin?: { top: number; right: number; bottom: number; left: number };
  className?: ClassNameValue;
  aspectRatio?: number;
}

const AreaChart: React.FC<AreaChartProps> = ({
  data: passedData,
  color = styleConfig.colors.primary.main,
  aspectRatio = 16 / 9,
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const data = mapToChartItem(passedData);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const drawChart = () => {
      const { width: divWidth } = node.getBoundingClientRect();
      const effectiveHeight = divWidth / aspectRatio;

      d3.select(node).selectAll('svg').remove();
      createAreaChartSvg(node, data, margin, color, divWidth, effectiveHeight);
    };

    drawChart();

    const resizeObserver = new ResizeObserver(() => {
      drawChart();
    });
    resizeObserver.observe(node);

    return () => {
      resizeObserver.unobserve(node);
      d3.select(node).selectAll('svg').remove();
    };
  }, [data, color, margin, className, aspectRatio]);

  return (
    <div className={`flex flex-col ${className}`}>
      <div
        ref={ref}
        dir="ltr"
        className="flex h-full min-h-[150px] w-full min-w-[150px] select-none items-baseline justify-center"
      />
    </div>
  );
};

export default AreaChart;
