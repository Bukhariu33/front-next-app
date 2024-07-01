import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import type { FilterParams } from '@/libs/packages/tables/types';
import { initTableData } from '@/libs/packages/tables/utils';
import type { APIResponseAdminFundWallet } from '@/libs/types/admin/funds/fund-wallet';
import type { Transaction } from '@/libs/types/base/fundWalletTransactionDetails';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/packages/queryBuilder';

const listFundsTransactionsQueryOptions = createQueryOptions({
  key: createQKey('admin', 'Fund-transactions-list'),
  detail(queryParams: FilterParams, _activeTab?: string, ...args: any[]) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const fundID = args[0];
      const { data } = await axiosInternal.get<APIResponseAdminFundWallet>(
        `/admin/funds/${fundID}/transactions`,
        {
          params: {
            ...queryParams,
            ...args,
          },
          headers: setSafeAccessToken(token),
        },
      );

      const tableData = initTableData<Transaction, any>(
        data.data.transactions,
        ['type', 'createdAt', 'simplifiedType', 'amount', 'status'],
        data.meta,
        undefined,
      );
      return tableData;
    };
    return {
      queryFn,
      ssrQueryFn: createSSRQueryFn(queryFn),
      enabled: !!args[0],
    };
  },
});

export default listFundsTransactionsQueryOptions;
