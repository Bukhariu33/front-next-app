import { axiosInternal } from '@/libs/configs/axios';
import { createQKey, createQueryOptions } from '@/packages/queryBuilder';

export const getInvestorWalletDetails = createQueryOptions({
  key: createQKey('admin', `investor-walletDetails`),
  detail: (investorId: string) => ({
    queryFn: async () => {
      const { data } = await axiosInternal.get(
        `/admin/investors/${investorId}/wallet-details`,
      );
      return data;
    },
    enabled: !!investorId,
  }),
});
