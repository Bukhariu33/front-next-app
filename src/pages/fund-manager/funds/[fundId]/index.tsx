import { Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';

import Header from '@/libs/admin/layout/Header';
import FundDetails from '@/libs/components/fund-details/FundDetails';
import type { AllowedActions } from '@/libs/components/fund-manager/fund/funds-card';
import FundManagerFundCard from '@/libs/components/fund-manager/fund/funds-card';
import useUpdateFundStatus from '@/libs/hooks/fund-managers/funds/use-update-fund-status';
import useLanguage from '@/libs/hooks/useLanguage';
import { getSSRQuery } from '@/libs/packages/queryBuilder';
import { getFundManagerFundDetailsQueryOptions } from '@/libs/services/fund-manager/funds/fundDetails';

interface FundDetailsPageProps {
  fundId: string;
}
export default function FundDetailsPage({ fundId }: FundDetailsPageProps) {
  const { t } = useTranslation(['common', 'fund']);
  const { language } = useLanguage();
  const { data: fundDetails } = useQuery(
    getFundManagerFundDetailsQueryOptions.details(fundId, language),
  );

  const { updateFundStatus } = useUpdateFundStatus(fundId);

  let actions: AllowedActions[] | undefined;

  if (
    fundDetails?.status === 'fundApproved' ||
    fundDetails?.status === 'contractRejected'
  ) {
    actions = [
      {
        type: 'approve',
        approve: () => {
          updateFundStatus('contractApproved');
        },
      },
      {
        type: 'reject',
        reject: () => {
          updateFundStatus('contractRejected');
        },
      },
    ];
  } else {
    actions = undefined;
  }

  return (
    <Stack className="">
      <Header backLink="/fund-manager" title={t('fund:fundDetails')} />
      <FundManagerFundCard fund={fundDetails} isDetailsPage actions={actions} />
      <FundDetails fund={fundDetails} withInvestorsPage />
    </Stack>
  );
}

export const getServerSideProps = (async context => {
  const accessToken = context.req.cookies.access_token;
  const fundId = context.query.fundId as string;
  const locale = context.locale as string;
  const queryOptions = getFundManagerFundDetailsQueryOptions.details(
    fundId as string,
    locale as 'en' | 'ar',
  );

  const { props: ssrProps, notFound } = await getSSRQuery(
    queryOptions,
    accessToken,
  );
  return {
    props: {
      ...ssrProps,
      fundId,
    },
    notFound,
  };
}) satisfies GetServerSideProps;
