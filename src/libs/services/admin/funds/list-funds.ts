import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import type { FilterParams } from '@/libs/packages/tables/types';
import { initTableData } from '@/libs/packages/tables/utils';
import type { APIResponseAdminFundsList } from '@/libs/types/interface/fund';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/packages/queryBuilder';

const listFundsQueryOptions = createQueryOptions({
  key: createQKey('admin', 'Fund-list'),
  detail(queryParams: FilterParams, ...args: any[]) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get<APIResponseAdminFundsList>(
        `/admin/funds`,
        {
          params: {
            ...queryParams,
            ...args,
          },
          headers: setSafeAccessToken(token),
        },
      );
      const tableData = initTableData(
        data.data,
        ['fundManagerName', 'name', 'coverage', 'createdAt', 'status'],
        data.meta,
        undefined,
      );
      return tableData;
    };
    return {
      queryFn,
      ssrQueryFn: createSSRQueryFn(queryFn),
    };
  },
});

export default listFundsQueryOptions;
