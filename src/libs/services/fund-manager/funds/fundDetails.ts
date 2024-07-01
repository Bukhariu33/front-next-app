import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import type { BaseFund } from '@/libs/types/interface/fund/base';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/packages/queryBuilder';

export const getFundManagerFundDetailsQueryOptions = createQueryOptions({
  key: createQKey('fundManager', 'Fund'),
  detail(id: string, _language?: 'en' | 'ar') {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get<APIResponse<BaseFund>>(
        `/fund-manager/funds/${id}`,
        {
          headers: setSafeAccessToken(token),
        },
      );
      return data.data;
    };

    return {
      queryFn,
      ssrQueryFn: createSSRQueryFn(queryFn),
    };
  },
});
