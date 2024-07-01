import { Text } from '@mantine/core';

import type { BarChartProps } from '@/libs/packages/charts/bar-chart/bar-chart';
import BarChart from '@/libs/packages/charts/bar-chart/bar-chart';

type BarChartCardProps = {
  title: string;
  barChartProps: BarChartProps;
};

const BarChartCard = ({ title, barChartProps }: BarChartCardProps) => {
  return (
    <div className=" flex min-h-[350px] flex-col gap-8 rounded-2xl bg-white p-8 shadow-sm">
      <Text className=" text-base font-semibold sm:text-2xl">{title}</Text>
      <div className="flex h-full items-center justify-center">
        <BarChart {...barChartProps} />
      </div>
    </div>
  );
};

export default BarChartCard;
