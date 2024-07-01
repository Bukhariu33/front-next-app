import { Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';

import BarChartCard from '@/libs/components/charts/bar-chart-card';
import DonutChartCard from '@/libs/components/charts/donut-chart-card';
import HalfDonutChartCard from '@/libs/components/charts/half-donut-chart-card';
import type { QueryOptionsReturnType } from '@/libs/packages/queryBuilder';
import type { BaseFundAnalysis } from '@/libs/types/base/fund-analysis';
import { cn } from '@/utils/cn';

type BoxProps = {
  title: string;
  value: number;
  className?: string;
};

const Box = ({ title, value, className }: BoxProps) => {
  const { t } = useTranslation('fund');
  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-2xl bg-white px-2 py-4 shadow-sm sm:gap-7 sm:p-8',
        className,
      )}
    >
      <Text className="text-center text-sm font-semibold sm:text-2xl">
        {title}
      </Text>
      <div className="flex flex-col justify-center gap-2 text-center">
        <Text className="text-base font-bold sm:text-3xl">{value}</Text>
        <Text className="text-xs font-medium sm:text-sm">{t('SAR')}</Text>
      </div>
    </div>
  );
};

type FundAnalysisProps = {
  fundId?: string;
  fundAnalysisQueryOptions: QueryOptionsReturnType<
    BaseFundAnalysis,
    [string | undefined]
  >;
};

const FundAnalysis = ({
  fundId,
  fundAnalysisQueryOptions,
}: FundAnalysisProps) => {
  const { t } = useTranslation('fund');
  const { data } = useQuery<BaseFundAnalysis>(
    fundAnalysisQueryOptions.details(fundId),
  );
  if (!data) return null;
  return (
    <div className="my-8 flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <Box
          title={t('highestAmountInvested')}
          value={data.highestAmountInvested}
        />
        <Box title={t('averageInvestments')} value={data.averageInvestments} />
        <Box
          title={t('mostFrequentlyInvestedAmount')}
          value={data.mostFrequentlyInvestedAmount}
          className="col-span-2 md:col-span-1"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <HalfDonutChartCard
          title={t('totalNumberOfInvestors')}
          chartProps={{
            data: [
              {
                name: 'males',
                value: data.investors.maleInvestors,
                color: '#165BAA',
              },
              {
                name: 'females',
                value: data.investors.femaleInvestors,
                color: '#F765A3',
              },
            ],
            showSidePercentage: true,
          }}
          chartLabelsProps={{
            namespace: 'fund',
            data: [
              {
                name: 'males',
                value: data.investors.maleInvestors,
                color: '#165BAA',
              },
              {
                name: 'females',
                value: data.investors.femaleInvestors,
                color: '#F765A3',
              },
            ],
          }}
          innerChild={
            <Text className="text-base font-bold sm:text-3xl">
              {data.investors.total}{' '}
              <span className="text-xs font-medium sm:text-sm md:text-base">
                {t('investor')}
              </span>
            </Text>
          }
        />

        <HalfDonutChartCard
          title={t('investedAmountByNationality')}
          chartProps={{
            data: [
              {
                name: 'saudi',
                value: data.investedAmountByNationality.saudi,
                color: '#DCAC00',
              },
              {
                name: 'other',
                value: data.investedAmountByNationality.nonSaudi,
                color: '#64646C',
              },
            ],
            showSidePercentage: true,
          }}
          chartLabelsProps={{
            namespace: 'fund',

            data: [
              {
                name: 'saudi',
                value: data.investedAmountByNationality.saudi,
                color: '#DCAC00',
              },
              {
                name: 'other',
                value: data.investedAmountByNationality.nonSaudi,
                color: '#64646C',
              },
            ],
          }}
        />

        <BarChartCard
          title={t('averageInvestmentByAgeGroup')}
          barChartProps={{
            data: [
              { name: '18-24', value: data.investorsAgeRange['18-24'] },
              { name: '25-34', value: data.investorsAgeRange['25-34'] },
              { name: '35-44', value: data.investorsAgeRange['35-44'] },
              { name: '45-54', value: data.investorsAgeRange['45-54'] },
              { name: '55+', value: data.investorsAgeRange['55+'] },
            ],
            barColor: '#BD9300',
            gap: 20,
            className: 'h-full',
            showValues: true,
            showLegends: true,
          }}
        />

        <DonutChartCard
          title={t('investorsAgeBracket')}
          data={[
            {
              name: '18-24',
              value: data.investorsAgeRange['18-24'],
              color: '#16BFD6',
            },
            {
              name: '25-34',
              value: data.investorsAgeRange['25-34'],
              color: '#1DDD8D',
            },
            {
              name: '35-44',
              value: data.investorsAgeRange['35-44'],
              color: '#953BBF',
            },
            {
              name: '45-54',
              value: data.investorsAgeRange['45-54'],
              color: '#165BAA',
            },
            {
              name: '55+',
              value: data.investorsAgeRange['55+'],
              color: '#F765A3',
            },
          ]}
          donutChartProps={{
            sortAsPassed: true,
          }}
          chartLabelsProps={
            {
              orientation: 'vertical',
              namespace: 'fund',
              data: [
                {
                  name: 'from18To24Years',
                  value: data.investorsAgeRange['18-24'],
                  color: '#16BFD6',
                },
                {
                  name: 'from25To34Years',
                  value: data.investorsAgeRange['25-34'],
                  color: '#1DDD8D',
                },
                {
                  name: 'from35To44Years',
                  value: data.investorsAgeRange['35-44'],
                  color: '#953BBF',
                },
                {
                  name: 'from45To54Years',
                  value: data.investorsAgeRange['45-54'],
                  color: '#165BAA',
                },
                {
                  name: 'from55YearsAndMore',
                  value: data.investorsAgeRange['55+'],
                  color: '#F765A3',
                },
              ],
            } as any
          }
        />
      </div>
    </div>
  );
};

export default FundAnalysis;
