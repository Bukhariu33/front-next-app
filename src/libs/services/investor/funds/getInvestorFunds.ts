import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import type { APIResponseInvestorFunds } from '@/libs/types/interface/fund';
import type { APIResponseInvestorActiveFund } from '@/libs/types/investors/dashboard';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/packages/queryBuilder';

export const getInvestorFundListQueryOptions = createQueryOptions({
  key: createQKey('individualInvestor', 'investor-funds'),
  detail() {
    const queryFn = async (context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get<APIResponseInvestorFunds>(
        `/investor/funds`,
        {
          headers: setSafeAccessToken(token),
          params: { page: context.pageParam },
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

export const getInvestorFundsDashboardQueryOptions = createQueryOptions({
  key: createQKey('individualInvestor', 'investor-live-fund'),
  detail() {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get<APIResponseInvestorActiveFund>(
        `/investor/funds/dashboard`,
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
