import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/libs/packages/queryBuilder';

export const getAdminInvestorAccountDetailsQueryOptions = createQueryOptions({
  key: createQKey('admin', 'investor-account-details'),
  detail(investorId: string) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get(
        `/admin/investors/${investorId}/bank-details`,
        {
          headers: setSafeAccessToken(token),
        },
      );
      return data;
    };

    return {
      queryFn,
      ssrQueryFn: createSSRQueryFn(queryFn),
    };
  },
});
