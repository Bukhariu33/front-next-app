import type { GetServerSideProps } from 'next';

import SubLayout from '@/libs/admin/components/fund-managers/sub-layout';
import AdminSupportTicketsTable from '@/libs/components/help-and-support/admin-support-tickets-table';
import { EPermission } from '@/libs/configs/appConfig';
import { acl } from '@/libs/packages/acl';
import { ProtectedView } from '@/libs/packages/acl/components/ProtectedView';
import { getSSRQuery } from '@/libs/packages/queryBuilder';
import AdminSupportListQueryOptions from '@/libs/services/admin/support/support-list';

const REQUIRE_PERMISSION: EPermission[] = [EPermission.ReadInvestors];

export default function AdminInvestorSupportPage({
  investorID,
  can,
}: {
  investorID: string;
  can: Record<string, boolean>;
}) {
  return (
    <SubLayout>
      <ProtectedView can={can} required={[EPermission.ReadInvestors]}>
        <AdminSupportTicketsTable investorID={investorID} />
      </ProtectedView>
    </SubLayout>
  );
}

export const getServerSideProps = (async context => {
  const accessToken = context.req.cookies.access_token;

  if (!accessToken)
    return {
      props: {},
      redirect: { destination: '/admin/auth/sign-in', permanent: false },
    };
  const can = await acl.canAccessAll(accessToken, REQUIRE_PERMISSION);

  const investorID = context.query.investorID?.toString();
  const queryOptions = AdminSupportListQueryOptions.details({}, undefined, {
    investorID,
  });

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
