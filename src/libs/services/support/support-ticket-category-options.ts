import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/libs/packages/queryBuilder';

export const getSupportTicketOptionsQueryOptions = createQueryOptions({
  key: createQKey('Global', 'support-ticket-options'),
  detail(_language: 'en' | 'ar') {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get(`/support/options`, {
        headers: setSafeAccessToken(token),
      });
      return data.data as { label: string; value: string }[];
    };

    return {
      queryFn,
      ssrQueryFn: createSSRQueryFn(queryFn),
    };
  },
});
