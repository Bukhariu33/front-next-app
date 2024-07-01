import type { GetServerSideProps } from 'next';

import UserSupportTicket from '@/libs/components/help-and-support/user-support-ticket';
import { getSSRQuery } from '@/libs/packages/queryBuilder';
import { getSupportTicketDetailsQueryOptions } from '@/libs/services/support/support-ticket-details';

export default function InvestorTicketPage({ ticketId }: { ticketId: string }) {
  return <UserSupportTicket ticketId={ticketId} />;
}

export const getServerSideProps: GetServerSideProps = async context => {
  const accessToken = context.req.cookies.access_token;

  const { ticketId } = context.query;
  const queryOptions = getSupportTicketDetailsQueryOptions.details(
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
    },
    notFound,
  };
};
