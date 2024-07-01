import type { QKey, QueryOptionsResult } from '@/libs/packages/queryBuilder';
import { getAdminSupportTicketDetailsQueryOptions } from '@/libs/services/admin/support/support-ticket-details';
import { getSupportTicketDetailsQueryOptions } from '@/libs/services/support/support-ticket-details';
import type { UserType } from '@/libs/types/auth/user';
import type { SupportTicket } from '@/libs/types/interface/support/support-ticket';

import useUser from '../useUser';

function useSupportTicket(ticketId: string) {
  const { user } = useUser();

  const queryMap: Record<
    UserType,
    {
      queryKey: QKey;
      details: (ticketId: string) => QueryOptionsResult<SupportTicket>;
    }
  > = {
    admin: getAdminSupportTicketDetailsQueryOptions,
    fundManager: getSupportTicketDetailsQueryOptions,
    corporateInvestor: getSupportTicketDetailsQueryOptions,
    individualInvestor: getSupportTicketDetailsQueryOptions,
  };

  if (user && !(user.type in queryMap)) {
    throw new Error('Query options are not available');
  }

  const queryOptions:
    | {
        queryKey: QKey;
        details: (ticketId: string) => QueryOptionsResult<SupportTicket>;
      }
    | undefined = user ? queryMap[user.type as UserType] : undefined;
  return {
    queryKey: queryOptions?.queryKey as QKey,
    options: {
      ...queryOptions?.details(ticketId),
      enabled: !!ticketId && !!user?.type,
    },
  };
}

export default useSupportTicket;
