import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/packages/queryBuilder';

export const getUserPlanDetailsQueryOptions = createQueryOptions({
  key: createQKey('individualInvestor', 'user-plan-details'),
  detail(id: string) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get(
        `user/plans/${id}/current-plan`,
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
