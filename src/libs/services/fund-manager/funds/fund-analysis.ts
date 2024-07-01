import { axiosInternal } from '@/libs/configs/axios';
import type { FundManagerFundAnalysis } from '@/libs/types/fund-managers/funds/fund-analysis';
import { createQKey, createQueryOptions } from '@/packages/queryBuilder';

export const getFundManagerFundAnalysis = createQueryOptions({
  key: createQKey('fundManager', `fundAnalysis`),
  detail: fundId => ({
    queryFn: async () => {
      const { data } = await axiosInternal.get<FundManagerFundAnalysis>(
        `/fund-manager/funds/${fundId}/fund-analysis`,
      );
      return data;
    },
    enabled: !!fundId,
  }),
});
