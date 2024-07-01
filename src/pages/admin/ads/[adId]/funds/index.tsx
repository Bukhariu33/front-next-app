import { Skeleton } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import AdminFundManagerFundCard from '@/libs/admin/components/fund-managers/fund-manager-fund-card';
import SubLayout from '@/libs/admin/components/fund-managers/sub-layout';
import TabToggle from '@/libs/components/Base/tab-toggle';
import DashboardStats from '@/libs/components/dashboard-stats';
import { EPermission } from '@/libs/configs/appConfig';
import { acl } from '@/libs/packages/acl';
import { ProtectedView } from '@/libs/packages/acl/components/ProtectedView';
import { getSSRQuery } from '@/libs/packages/queryBuilder';
import { adminFundManagerFundsDashboardQueryOptions } from '@/libs/services/admin/fund-managers/funds/funds-dashboard';

const REQUIRE_PERMISSION: EPermission[] = [
  EPermission.ReadFundManagers,
  EPermission.ReadFund,
];

type PageProps = {
  fundManagerID: string;
  can: Record<EPermission, boolean>;
};

const Index = ({ fundManagerID, can }: PageProps) => {
  const [activeTab, setActiveTab] = useState('myFunds');
  const { t } = useTranslation(['common', 'fund']);

  const { data } = useQuery(
    adminFundManagerFundsDashboardQueryOptions.details(
      fundManagerID,
      activeTab === 'myFunds' ? 'all' : 'fundApproved',
    ),
  );
  const fundMangerTabOptions = [
    { value: 'myFunds', label: t('fund:myFunds') },
    { value: 'fundsPendingApproval', label: t('fund:fundsPendingApproval') },
  ];
  return (
    <SubLayout>
      <ProtectedView
        can={can}
        required={[EPermission.ReadFund, EPermission.ReadFundManagers]}
      >
        <div className="flex flex-col gap-8">
          {data?.fundStats ? (
            <DashboardStats
              userType="fundManager"
              wrapperClassName="grid-cols-1 md:grid-cols-1 lg:grid-cols-2"
              fundManagerStats={data.fundStats}
            />
          ) : (
            <div className="flex gap-2">
              <Skeleton height={200} />
              <Skeleton height={200} />
            </div>
          )}

          <TabToggle
            options={fundMangerTabOptions}
            value={activeTab}
            onChange={setActiveTab}
            className="mx-auto w-fit max-lg:mb-[32px]"
            labelClassName="text-base font-medium leading-[1.25] py-[1.06rem]"
          />
          {data?.funds && data?.funds.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {data.funds.map(fund => (
                <AdminFundManagerFundCard
                  key={fund.id}
                  fund={fund}
                  withoutDetails
                  actions={
                    activeTab === 'myFunds'
                      ? [
                          {
                            type: 'download-invoice',
                          },
                          {
                            type: 'view',
                          },
                        ]
                      : [
                          {
                            type: 'view',
                          },
                        ]
                  }
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-3xl font-bold">
              {t('noFundsToShow')}
            </div>
          )}
        </div>
      </ProtectedView>
    </SubLayout>
  );
};

export const getServerSideProps = (async context => {
  const accessToken = context.req.cookies.access_token;
  if (!accessToken)
    return {
      props: {},
      redirect: { destination: '/admin/auth/sign-in', permanent: false },
    };
  const can = await acl.canAccessAll(accessToken, REQUIRE_PERMISSION);
  const fundManagerID = context.query?.fundManagerID as string;
  const { props: ssrPropsFundList, notFound } = await getSSRQuery(
    adminFundManagerFundsDashboardQueryOptions.details(fundManagerID),
    accessToken,
  );

  return {
    props: {
      ...ssrPropsFundList,
      fundManagerID,
      can,
    },
    notFound,
  };
}) satisfies GetServerSideProps;

export default Index;
