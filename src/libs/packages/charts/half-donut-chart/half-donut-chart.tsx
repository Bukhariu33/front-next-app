import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import type { ClassNameValue } from 'tailwind-merge';

import { mapToChartItem } from '../utils/mapToChartItem';
import { createHalfDonutChartCenterText } from './utils/createHalfDonutChartCenterText';
import { createHalfDonutChartSideText } from './utils/createHalfDonutChartSideText';
import { createHalfDonutChartSlices } from './utils/createHalfDonutChartSlices';
import { createHalfDonutSvg } from './utils/createHalfDonutSvg';

export interface HalfDonutChartProps {
  /** Array of data items to render */
  data: number[] | ChartDataItem[];

  /** Text to display at the center of the half donut chart */
  centerText?: string;

  /** If set to 'biggest', the center text will display the percentage of the biggest slice */
  centerPercentage?: 'biggest';

  /** If true, slices will appear in the order they are passed in the data array */
  sortAsPassed?: boolean;

  /**
   * When set to true and the data array contains exactly two items, this flag enables the display
   * of percentage values underneath each half of the donut chart.
   */
  showSidePercentage?: boolean;

  /** Thickness of the donut chart slices */
  thickness?:
    | 'thin'
    | 'thinner'
    | 'thinnest'
    | 'thick'
    | 'thicker'
    | 'thickest'
    | 'medium';

  className?: ClassNameValue;
}

const HalfDonutChart: React.FC<HalfDonutChartProps> = ({
  data: passedData,
  className,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const data = mapToChartItem(passedData, true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return () => {};
    const { width } = node.getBoundingClientRect();
    const margin =
      props.showSidePercentage && data.length === 2 ? width / 12 : 0;
    const radius = Math.min(width, width) / 2 - margin;

    const totalValue = data.reduce((sum, { value }) => sum + value, 0);
    const maxDataItem = data.reduce((max, cur) =>
      max.value > cur.value ? max : cur,
    );

    const svg = createHalfDonutSvg(node, width, radius);

    createHalfDonutChartSlices(svg, data, props, radius);

    if (props.showSidePercentage && data.length === 2) {
      const [firstPercentage, secondPercentage] = data.map(d => {
        return ((d.value / totalValue) * 100).toFixed(0);
      });
      createHalfDonutChartSideText(
        svg,
        radius,
        firstPercentage!,
        secondPercentage!,
      );
    }

    if (props.centerText || props.centerPercentage) {
      const textValue =
        props.centerPercentage === 'biggest'
          ? `${((maxDataItem.value / totalValue) * 100).toFixed(0)}%`
          : props.centerText || '';

      createHalfDonutChartCenterText(svg, textValue);
    }

    return () => d3.select(node).selectAll('svg').remove();
  }, [data, props]);

  return (
    <div className={`${className}`}>
      <div ref={ref} className="flex items-baseline justify-center" />
    </div>
  );
};

export default HalfDonutChart;
