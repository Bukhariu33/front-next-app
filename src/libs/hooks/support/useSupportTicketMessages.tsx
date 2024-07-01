import type { QKey, QueryOptionsResult } from '@/libs/packages/queryBuilder';
import { getAdminSupportTicketMessagesQueryOptions } from '@/libs/services/admin/support/support-ticket-messages';
import { getSupportTicketMessagesQueryOptions } from '@/libs/services/support/support-ticket-messages';
import type { UserType } from '@/libs/types/auth/user';

import useUser from '../useUser';

function useSupportTicketMessages(ticketId: string) {
  const { user } = useUser();

  const queryMap: Record<
    UserType,
    | {
        queryKey: QKey;
        details: (ticketId: string) => QueryOptionsResult<Message[]>;
      }
    | undefined
  > = {
    admin: getAdminSupportTicketMessagesQueryOptions,

    fundManager: getSupportTicketMessagesQueryOptions,
    corporateInvestor: getSupportTicketMessagesQueryOptions,
    individualInvestor: getSupportTicketMessagesQueryOptions,
  };

  if (user && !queryMap[user.type as UserType]) {
    throw new Error('Query options are not available');
  }

  const queryOptions = user ? queryMap[user.type as UserType] : undefined;
  return {
    queryKey: queryOptions?.queryKey as QKey,
    options: {
      ...queryOptions?.details(ticketId),
      enabled: !!ticketId && !!user?.type,
    },
  };
}

export default useSupportTicketMessages;
