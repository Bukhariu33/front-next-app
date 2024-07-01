import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import type { AdminFundManagerSingleItem } from '@/libs/types/fund-managers';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/packages/queryBuilder';

const fundManagerQueryOptions = createQueryOptions<
  AdminFundManagerSingleItem,
  [string, 'en' | 'ar']
>({
  key: createQKey('fundManager', 'fundManager-data'),
  detail: (id, locale) => {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get(`/admin/fund-managers/${id}`, {
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

export { fundManagerQueryOptions };
