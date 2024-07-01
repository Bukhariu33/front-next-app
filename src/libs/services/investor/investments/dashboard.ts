import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/libs/packages/queryBuilder';
import type { InvestorInvestmentsDashboardData } from '@/libs/types/investors/investments/dashboard';

export const getInvestorInvestmentsDashboardQueryOptions = createQueryOptions({
  key: createQKey('individualInvestor', 'investor-investments-dashboard'),
  detail() {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } =
        await axiosInternal.get<InvestorInvestmentsDashboardData>(
          `/investor/investments/dashboard`,
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
