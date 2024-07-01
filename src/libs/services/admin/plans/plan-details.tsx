import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/packages/queryBuilder';

export const getPlanDetailsQueryOptions = createQueryOptions({
  key: createQKey('admin', 'plan-details'),
  detail(id: string) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get(`admin/plans/${id}`, {
        headers: setSafeAccessToken(token),
      });
      return data;
    };

    return {
      queryFn,
      ssrQueryFn: createSSRQueryFn(queryFn),
    };
  },
});
