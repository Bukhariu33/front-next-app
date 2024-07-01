import type { GetServerSideProps } from 'next';

import SubLayout from '@/libs/admin/components/fund-managers/sub-layout';
import AdminSupportTicketsTable from '@/libs/components/help-and-support/admin-support-tickets-table';
import { EPermission } from '@/libs/configs/appConfig';
import { acl } from '@/libs/packages/acl';
import { ProtectedView } from '@/libs/packages/acl/components/ProtectedView';
import { getSSRQuery } from '@/libs/packages/queryBuilder';
import AdminSupportListQueryOptions from '@/libs/services/admin/support/support-list';

const REQUIRE_PERMISSION: EPermission[] = [
  EPermission.ManageFundManagers,
  EPermission.ReadFundManagers,
];

function AdminFundManagerSupportPage({
  fundManagerID,
  can,
}: {
  fundManagerID: string;
  can: Record<EPermission, boolean>;
}) {
  return (
    <SubLayout>
      <ProtectedView can={can} required={[EPermission.ReadFundManagers]}>
        <AdminSupportTicketsTable fundManagerID={fundManagerID} />
      </ProtectedView>
    </SubLayout>
  );
}

export default AdminFundManagerSupportPage;
export const getServerSideProps = (async context => {
  const accessToken = context.req.cookies.access_token;
  if (!accessToken)
    return {
      props: {},
      redirect: { destination: '/admin/auth/sign-in', permanent: false },
    };
  const can = await acl.canAccessAll(accessToken, REQUIRE_PERMISSION);

  const fundManagerID = context.query.fundManagerID?.toString();
  if (!fundManagerID) return { notFound: true };
  const queryOptions = AdminSupportListQueryOptions.details({}, undefined, {
    fundManagerID,
  });

  const { props: ssrProps, notFound } = await getSSRQuery(
    queryOptions,
    accessToken,
  );
  return {
    props: {
      ...ssrProps,
      fundManagerID,
      can,
    },
    notFound,
  };
}) satisfies GetServerSideProps;
