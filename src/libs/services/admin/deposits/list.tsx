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

import ApproveDeposit from './approve-deposit';
import PlanDetails from './plan-details';
import RejectDeposit from './reject-deposit';

const queryKey = createQKey('admin', 'admin-deposits-oublic-list');
const listAdminDepositsQueryOptions = createQueryOptions({
  key: queryKey,
  detail(queryParams: FilterParams, ...args: any[]) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get(`/admin/deposits`, {
        params: {
          ...queryParams,
          ...args,
        },
        headers: setSafeAccessToken(token),
      });

      const tableData = initTableData<any, 'admin-common'>(
        data.deposits,
        [ 'transactionId', 'amount', 'gateway', 'fullName', 'phone', 'status'],
        data.meta,
        [
          {
            type: 'component',
            component: rowData => <PlanDetails rowData={rowData} />,
          },
          {
            type: 'component',
            component: rowData => (
              <ApproveDeposit
                status={rowData}
                id={rowData.id}
                queryKey={queryKey}
              />
            ),
          },
          {
            type: 'component',
            component: rowData => (
              <RejectDeposit
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

export default listAdminDepositsQueryOptions;
