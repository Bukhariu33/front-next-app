import { axiosInternal } from '@/libs/configs/axios';
import type { AdminFundWalletTransactionDetails } from '@/libs/types/admin/funds/fund-wallet-transaction-details';
import { createQKey, createQueryOptions } from '@/packages/queryBuilder';

export const adminGetWalletTransactionDetails = createQueryOptions({
  key: createQKey('fundManager', `transactionDetails`),
  detail: (fundId: string, transactionId: string) => ({
    queryFn: async () => {
      const { data } = await axiosInternal.get<
        APIResponse<AdminFundWalletTransactionDetails>
      >(`/admin/funds/${fundId}/transactions/${transactionId}`);
      return data.data;
    },
    enabled: !!fundId && !!transactionId,
  }),
});
