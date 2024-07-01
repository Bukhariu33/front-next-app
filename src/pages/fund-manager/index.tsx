import { Skeleton, Stack } from '@mantine/core';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import ArrowIcon from '@/icons/arrow-icon';
import Button from '@/libs/components/Base/Buttons/Button';
import TabToggle from '@/libs/components/Base/tab-toggle';
import MainTitle from '@/libs/components/Base/typography/MainTitle';
import DashboardStats from '@/libs/components/dashboard-stats';
import FundManagerFundCard from '@/libs/components/fund-manager/fund/funds-card';
import { Meta } from '@/libs/components/seo/meta';
import WelcomeDisplay from '@/libs/components/WelcomeDisplay';
import useLanguage from '@/libs/hooks/useLanguage';
import { getNextPageParam } from '@/libs/packages/queryBuilder';
import { getFundManagerFundListQueryOptions } from '@/libs/services/fund-manager/funds';

const Index = () => {
  const { t } = useTranslation(['common', 'fund']);
  const [activeTab, setActiveTab] = useState('myFunds');
  const { language } = useLanguage();
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    ...getFundManagerFundListQueryOptions.details(
      activeTab === 'myFunds' ? 'all' : 'fundApproved',
      language,
    ),
    getNextPageParam,
    getPreviousPageParam: firstPage => firstPage.meta.currentPage - 1,
  });

  const funds = data?.pages.flatMap(p => p.data);
  const fundMangerTabOptions = [
    { value: 'myFunds', label: t('fund:myFunds') },
    { value: 'fundsPendingApproval', label: t('fund:fundsPendingApproval') },
  ];

  const fundManagerStats = {
    // TODO: replace with real data
    offeredFundsCount: 19,
    totalOfferedFundsSize: 130_000_000,
  };
  return (
    <>
      <Meta title="Home" />
      <WelcomeDisplay />
      <DashboardStats
        userType="fundManager"
        fundManagerStats={fundManagerStats}
      />
      <MainTitle
        order={3}
        text={t('fund:investmentFundsDetails')}
        className="mb-[32px] mt-[48px] text-lg lg:text-xl xl:text-2xl"
      />
      <TabToggle
        options={fundMangerTabOptions}
        value={activeTab}
        onChange={setActiveTab}
        className="mx-auto w-fit max-lg:mb-[32px]"
        labelClassName="text-base font-medium leading-[1.25] py-[1.06rem]"
      />
      <Stack className="flex flex-col gap-10 lg:my-8">
        {isLoading && (
          <div className="flex gap-4">
            <Skeleton height={200} />
            <Skeleton height={200} />
          </div>
        )}
        {!isLoading && (
          <section className=" grid gap-4 md:grid-cols-2 lg:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
            {funds && funds.length > 0 ? (
              funds.map(fund => (
                <FundManagerFundCard
                  key={fund.id}
                  fund={fund}
                  actions={[
                    {
                      type: 'view',
                    },
                    {
                      type: 'download-invoice',
                    },
                  ]}
                />
              ))
            ) : (
              <div>{t('noDataFound')}</div>
            )}
          </section>
        )}
        <Button
          namespace="fund"
          classNames={{
            root: 'w-[min(100%,376px)] m-auto',
          }}
          text={hasNextPage ? 'loadMore' : 'noMoreData'}
          disabled={!hasNextPage}
          icon={<ArrowIcon className="rotate-[90deg]" />}
          onClick={() => fetchNextPage()}
        />
      </Stack>
    </>
  );
};

export default Index;
