import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/libs/packages/queryBuilder';

export const getAdminSupportTicketDetailsQueryOptions = createQueryOptions({
  key: createQKey('admin', 'support-ticket'),
  detail(ticketId: string) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get(`/admin/support/${ticketId}`, {
        headers: setSafeAccessToken(token),
      });
      return data.data;
    };

    return {
      queryFn,
      ssrQueryFn: createSSRQueryFn(queryFn),
    };
  },
});
