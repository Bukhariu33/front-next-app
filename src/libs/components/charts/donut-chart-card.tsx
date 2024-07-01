import { Text } from '@mantine/core';
import { useState } from 'react';

import type { ChartLabelsProps } from '@/libs/packages/charts/chart-labels/chart-labels';
import ChartLabels from '@/libs/packages/charts/chart-labels/chart-labels';
import type { ChartLabelsDynamicProps } from '@/libs/packages/charts/chart-labels/chart-labels-dynamic';
import ChartLabelsDynamic from '@/libs/packages/charts/chart-labels/chart-labels-dynamic';
import type { DonutChartProps } from '@/libs/packages/charts/donut-chart/donut-chart';
import DonutChart from '@/libs/packages/charts/donut-chart/donut-chart';
import type { Namespace } from '@/libs/types/utils/withTranslation';
import { cn } from '@/utils/cn';

type ChartData = {
  name: string;
  value: number;
  color?: string | undefined;
  subCategories?: {
    name: string;
    value: number;
  }[];
};

type DonutChartCardProps = {
  title: string;
  donutChartProps?: Omit<DonutChartProps, 'data'>;
  chartLabelsProps?: ChartLabelsProps<Namespace>;
  chartLabelsDynamicProps?: ChartLabelsDynamicProps<Namespace>;
  wrapperClassName?: string;
  data?: ChartData[];
  chartWrapperClassName?: string;
  withDynamicLabels?: boolean;
  onSliceClick?: (item: ChartDataItem) => void;
};
const customColors = [
  '#F765A3',
  '#16BFD6',
  '#165BAA',
  '#DCAC00',
  '#BEBEC1',
  '#1DDD8D',
  '#953BBF',
];
const DonutChartCard = ({
  title,
  donutChartProps,
  chartLabelsProps,
  wrapperClassName,
  chartWrapperClassName,
  chartLabelsDynamicProps,
  withDynamicLabels,
  data,
}: DonutChartCardProps) => {
  let chartData = data;
  if (chartData && chartData.length > 0) {
    const hasColor = chartData[0]?.color;
    if (!hasColor) {
      chartData = chartData.map((item, index) => ({
        ...item,
        color: customColors[index],
      }));
    }
  }
  const initialValue = chartData ? chartData[0] : null;
  const [selected, setSelected] = useState(initialValue);

  const handleChange = (item: ChartDataItem) => {
    const selectedItem = chartData?.find(
      (i: ChartData) => i.name === item.name,
    );
    setSelected(selectedItem);
  };

  return (
    <div
      className={cn(
        'rounded-2xl bg-white p-8 shadow-sm sm:min-h-[350px]',
        wrapperClassName,
      )}
    >
      <div className="flex h-full w-full flex-col justify-center gap-4">
        <Text className="text-base font-semibold sm:text-2xl">{title}</Text>
        <div className="flex w-full  flex-col items-center gap-10 md:flex-row">
          <div className={cn('w-[250px]', chartWrapperClassName)}>
            {chartData && (
              <DonutChart
                data={chartData?.map(item => ({
                  name: item.name,
                  value: item.value,
                  color: item.color,
                }))}
                {...donutChartProps}
                highlightBiggestSlice
                onSliceClick={handleChange}
              />
            )}
          </div>
          {chartLabelsProps ? (
            <ChartLabels
              {...chartLabelsProps}
              wrapperClassName="gap-4 md:gap-8"
            />
          ) : null}
          {withDynamicLabels ? (
            <ChartLabelsDynamic
              namespace="common"
              selectedItem={
                {
                  name: selected?.name,
                  subCategories: selected?.subCategories,
                  color: selected?.color,
                } as any
              }
              wrapperClassName="gap-4 md:gap-8"
              {...chartLabelsDynamicProps}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DonutChartCard;
