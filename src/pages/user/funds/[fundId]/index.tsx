import { Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import RisksClosure from '@/libs/components/fund-details/RisksClosure';
import InvestorFundDetailsPanel from '@/libs/components/investor/funds/fund-details';
import InvestorFundCard from '@/libs/components/investor/funds/investor-fund-card';
import InvestorFundDetailsLayout from '@/libs/components/investor/funds/investor-fund-details-layout';
import WelcomeDisplay from '@/libs/components/WelcomeDisplay';
import useUser from '@/libs/hooks/useUser';
import { getSSRQuery } from '@/libs/packages/queryBuilder';
import { getInvestorFundDetails } from '@/libs/services/investor/funds/fundDetails';

const InvestorFundPage = ({ fundId }: { fundId: string }) => {
  const { user } = useUser();
  const { data: fund } = useQuery(
    getInvestorFundDetails.details(fundId, user?.id!),
  );

  if (!fund) return null;
  return (
    <Stack className="gap-8 pb-8 pt-4">
      <WelcomeDisplay />
      <InvestorFundCard
        fund={fund}
        isDetailsPage
        isInvestmentCard
        actions={[
          {
            type: 'invest',
          },
        ]}
      />
      <RisksClosure />
      {fund.status !== 'live' ? (
        <InvestorFundDetailsLayout fund={fund} />
      ) : (
        <InvestorFundDetailsPanel fund={fund} />
      )}
    </Stack>
  );
};

export const getServerSideProps = (async context => {
  const session = await getSession(context);
  const accessToken = context.req.cookies.access_token;
  const fundId = context.query.fundId as string;

  const queryOptions = getInvestorFundDetails.details(
    fundId,
    session?.user?.id!,
  );

  const { props: ssrProps, notFound } = await getSSRQuery(
    queryOptions,
    accessToken,
  );

  if (ssrProps?.data.isInvested) {
    return {
      redirect: {
        destination: `/investor/my-investments/${fundId}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...ssrProps,
      fundId,
    },
    notFound,
  };
}) satisfies GetServerSideProps;
export default InvestorFundPage;
