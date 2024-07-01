import type { GetServerSideProps } from 'next';

import SubLayout from '@/libs/admin/components/fund-managers/sub-layout';
import AdminSupportTicket from '@/libs/components/help-and-support/admin-support-ticket';
import { EPermission } from '@/libs/configs/appConfig';
import { acl } from '@/libs/packages/acl';
import { ProtectedView } from '@/libs/packages/acl/components/ProtectedView';
import { getSSRQuery } from '@/libs/packages/queryBuilder';
import { getAdminSupportTicketDetailsQueryOptions } from '@/libs/services/admin/support/support-ticket-details';

interface AdminInvestorSupportTicketPageProps {
  ticketId: string;
  can: Record<string, boolean>;
}

const REQUIRE_PERMISSION: EPermission[] = [
  EPermission.ReadInvestors,
  EPermission.ManageInvestors,
];

export default function AdminInvestorSupportTicketPage({
  ticketId,
  can,
}: AdminInvestorSupportTicketPageProps) {
  return (
    <SubLayout>
      <ProtectedView
        can={can}
        required={[EPermission.ReadInvestors, EPermission.ManageInvestors]}
      >
        <AdminSupportTicket ticketId={ticketId} />
      </ProtectedView>
    </SubLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const accessToken = context.req.cookies.access_token;

  if (!accessToken)
    return {
      props: {},
      redirect: { destination: '/admin/auth/sign-in', permanent: false },
    };
  const can = await acl.canAccessAll(accessToken, REQUIRE_PERMISSION);

  const { ticketId } = context.query;
  const queryOptions = getAdminSupportTicketDetailsQueryOptions.details(
    ticketId as string,
  );

  const { props: ssrProps, notFound } = await getSSRQuery(
    queryOptions,
    accessToken,
  );
  return {
    props: {
      ...ssrProps,
      ticketId,
      can,
    },
    notFound,
  };
};
