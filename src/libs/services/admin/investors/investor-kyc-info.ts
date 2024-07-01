import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/packages/queryBuilder';

const investorKycQueryOptions = createQueryOptions({
  key: createQKey('admin', 'investor-kyc'),
  detail(investorId: string) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get(
        `/admin/investors/${investorId}/kyc`,
        {
          headers: setSafeAccessToken(token),
        },
      );

      return data.data;
    };

    return {
      queryFn,
      enabled: !!investorId,
      ssrQueryFn: createSSRQueryFn(queryFn),
    };
  },
});

export default investorKycQueryOptions;
