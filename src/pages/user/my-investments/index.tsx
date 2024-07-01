import { Text } from '@mantine/core';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';

import Button from '@/libs/components/Base/Buttons/Button';
import InvestorFundCard from '@/libs/components/investor/funds/investor-fund-card';
import InvestmentsDashboard from '@/libs/components/investor/investments/dashboard';
import ArrowIcon from '@/libs/icons/arrow-icon';
import { getNextPageParam, getSSRQuery } from '@/libs/packages/queryBuilder';
import { getInvestorInvestmentsDashboardQueryOptions } from '@/libs/services/investor/investments/dashboard';
import { getInvestorInvestmentsQueryOptions } from '@/libs/services/investor/investments/getInvestments';
import { cn } from '@/utils/cn';

const Index = ({ userId }: { userId: string }) => {
  const { t } = useTranslation('common');

  const { data: dashboardStats } = useQuery(
    getInvestorInvestmentsDashboardQueryOptions.details(),
  );

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    ...getInvestorInvestmentsQueryOptions.details(userId),
    getNextPageParam,
  });
  const investments = data?.pages.flatMap(p => p.data);

  return (
    <div className="flex flex-col gap-5 py-5">
      <Text className="text-2xl font-bold">{t('generalOverview')}</Text>
      <InvestmentsDashboard dashboardStats={dashboardStats} />
      <Text className="text-2xl font-bold">{t('investmentsDetails')}</Text>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {investments && investments.length > 0 ? (
          investments?.map(fund => (
            <div key={fund.id}>
              <InvestorFundCard
                fund={fund}
                investmentDetails={{
                  isInvested: true,
                  investmentValue: fund.investmentAmount,
                }}
                actions={[
                  {
                    type: 'investment-details',
                  },
                ]}
              />
            </div>
          ))
        ) : (
          <div
            className="text-center text-3xl font-bold"
            data-cy-id="noInvestmentsYet"
          >
            {t('noInvestmentsYet')}
          </div>
        )}
      </div>
      <Button
        namespace="fund"
        classNames={{
          root: 'w-[min(100%,376px)] m-auto',
        }}
        className={cn({
          hidden: investments?.length === 0,
        })}
        text="loadMore"
        disabled={!hasNextPage}
        icon={<ArrowIcon className="rotate-[90deg]" />}
        onClick={() => fetchNextPage()}
      />
    </div>
  );
};

export const getServerSideProps = (async context => {
  const accessToken = context.req.cookies.access_token;
  const session = await getSession(context);
  const { props: ssrPropsDashboard } = await getSSRQuery(
    getInvestorInvestmentsDashboardQueryOptions.details(),
    accessToken,
  );

  const { props: investments } = await getSSRQuery(
    getInvestorInvestmentsQueryOptions.details(session?.user?.id!),
    accessToken,
  );

  return {
    props: {
      ...ssrPropsDashboard,
      ...investments,
      userId: session?.user?.id!,
    },
  };
}) satisfies GetServerSideProps;
export default Index;
