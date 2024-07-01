import { Flex, Stack, Text } from '@mantine/core';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { getPublicFundDetails } from 'src/libs/services/public/funds';

import MainTitle from '@/libs/components/Base/typography/MainTitle';
import FundDetailsLayout from '@/libs/components/fund-details/FundDetails';
import RisksClosure from '@/libs/components/fund-details/RisksClosure';
import KYCAlert from '@/libs/components/kyc/alert';
import { Meta } from '@/libs/components/seo/meta';
import useUser from '@/libs/hooks/useUser';
import createFundCard from '@/utils/createFundCard';

export default function FundDetailsPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = useUser();
  const { fundId } = router.query;
  const { data: fundDetails, isLoading } = useQuery(
    getPublicFundDetails.details(fundId as string),
  );

  return (
    <>
      <Meta
        title={`Fund Details | ${isLoading ? 'loading...' : fundDetails?.name}`}
      />
      <Flex className="my-4 flex-col items-center justify-between gap-5 lg:flex-row lg:gap-[100px] xl:my-8">
        <Stack gap="16px">
          {!user ? (
            <MainTitle text={t('startInvestmentJourney')} />
          ) : (
            <MainTitle
              className="capitalize"
              text={`${t('welcomeBack')}, ${user.fullName}`}
            />
          )}
          <Text className=" opacity-60 ">{t('investmentActivities')}</Text>
        </Stack>
        <KYCAlert />
      </Flex>
      <Stack className="flex flex-col gap-10 lg:my-8">
        {fundDetails &&
          createFundCard(
            fundDetails,
            'horizontal',
            {
              primary: {
                text: 'investNow',
                as: 'button',
                onClick: async () => {
                  // TODO invest
                },
              },
              secondary: undefined,
            },
            true,
          )}
      </Stack>
      <RisksClosure />
      <FundDetailsLayout fund={fundDetails} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = new QueryClient();
  const queryOptions = getPublicFundDetails.details(
    context.query.fundId as string,
  );

  await queryClient.prefetchQuery(queryOptions.queryKey, queryOptions.queryFn);
  const dehydratedState = dehydrate(queryClient);

  if (dehydratedState.queries.length === 0)
    return {
      notFound: true,
    };

  return {
    props: {
      dehydratedState,
    },
  };
};
