import { Text } from '@mantine/core';

import type { ChartLabelsProps } from '@/libs/packages/charts/chart-labels/chart-labels';
import ChartLabels from '@/libs/packages/charts/chart-labels/chart-labels';
import type { HalfDonutChartProps } from '@/libs/packages/charts/half-donut-chart/half-donut-chart';
import HalfDonutChart from '@/libs/packages/charts/half-donut-chart/half-donut-chart';
import type { Namespace } from '@/libs/types/utils/withTranslation';

interface HalfDonutChartCardProps<NS extends Namespace> {
  chartProps: HalfDonutChartProps;
  chartLabelsProps?: ChartLabelsProps<NS>;
  title: string;
  innerChild?: React.ReactNode;
}

const HalfDonutChartCard = <NS extends Namespace>({
  chartProps,
  chartLabelsProps,
  innerChild,
  title,
}: HalfDonutChartCardProps<NS>) => {
  return (
    <div className=" flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-sm md:flex-row md:items-center">
      <div className="min-w-[150px] sm:min-w-[250px]">
        <HalfDonutChart {...chartProps} />
      </div>
      <div className="flex flex-1 flex-col justify-around">
        <Text className="text-base font-semibold sm:text-2xl">{title}</Text>
        {innerChild}
        {chartLabelsProps ? <ChartLabels {...chartLabelsProps} /> : null}
      </div>
    </div>
  );
};

export default HalfDonutChartCard;
