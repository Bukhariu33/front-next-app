import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import type { InvestorFund } from '@/libs/types/interface/fund';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/packages/queryBuilder';

export const getInvestorFundDetails = createQueryOptions({
  key: createQKey('individualInvestor', 'fund-details'),
  detail(fundId: string, userId: string) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get<InvestorFund>(
        `/investor/funds/${fundId}`,
        {
          headers: setSafeAccessToken(token),
          params: { userId },
        },
      );

      return data;
    };

    return {
      queryFn,
      ssrQueryFn: createSSRQueryFn(queryFn),
      enabled: !!fundId && !!userId,
    };
  },
});
