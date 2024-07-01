import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import type { AdminFund } from '@/libs/types/interface/fund';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/packages/queryBuilder';

export const getAdminFundDetailsQueryOptions = createQueryOptions<
  AdminFund,
  [string, 'en' | 'ar']
>({
  key: createQKey('admin', 'Fund'),
  detail: (id, locale) => {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get(`/admin/funds/${id}`, {
        headers: {
          ...setSafeAccessToken(token),
          'x-lang': locale ?? 'en',
        },
      });
      return data.data;
    };
    return {
      queryFn,
      ssrQueryFn: createSSRQueryFn(queryFn),
      enabled: !!id,
    };
  },
});
