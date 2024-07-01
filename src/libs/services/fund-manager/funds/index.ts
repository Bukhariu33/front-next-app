import { axiosInternal } from '@/libs/configs/axios';
import type { BaseFund } from '@/libs/types/interface/fund/base';
import { createQKey, createQueryOptions } from '@/packages/queryBuilder';
import type { APIResponseFundManagerFunds } from '@/pages/api/fund-manager/funds';

export const getFundManagerFundListQueryOptions = createQueryOptions<
  APIResponseFundManagerFunds,
  [BaseFund['status'] | 'all', 'en' | 'ar']
>({
  key: createQKey('fundManager', 'Fund-list'),
  detail: type => ({
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axiosInternal.get(`/fund-manager/funds`, {
        params: { type, page: pageParam },
      });
      return data;
    },
  }),
});
