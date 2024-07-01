import { axiosInternal } from '@/libs/configs/axios';
import type { AdminFundAnalysis } from '@/libs/types/admin/funds/fund-analysis';
import { createQKey, createQueryOptions } from '@/packages/queryBuilder';

export const getAdminFundAnalysis = createQueryOptions({
  key: createQKey('admin', `fundAnalysis`),
  detail: fundId => ({
    queryFn: async () => {
      const { data } = await axiosInternal.get<AdminFundAnalysis>(
        `/admin/funds/${fundId}/fund-analysis`,
      );
      return data;
    },
    enabled: !!fundId,
  }),
});
