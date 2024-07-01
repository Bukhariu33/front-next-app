import { axiosInternal } from '@/libs/configs/axios';
import type { FilterParams } from '@/libs/packages/tables/types';
import { initTableData } from '@/libs/packages/tables/utils';
import type { APIResponseFundWalletList } from '@/libs/types/fund-managers/funds/fund-wallet-transactions';
import { createQKey, createQueryOptions } from '@/packages/queryBuilder';

const fundWalletTransactionsQueryOptions = createQueryOptions({
  key: createQKey('fundManager', 'fund-wallet-transactions'),
  detail(
    queryParams?: FilterParams,
    _activeTab?: string,
    fundId?: string,
    ..._args: any[]
  ) {
    return {
      queryFn: async () => {
        const { data } = await axiosInternal.get<APIResponseFundWalletList>(
          `/fund-manager/funds/${fundId}/wallet-transactions`,
          {
            params: {
              ...queryParams,
            },
          },
        );
        const tableData = initTableData<(typeof data.data)[0], 'fund'>(
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
          undefined,
          undefined,
        );
        return tableData;
      },
    };
  },
});

export default fundWalletTransactionsQueryOptions;
