import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/packages/queryBuilder';

const getFundsOptionsQueryOptions = createQueryOptions({
  key: createQKey('admin', 'Fund-options'),
  detail(fundManagerId?: string) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get<
        APIResponse<{ value: string; label: string }[]>
      >(`/admin/funds/options`, {
        params: { fundManagerId },
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

export default getFundsOptionsQueryOptions;
