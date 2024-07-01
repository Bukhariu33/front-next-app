import type { QueryFunctionContext } from '@tanstack/react-query';
import Router from 'next/router';

import { axiosInternal } from '@/libs/configs/axios';
import type { FilterParams } from '@/libs/packages/tables/types';
import { initTableData } from '@/libs/packages/tables/utils';
import type { AdminInvestorSingleItem } from '@/libs/types/investors';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/packages/queryBuilder';

const listInvestorsQueryOptions = createQueryOptions({
  key: createQKey('admin', 'Investors-list'),
  detail(queryParams: FilterParams, activeTab?: string, ...args: any[]) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const getTabFilters = () => {
        const tabQuery: any = { status: undefined, type: undefined };
        const types = ['individual', 'corporate'];
        if (types.includes(activeTab!)) {
          tabQuery.type = activeTab;
        }
        if (activeTab === 'qualified') {
          tabQuery.status = activeTab;
        }
        return tabQuery;
      };
      const { data } = await axiosInternal.get<APIResponse<any>>(
        `/admin/investors`,
        {
          params: {
            ...getTabFilters(),
            ...queryParams,
            ...args,
          },
          headers: setSafeAccessToken(token),
        },
      );
      const tableData = initTableData<
        AdminInvestorSingleItem & { idCr: string },
        'admin-common'
      >(
        data.data,
        ['name', 'idCr', 'email', 'phone', 'createdAt', 'type'],
        data.meta,
        [
          {
            type: 'button',
            onClick: row => {
              const href = `/admin/investors/${row.id}`;
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

export default listInvestorsQueryOptions;
