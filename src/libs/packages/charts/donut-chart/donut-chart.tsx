import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import type { ClassNameValue } from 'tailwind-merge';

import { mapToChartItem } from '../utils/mapToChartItem';
import { createDonutChartCenterText } from './utils/createDonutChartCenterText';
import { createDonutChartSlices } from './utils/createDonutChartSlices';
import { createDonutSvg } from './utils/createDonutSvg';

export interface DonutChartProps {
  /** Array of data items to render */
  data: ChartDataItem[];

  /** Text to display at the center of the donut chart */
  centerText?: string;

  /** If set to 'biggest', the center text will display the percentage of the biggest slice */
  centerPercentage?: 'biggest';

  /** If true, the biggest slice will be visually highlighted */
  highlightBiggestSlice?: boolean;

  /** Starting angle of the first slice */
  rotationAngle?: number;

  /** If true, slices will appear in the order they are passed in the data array */
  sortAsPassed?: boolean;

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

  onSliceClick?: (item: ChartDataItem) => void;
}

const DonutChart: React.FC<DonutChartProps> = ({
  data: passedData,
  className,
  onSliceClick,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const data = mapToChartItem(passedData, true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return () => {};
    const { width } = node.getBoundingClientRect();
    const radius = Math.min(width, width) / 2;

    const svg = createDonutSvg(node, width);

    createDonutChartSlices(svg, { ...props, onSliceClick, data }, radius);

    if (props.centerText || props.centerPercentage) {
      const totalValue = data.reduce((sum, { value }) => sum + value, 0);
      const maxDataItem = data.reduce((max, cur) =>
        max.value > cur.value ? max : cur,
      );
      const textValue =
        props.centerPercentage === 'biggest'
          ? `${((maxDataItem.value / totalValue) * 100).toFixed(0)}%`
          : props.centerText || '';

      createDonutChartCenterText(svg, textValue);
    }
    return () => d3.select(node).selectAll('svg').remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${className}`}>
      <div ref={ref} className="flex items-baseline justify-center" />
    </div>
  );
};

export default DonutChart;
