import { Stack, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

import { getStatsDetailsQueryOptions } from '../services/user/user-stats';

const InfoBox = ({
  title,
  value,
  link,
}: {
  title: ReactNode;
  value: string;
  link?: string;
}) => {
  return link ? (
    <Link href={link}>
      <Stack className="gap-2 rounded-lg bg-white px-20 py-4 text-center shadow-sm">
        <Text className="text-2xl font-bold leading-8">{title}</Text>
        <Text className="text-base font-medium text-[#A0A1A1]">{value}</Text>
      </Stack>
    </Link>
  ) : (
    <Stack className="gap-2 rounded-lg bg-white px-20 py-4 text-center shadow-sm">
      <Text className="text-2xl font-bold leading-8">{title}</Text>
      <Text className="text-base font-medium text-[#A0A1A1]">{value}</Text>
    </Stack>
  );
};



const DashboardStats = (props: any) => {
  const { data: userStats } = useQuery(getStatsDetailsQueryOptions.details());

  return (
    <div
          className={cn(
            'grid max-w-full grid-cols-1 flex-wrap gap-6 md:grid-cols-2 lg:grid-cols-3',
            props.wrapperClassName,
          )}
        >
          <InfoBox
            title={
              userStats?.activatedPlan ? userStats?.activatedPlan : 'No Plan'
            }
            value="Activated Plan"
            link="/user/plans"
          />
          <InfoBox
            title={
              userStats?.totalBalance ? userStats?.totalBalance : 'No Balance'
            }
            value="Total Balance"
            link="/user/withdraw"
          />
          <InfoBox
            title={
              userStats?.totalClicks ? userStats?.totalClicks : 'No Clicks'
            }
            value="Total Clicks"
            link="/user/ads"
          />
          <InfoBox
            title={userStats?.totalAds ? userStats?.totalAds : 'No Ads'}
            value="Total Ads"
            link="/user/ads"
          />
        </div>
  );
};

export default DashboardStats;
