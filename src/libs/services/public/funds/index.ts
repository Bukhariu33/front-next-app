import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import type { FundPublic } from '@/libs/types/interface/fund';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
} from '@/packages/queryBuilder';
import type { APIResponsePublicFunds } from '@/pages/api/public/funds';

const getPublicFundsList = createQueryOptions<APIResponsePublicFunds, [string]>(
  {
    key: createQKey('Global', 'Funds'),
    detail: type => {
      const queryFn = async (
        { pageParam }: QueryFunctionContext,
        _token?: string,
      ) => {
        const { data } = await axiosInternal.get(`/public/funds`, {
          params: {
            type,
            page: pageParam,
          },
        });
        return data;
      };
      return {
        queryFn,
        ssrQueryFn: createSSRQueryFn(queryFn),
      };
    },
  },
);

const getPublicFundDetails = createQueryOptions<FundPublic, [string]>({
  key: createQKey('Global', 'Fund-Details'),
  detail: id => ({
    queryFn: async () => {
      const { data } = await axiosInternal.get(`/public/funds/${id}`);
      return data.data;
    },
    enabled: !!id,
  }),
});

export { getPublicFundDetails, getPublicFundsList };
