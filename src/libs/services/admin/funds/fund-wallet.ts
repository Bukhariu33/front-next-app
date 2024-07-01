import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import type {
  APIResponseAdminFundWallet,
  FundWallet,
} from '@/libs/types/admin/funds/fund-wallet';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/packages/queryBuilder';

export const getAdminFundWalletQueryOptions = createQueryOptions<FundWallet>({
  key: createQKey('admin', 'Fund-wallet'),
  detail: id => {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get<APIResponseAdminFundWallet>(
        `/admin/funds/${id}/transactions`,
        {
          headers: setSafeAccessToken(token),
        },
      );
      return data.data;
    };
    return {
      queryFn,
      ssrQueryFn: createSSRQueryFn(queryFn),
      enabled: !!id,
    };
  },
});
