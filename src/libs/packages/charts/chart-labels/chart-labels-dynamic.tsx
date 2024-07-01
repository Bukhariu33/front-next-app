import { useTranslation } from 'next-i18next';

import type {
  Namespace,
  TranslationKey,
} from '@/libs/types/utils/withTranslation';
import { cn } from '@/utils/cn';

export interface ChartLabelsDynamicProps<NS extends Namespace> {
  namespace: NS;
  itemClassName?: string;
  valueClassName?: string;
  selectedItem: {
    name: TranslationKey<NS>;
    subCategories: { name: TranslationKey<NS>; value: string }[];
    color?: string;
  };
  wrapperClassName?: string;
}

function ChartLabelsDynamic<NS extends Namespace>({
  itemClassName,
  valueClassName,
  wrapperClassName,
  selectedItem: data,
  ...props
}: ChartLabelsDynamicProps<NS>) {
  const { t } = useTranslation(props.namespace);
  return (
    <div className={cn('flex w-full flex-col  gap-2', wrapperClassName)}>
      <div className="flex items-center justify-start gap-2">
        <div
          className="h-[4px] w-[11px] sm:h-3 sm:min-h-[0.75rem] sm:w-8 sm:min-w-[2rem]"
          style={{ backgroundColor: data?.color }}
        />
        <div className={cn(itemClassName, 'text-sm font-medium md:text-3xl')}>
          {t(data?.name as any)}
        </div>
      </div>
      <div className={cn(valueClassName, 'text-xs font-normal md:text-xl')}>
        {data?.subCategories.map(item => (
          <div className="" key={item.name as string}>
            {item.value} - {t(item.name as any)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChartLabelsDynamic;
