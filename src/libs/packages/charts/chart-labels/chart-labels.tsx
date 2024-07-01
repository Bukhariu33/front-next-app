import { useTranslation } from 'next-i18next';

import type {
  Namespace,
  TranslationKey,
} from '@/libs/types/utils/withTranslation';
import { cn } from '@/utils/cn';

import { mapToChartItem } from '../utils/mapToChartItem';

export interface ChartLabelsProps<NS extends Namespace> {
  namespace: NS;
  data: { name: TranslationKey<NS>; value: number; color?: string }[];
  labelWidth?: number | string;
  orientation?: 'horizontal' | 'vertical';
  itemClassName?: string;
  valueClassName?: string;
  wrapperClassName?: string;
}

function ChartLabels<NS extends Namespace>({
  labelWidth,
  orientation = 'horizontal',
  itemClassName,
  valueClassName,
  wrapperClassName,
  ...props
}: ChartLabelsProps<NS>) {
  const { t } = useTranslation(props.namespace);
  const data = mapToChartItem(props.data as ChartDataItem[], true);
  const formattedLabelWidth = () => {
    if (labelWidth) {
      return typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth;
    }
    return null;
  };

  const isHorizontal = orientation === 'horizontal';
  return (
    <div
      className={cn(` w-full gap-4`, {
        'flex flex-col': orientation === 'vertical',
        grid: orientation === 'horizontal',
      })}
      style={{
        gridTemplateColumns: isHorizontal
          ? `repeat(auto-fill,minmax(${formattedLabelWidth() ?? '125px'},1fr))`
          : undefined,
      }}
    >
      {data.map(item => (
        <div
          className={cn('flex items-center gap-2', wrapperClassName)}
          key={item.name}
        >
          <div
            className="h-[4px] w-[11px] sm:h-3 sm:min-h-[0.75rem] sm:w-8 sm:min-w-[2rem]"
            style={{ backgroundColor: item.color }}
          />
          <div className={cn(itemClassName, 'text-sm md:text-lg')}>
            {t(item.name as any)}
          </div>
          <div className={cn(valueClassName, 'text-xs md:text-base')}>
            {' '}
            - {item?.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChartLabels;
