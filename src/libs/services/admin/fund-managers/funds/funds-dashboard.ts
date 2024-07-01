import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import type { APIResponseAdminFundManagerFundsDashboard } from '@/libs/types/admin/fund-managers/fund-manager-funds';
import type { BaseFund } from '@/libs/types/interface/fund/base';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/packages/queryBuilder';

export const adminFundManagerFundsDashboardQueryOptions = createQueryOptions({
  key: createQKey('admin', 'fundManager-funds'),
  detail: (fundManagerId: string, type?: BaseFund['status'] | 'all') => {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } =
        await axiosInternal.get<APIResponseAdminFundManagerFundsDashboard>(
          `/admin/fund-managers/${fundManagerId}/funds`,
          {
            headers: {
              ...setSafeAccessToken(token),
            },
            params: {
              type,
            },
          },
        );
      return data.data;
    };
    return {
      queryFn,
      ssrQueryFn: createSSRQueryFn(queryFn),
      enabled: !!fundManagerId,
    };
  },
});
