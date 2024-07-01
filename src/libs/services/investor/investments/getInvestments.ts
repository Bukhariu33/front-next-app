import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/libs/packages/queryBuilder';
import type { APIResponseInvestorInvestments } from '@/libs/types/investors/investments';

export const getInvestorInvestmentsQueryOptions = createQueryOptions({
  key: createQKey('individualInvestor', 'investor-investments'),
  detail(userId: string) {
    const queryFn = async (context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get<APIResponseInvestorInvestments>(
        `/investor/investments`,
        {
          headers: setSafeAccessToken(token),
          params: { userId, page: context.pageParam },
        },
      );
      return data;
    };

    return {
      queryFn,
      ssrQueryFn: createSSRQueryFn(queryFn),
      enabled: !!userId,
    };
  },
});
