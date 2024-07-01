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

import SubscribePlan from './subscribe-plan';

const queryKey = createQKey('admin', 'public-plans-list');
const listUserPublicPlansQueryOptions = createQueryOptions({
  key: queryKey,
  detail(queryParams: FilterParams, ...args: any[]) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get(`/user/plans`, {
        params: {
          ...queryParams,
          ...args,
        },
        headers: setSafeAccessToken(token),
      });

      const tableData = initTableData<any, 'admin-common'>(
        data.plans,
        ['name', 'planPrice', 'dailyLimit', 'validity', 'referralBonus'],
        data.meta,
        [
          {
            type: 'component',
            component: rowData => (
              <SubscribePlan id={rowData.id} queryKey={queryKey} />
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

export default listUserPublicPlansQueryOptions;
