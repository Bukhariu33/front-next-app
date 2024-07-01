import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/libs/packages/queryBuilder';
import type { Investment } from '@/libs/types/investors/investments';
import type { APIResponseInvestorInvestmentInfo } from '@/libs/types/investors/investments/investment-fund-data';

export const getInvestorInvestmentDetailsQueryOptions = createQueryOptions({
  key: createQKey('individualInvestor', 'investor-investment-details'),
  detail(investmentId) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get<Investment>(
        `/investor/investments/${investmentId}`,
        {
          headers: setSafeAccessToken(token),
        },
      );
      return data;
    };

    return {
      queryFn,
      ssrQueryFn: createSSRQueryFn(queryFn),
      enabled: !!investmentId,
    };
  },
});

export const getInvestorInvestmentInfoQueryOptions = createQueryOptions({
  key: createQKey('individualInvestor', 'investor-investment-info'),
  detail(investmentId) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } =
        await axiosInternal.get<APIResponseInvestorInvestmentInfo>(
          `/investor/investments/${investmentId}/investment-details`,
          {
            headers: setSafeAccessToken(token),
          },
        );
      return data.data;
    };

    return {
      queryFn,
      ssrQueryFn: createSSRQueryFn(queryFn),
      enabled: !!investmentId,
    };
  },
});
