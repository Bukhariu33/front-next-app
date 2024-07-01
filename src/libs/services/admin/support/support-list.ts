import type { QueryFunctionContext } from '@tanstack/react-query';
import Router from 'next/router';

import { axiosInternal } from '@/libs/configs/axios';
import type { FilterParams } from '@/libs/packages/tables/types';
import { initTableData } from '@/libs/packages/tables/utils';
import type {
  APIResponseSupportList,
  SupportTicket,
} from '@/libs/types/interface/support/support-ticket';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/packages/queryBuilder';

const AdminSupportListQueryOptions = createQueryOptions({
  key: createQKey('admin', 'admin-support-list'),
  detail(queryParams: FilterParams, _activeTab?: string, ...args: any[]) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { investorID = '', fundManagerID = '' } = args[0];
      const { data } = await axiosInternal.get<APIResponseSupportList>(
        `/admin/support`,
        {
          withCredentials: true,
          params: {
            ...queryParams,
            investorID,
            fundManagerID,
            ...args,
          },
          headers: setSafeAccessToken(token),
        },
      );
      const tableData = initTableData<SupportTicket, 'support'>(
        data.data,
        ['title', 'category', 'createdAt', 'messages', 'status'],
        data.meta,
        [
          {
            type: 'button',
            onClick: row => {
              const href = `${Router.asPath}/${row.id}`;
              Router.push(href);
            },
            label: 'view',
            variant: 'view',
            icon: undefined,
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

export default AdminSupportListQueryOptions;
