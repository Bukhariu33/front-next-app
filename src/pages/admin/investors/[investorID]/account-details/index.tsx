import type { GetServerSideProps } from 'next';

import SubLayout from '@/libs/admin/components/fund-managers/sub-layout';
import AdminInvestorAccountDetails from '@/libs/components/investor/account-details';
import { EPermission } from '@/libs/configs/appConfig';
import { acl } from '@/libs/packages/acl';
import { ProtectedView } from '@/libs/packages/acl/components/ProtectedView';
import { getSSRQuery } from '@/libs/packages/queryBuilder';
import { getAdminInvestorAccountDetailsQueryOptions } from '@/libs/services/admin/investors/investor-account-details';

const REQUIRE_PERMISSION: EPermission[] = [EPermission.ReadInvestors];

type PageProps = {
  investorID: string;
  can: Record<EPermission, boolean>;
};

function AdminInvestorSupportPage({ investorID, can }: PageProps) {
  return (
    <SubLayout>
      <ProtectedView can={can} required={[EPermission.ReadInvestors]}>
        <AdminInvestorAccountDetails investorID={investorID} />
      </ProtectedView>
    </SubLayout>
  );
}

export default AdminInvestorSupportPage;
export const getServerSideProps = (async context => {
  const accessToken = context.req.cookies.access_token;
  if (!accessToken)
    return {
      props: {},
      redirect: { destination: '/admin/auth/sign-in', permanent: false },
    };
  const can = await acl.canAccessAll(accessToken, REQUIRE_PERMISSION);
  const investorID = context.query.investorID?.toString();
  if (!investorID) return { notFound: true };
  const queryOptions =
    getAdminInvestorAccountDetailsQueryOptions.details(investorID);

  const { props: ssrProps, notFound } = await getSSRQuery(
    queryOptions,
    accessToken,
  );
  return {
    props: {
      ...ssrProps,
      investorID,
      can,
    },
    notFound,
  };
}) satisfies GetServerSideProps;
