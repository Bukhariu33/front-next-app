import type { QueryFunctionContext } from '@tanstack/react-query';
import Router from 'next/router';

import { PATH_SEGMENTS } from '@/libs/configs/appConfig';
import { axiosInternal } from '@/libs/configs/axios';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/libs/packages/queryBuilder';
import type { FilterParams } from '@/libs/packages/tables/types';
import { initTableData } from '@/libs/packages/tables/utils';
import type { UserType } from '@/libs/types/auth';
import type {
  APIResponseSupportList,
  SupportTicket,
} from '@/libs/types/interface/support/support-ticket';

const listSupportQueryOptions = createQueryOptions({
  key: createQKey('Global', 'support-list'),
  detail(queryParams: FilterParams, _activeTab, ...args: any[]) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get<APIResponseSupportList>(
        `/support`,
        {
          params: {
            ...queryParams,
            ...args,
          },
          headers: setSafeAccessToken(token),
        },
      );
      const userType = args[0];
      const tableData = initTableData<SupportTicket, 'support'>(
        data.data,
        ['title', 'category', 'createdAt', 'messages', 'status'],
        data.meta,
        [
          {
            type: 'button',
            onClick: row => {
              Router.push(
                `/${PATH_SEGMENTS[userType as UserType]}/support/${row.id}`,
              );
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

export default listSupportQueryOptions;
