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

import DeleteUser from './delete';

const queryKey = createQKey('admin', 'users-list');
const listUsersQueryOptions = createQueryOptions({
  key: queryKey,
  detail(queryParams: FilterParams, ...args: any[]) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get<any>(`user`, {
        params: {
          ...queryParams,
          ...args,
        },
        headers: setSafeAccessToken(token),
      });

      const tableData = initTableData<any, 'admin-common'>(
        data.users,
        ['name', 'email'],
        data.meta,
        [
          {
            type: 'component',
            component: props => (
              <DeleteUser id={props.id} queryKey={queryKey} />
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

export default listUsersQueryOptions;
