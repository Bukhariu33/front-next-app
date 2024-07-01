/* eslint-disable no-underscore-dangle */
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

const queryKey = createQKey('admin', 'admin-withdraw-list');
const listUserWithdrawQueryOptions = createQueryOptions({
  key: queryKey,
  detail(queryParams: FilterParams, ...args: any[]) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get(`/user/withdraw`, {
        params: {
          ...queryParams,
          ...args,
        },
        headers: setSafeAccessToken(token),
      });
      const tableData = initTableData<any, 'admin-common'>(
        data.data,
        ['accountNumber', 'amount', 'gateway'],
        data.meta,
        // [
        //   {
        //     type: 'iconButton',
        //     icon: <EditIcon />,
        //     onClick: row => {
        //       Router.push(`/user/withdraw/${row._id}`);
        //     },
        //     label: 'edit',
        //     classNames: {
        //       root: 'w-[2.152rem] h-[2.152rem] rounded-full shadow-sm',
        //     },
        //   },
        //   {
        //     type: 'component',
        //     component: props => (
        //       <DeleteWithdraw id={props.id} queryKey={queryKey} />
        //     ),
        //   },
        // ],
      );
      return tableData;
    };
    return {
      queryFn,
      ssrQueryFn: createSSRQueryFn(queryFn),
    };
  },
});

export default listUserWithdrawQueryOptions;
