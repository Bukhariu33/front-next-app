import { Text } from '@mantine/core';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import useFormatToMoney from '@/libs/hooks/useFormatToMoney';
import InfoIcon from '@/libs/icons/info-icon';
import type { InvestorInvestmentsDashboardData } from '@/libs/types/investors/investments/dashboard';

import Button from '../../Base/Buttons/Button';
import DonutChartCard from '../../charts/donut-chart-card';
import HalfDonutChartCard from '../../charts/half-donut-chart-card';

type Props = {
  dashboardStats?: InvestorInvestmentsDashboardData;
};

const InvestmentsDashboard = ({ dashboardStats }: Props) => {
  const { t } = useTranslation('common');
  const { format } = useFormatToMoney();
  if (!dashboardStats)
    return (
      <div className="flex flex-col gap-1" data-cy-id="no-investments">
        <p className="text-center text-3xl font-medium">{t('noInvestments')}</p>
        <Link href="/investor" className="self-center">
          <Button
            namespace="common"
            text="startInvestmentJourney"
            className="w-fit"
          />
        </Link>
      </div>
    );

  return (
    <div
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
      data-cy-id="investments-dashboard"
    >
      <div className="flex flex-col gap-3">
        <HalfDonutChartCard
          title={t('totalAmountInvested')}
          chartProps={{
            data: [
              {
                name: 'totalAmountInvested',
                value: dashboardStats?.totalAmountInvested!,
                color: '#BEBEC1',
              },
              {
                name: 'Remaining wallet balance',
                value: dashboardStats?.remainingWalletBalance!,
                color: '#DCAC00',
              },
            ],
            showSidePercentage: true,
          }}
          innerChild={
            <div className="flex flex-col gap-2">
              <Text className="text-3xl font-bold">
                {format(dashboardStats.totalAmountInvested)}
              </Text>
              <Text className="text-xs font-medium">
                {t('remainingWalletBalance')}
              </Text>
              <Text className="text-2xl font-bold">
                {format(dashboardStats.remainingWalletBalance)}
              </Text>
            </div>
          }
        />
        <div className=" flex flex-col gap-3 rounded-2xl bg-white p-8 shadow-sm">
          <Text className="text-2xl font-medium">{t('profits')}</Text>
          <Text className="text-2xl font-bold">
            {format(dashboardStats?.profits!)}
          </Text>
          <div className="flex gap-2">
            <InfoIcon />
            <Text className="text-xs font-medium">
              {t('expectedYearlyReturns')}{' '}
              {dashboardStats?.expectedYearlyReturn}%
            </Text>
          </div>
        </div>
      </div>
      <div className="h-full w-full">
        <DonutChartCard
          wrapperClassName="h-full flex flex-col items-center"
          chartWrapperClassName="w-[450px]"
          title={t('investments')}
          data={dashboardStats?.investments}
          withDynamicLabels
        />
      </div>
    </div>
  );
};

export default InvestmentsDashboard;
