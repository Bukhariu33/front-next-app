import { useMediaQuery } from '@mantine/hooks';
import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';
import type { ClassNameValue } from 'tailwind-merge';

import styleConfig from '@/libs/configs/styleConfig';

import { mapToChartItem } from '../utils/mapToChartItem';
import { createBarChartBars } from './utils/createBarChartBars';
import { createBarChartLegends } from './utils/createBarChartLegends';
import { createBarChartSvg } from './utils/createBarChartSvg';
import { createBarChartValues } from './utils/createBarChartValues';

export interface BarChartProps {
  /** Array of data items to render */
  data: number[] | ChartDataItem[];

  /** Width of each bar */
  barWidth?: number;

  /** Space between each bar */
  gap?: number;

  /** Color of the bars */
  barColor?: string;

  /** Shows the values passed inside the bars.
   * This will resize the bars width (overriding passed barWidth prop) to display the values on top of the bars if the values passed are too big to fit inside the bar height */
  showValues?: boolean;

  /** Shows the passed name under each bar */
  showLegends?: boolean;

  className?: ClassNameValue;
}

const BarChart: React.FC<BarChartProps> = ({
  data: passedData,
  barWidth: defaultBarWidth = 90,
  barColor = styleConfig.colors.primary.main,
  gap = 20,
  showValues,
  showLegends = false,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const data = mapToChartItem(passedData);
  const isMobile = useMediaQuery('(max-width:640px)');

  const [minHeight, setMinHeight] = useState(0);
  const [barWidth, setBarWidth] = useState(defaultBarWidth);

  useEffect(() => {
    if (isMobile && barWidth > 40) setBarWidth(40);
    else if (!isMobile && barWidth === 40) setBarWidth(90);
  }, [barWidth, isMobile]);
  useEffect(() => {
    const node = ref.current;
    if (!node) return () => {};

    let gapSize = gap;
    if (showLegends) {
      const tempSvg = d3.select('body').append('svg');

      const textWidths = data.map(d => {
        const tempText = tempSvg
          .append('text')
          .text(d.name)
          .attr('font-size', '14px')
          .attr('font-weight', '500');

        const { width } = tempText.node()!.getBBox();
        tempText.remove();
        return width;
      });

      tempSvg.remove();

      const maxTextWidth = Math.max(...textWidths);
      const space = Math.max(gap, maxTextWidth / 1.5);
      if (gapSize < space) gapSize = space;
    }

    const { height: divHt } = node.getBoundingClientRect();
    const maxY = Math.max(...data.map(d => d.value));
    setMinHeight(maxY + 200);

    const minW = showLegends
      ? data.length * (barWidth + gapSize) + gapSize
      : data.length * (barWidth + gapSize) - gapSize;
    const svgHeight = divHt;

    const topRange = showLegends ? 20 : 0;

    const yScale = d3
      .scaleLinear()
      .domain([0, maxY])
      .range([svgHeight - 50, topRange]);

    const svg = createBarChartSvg(node, minW, svgHeight);
    createBarChartBars({
      svg,
      data,
      barWidth,
      gap: gapSize,
      barColor,
      yScale,
      showLegends,
    });

    if (showValues)
      createBarChartValues({
        svg,
        data,
        yScale,
        gap: gapSize,
        showLegends,
        topRange,
        svgHeight,

        barWidth,
        setBarWidth,
      });

    if (showLegends) {
      createBarChartLegends({
        svg,
        data,
        barWidth,
        gap: gapSize,
        svgHeight,
      });
    }

    return () => d3.select(node).selectAll('svg').remove();
  }, [data, barWidth, barColor, gap, minHeight, showValues, showLegends]);

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

export default BarChart;
