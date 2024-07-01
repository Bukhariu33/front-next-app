import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import type { FilterParams } from '@/libs/packages/tables/types';
import { initTableData } from '@/libs/packages/tables/utils';
import type { APIResponseFundWalletList } from '@/libs/types/fund-managers/funds/fund-wallet-transactions';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/packages/queryBuilder';

const adminInvestorTransactionsQueryOptions = createQueryOptions({
  key: createQKey('admin', 'investor-transactions'),
  detail(
    queryParams?: FilterParams,
    _activeTab?: string,
    investorId?: string,
    ...args: any[]
  ) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get<APIResponseFundWalletList>(
        `/admin/investors/${investorId}/wallet-transactions`,
        {
          withCredentials: true,
          params: {
            ...queryParams,
            ...args,
          },
          headers: setSafeAccessToken(token),
        },
      );
      const tableData = initTableData(
        data.data,
        [
          'type',
          'createdAt',
          'simplifiedType',
          'amount',
          'status',
          'description',
        ],
        data.meta,
      );
      return tableData;
    };

    return {
      queryFn,
      ssrQueryFn: createSSRQueryFn(queryFn),
    };
  },
});

export default adminInvestorTransactionsQueryOptions;
