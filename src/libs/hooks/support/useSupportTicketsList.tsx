import type { QKey, QueryOptionsResult } from '@/libs/packages/queryBuilder';
import type { TableQueryFunctionReturn } from '@/libs/packages/tables';
import type { FilterParams } from '@/libs/packages/tables/types';
import listSupportQueryOptions from '@/libs/services/support/support-list';
import type { UserType } from '@/libs/types/auth/user';
import type { SupportTicket } from '@/libs/types/interface/support/support-ticket';

import useUser from '../useUser';

function useSupportTicketsList() {
  const { user } = useUser();

  const queryMap: Record<
    UserType,
    | {
        queryKey: QKey;
        details: (
          queryParams: FilterParams,
          ...args: any[]
        ) => QueryOptionsResult<
          TableQueryFunctionReturn<'support', SupportTicket>
        >;
      }
    | undefined
  > = {
    admin: undefined,
    fundManager: listSupportQueryOptions,
    corporateInvestor: listSupportQueryOptions,
    individualInvestor: listSupportQueryOptions,
  };

  if (user && !queryMap[user.type as UserType]) {
    throw new Error('Query options are not available');
  }

  const queryOptions = user ? queryMap[user.type as UserType] : undefined;
  return {
    queryKey: queryOptions?.queryKey as QKey,
    options: {
      ...queryOptions?.details({}),
      enabled: !!user?.type,
    },
  };
}

export default useSupportTicketsList;
