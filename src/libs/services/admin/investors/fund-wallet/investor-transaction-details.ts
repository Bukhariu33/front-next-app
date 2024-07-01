import { axiosInternal } from '@/libs/configs/axios';
import type { AdminFundWalletTransactionDetails } from '@/libs/types/admin/funds/fund-wallet-transaction-details';
import { createQKey, createQueryOptions } from '@/packages/queryBuilder';

export const adminInvestorGetWalletTransactionDetails = createQueryOptions({
  key: createQKey('admin', `investor-transactionDetails`),
  detail: (investorId: string, transactionId: string) => ({
    queryFn: async () => {
      const { data } =
        await axiosInternal.get<AdminFundWalletTransactionDetails>(
          `/admin/investors/${investorId}/transactions/${transactionId}`,
        );
      return data;
    },
    enabled: !!investorId && !!transactionId,
  }),
});
