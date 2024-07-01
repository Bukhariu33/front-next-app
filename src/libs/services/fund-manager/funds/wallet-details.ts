import { axiosInternal } from '@/libs/configs/axios';
import type { FundWalletDetails } from '@/libs/types/fund-managers/funds/fund-wallet-details';
import { createQKey, createQueryOptions } from '@/packages/queryBuilder';

export const getWalletDetails = createQueryOptions({
  key: createQKey('fundManager', `walletDetails`),
  detail: (fundId: string) => ({
    queryFn: async () => {
      const { data } = await axiosInternal.get<FundWalletDetails>(
        `/fund-manager/funds/${fundId}/wallet-details`,
      );
      return data;
    },
    enabled: !!fundId,
  }),
});
