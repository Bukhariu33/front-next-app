import { Stack } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useQuery } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';

import InvestorFundCard from '@/libs/components/investor/funds/investor-fund-card';
import InvestorInvestmentDetailsLayout from '@/libs/components/investor/investments/investment-details/investment-details-layout';
import {
  CancelInvestmentModalContent,
  CancelInvestmentModalHeader,
} from '@/libs/components/investor/investments/modals/cancel-investment';
import { getSSRQuery } from '@/libs/packages/queryBuilder';
import {
  getInvestorInvestmentDetailsQueryOptions,
  getInvestorInvestmentInfoQueryOptions,
} from '@/libs/services/investor/investments/investmentDetails';

const MyInvestmentsDetailPage = ({
  investmentId,
}: {
  investmentId: string;
}) => {
  const { data: investment } = useQuery(
    getInvestorInvestmentDetailsQueryOptions.details(investmentId),
  );

  const { data: info } = useQuery(
    getInvestorInvestmentInfoQueryOptions.details(investmentId),
  );

  if (!investment || !info) return null;
  return (
    <Stack className="gap-8 pb-8 pt-4">
      <InvestorFundCard
        fund={investment}
        isDetailsPage
        investmentDetails={{
          isInvested: true,
          investmentValue: investment.investmentAmount,
        }}
        actions={[
          {
            type: 'invest',
          },
          {
            type: 'cancel-investment',
            onClick: () => {
              modals.open({
                size: 'lg',
                title: (
                  <CancelInvestmentModalHeader
                    investmentDate={investment.investmentDate}
                  />
                ),
                children: (
                  <CancelInvestmentModalContent
                    investmentDate={investment.investmentDate}
                  />
                ),
              });
            },
          },
        ]}
      />
      <InvestorInvestmentDetailsLayout
        fund={investment}
        investmentInfo={info}
      />
    </Stack>
  );
};

export const getServerSideProps = (async context => {
  const accessToken = context.req.cookies.access_token;
  const investmentId = context.query.investmentId as string;
  const fundQueryOptions =
    getInvestorInvestmentDetailsQueryOptions.details(investmentId);
  const infoQueryOptions =
    getInvestorInvestmentInfoQueryOptions.details(investmentId);

  const { props: ssrProps, notFound } = await getSSRQuery(
    fundQueryOptions,
    accessToken,
  );

  const { props: infoProps } = await getSSRQuery(infoQueryOptions, accessToken);

  return {
    props: {
      ...ssrProps,
      ...infoProps,
      investmentId,
    },
    notFound,
  };
}) satisfies GetServerSideProps;
export default MyInvestmentsDetailPage;
