import { Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import AdminFundManagerFundCard from '@/libs/admin/components/fund-managers/fund-manager-fund-card';
import Header from '@/libs/admin/layout/Header';
import FundDetails from '@/libs/components/fund-details/FundDetails';
import { EPermission } from '@/libs/configs/appConfig';
import useLanguage from '@/libs/hooks/useLanguage';
import { acl } from '@/libs/packages/acl';
import { ProtectedView } from '@/libs/packages/acl/components/ProtectedView';
import { getSSRQuery } from '@/libs/packages/queryBuilder';
import { getAdminFundDetailsQueryOptions } from '@/libs/services/admin/funds/fundDetails';

const REQUIRE_PERMISSION: EPermission[] = [
  EPermission.ReadFundManagers,
  EPermission.ReadFund,
];

type PageProps = {
  fundId: string;
  can: Record<EPermission, boolean>;
};

const AdminFundManagerFundDetailsPage = ({ fundId, can }: PageProps) => {
  const { t } = useTranslation('fund');
  const { query } = useRouter();
  const { fundManagerID } = query;
  const { language } = useLanguage();
  const { data: fundDetails } = useQuery(
    getAdminFundDetailsQueryOptions.details(fundId, language),
  );
  return (
    <ProtectedView
      can={can}
      required={[EPermission.ReadFund, EPermission.ReadFundManagers]}
    >
      <Stack>
        <Header
          backLink={`/admin/fund-managers/${fundManagerID}/funds`}
          title={t('fundDetails')}
        />

        <AdminFundManagerFundCard isDetailsPage fund={fundDetails} />
        <FundDetails fund={fundDetails} withInvestorsPage />
      </Stack>
    </ProtectedView>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const accessToken = context.req.cookies.access_token;
  if (!accessToken)
    return {
      props: {},
      redirect: { destination: '/admin/auth/sign-in', permanent: false },
    };
  const can = await acl.canAccessAll(accessToken, REQUIRE_PERMISSION);
  const { locale } = context;
  const fundId = context.params?.fundId;
  if (!fundId) return { notFound: true };
  const queryOptions = getAdminFundDetailsQueryOptions.details(
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
      can,
    },
    notFound,
  };
};

export default AdminFundManagerFundDetailsPage;
