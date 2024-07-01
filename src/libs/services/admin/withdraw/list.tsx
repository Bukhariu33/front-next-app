import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import type { FilterParams } from '@/libs/packages/tables/types';
import { initTableData } from '@/libs/packages/tables/utils';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/packages/queryBuilder';

import ApproveWithdraw from './approve-withdraw';
import RejectWithdraw from './reject-withdraw';

const queryKey = createQKey('admin', 'admin-withdraw-public-list');
const listAdminWithdrawQueryOptions = createQueryOptions({
  key: queryKey,
  detail(queryParams: FilterParams, ...args: any[]) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get(`/admin/withdraw`, {
        params: {
          ...queryParams,
          ...args,
        },
        headers: setSafeAccessToken(token),
      });

      const tableData = initTableData<any, 'admin-common'>(
        data.withdraws,
        ['accountNumber', 'amount', 'gateway', 'fullName', 'phone', 'status'],
        data.meta,
        [
          {
            type: 'component',
            component: rowData => (
              <ApproveWithdraw
                status={rowData}
                id={rowData.id}
                queryKey={queryKey}
              />
            ),
          },
          {
            type: 'component',
            component: rowData => (
              <RejectWithdraw
                status={rowData}
                id={rowData.id}
                queryKey={queryKey}
              />
            ),
          },
        ],
      );
      return tableData;
    };
    return {
      queryFn,
      ssrQueryFn: createSSRQueryFn(queryFn),
    };
  },
});

export default listAdminWithdrawQueryOptions;
