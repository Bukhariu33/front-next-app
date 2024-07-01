import { axiosInternal } from '@/libs/configs/axios';
import type { TransactionDetails } from '@/libs/types/base/fundWalletTransactionDetails';
import { createQKey, createQueryOptions } from '@/packages/queryBuilder';

export const fundManagerTransactionDetailsQueryOptions = createQueryOptions({
  key: createQKey('fundManager', `transactionDetails`),
  detail: (fundId: string, transactionId: string) => ({
    queryFn: async () => {
      const { data } = await axiosInternal.get<TransactionDetails>(
        `/fund-manager/funds/${fundId}/transactions/${transactionId}`,
      );
      return data;
    },
    enabled: !!fundId && !!transactionId,
  }),
});
