/* eslint-disable no-underscore-dangle */
import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import EditIcon from '@/libs/icons/EditIcon';
import type { FilterParams } from '@/libs/packages/tables/types';
import { initTableData } from '@/libs/packages/tables/utils';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/packages/queryBuilder';

import DeletePlans from './delete-plans';

const queryKey = createQKey('admin', 'admin-plans-list');
const listAdminPlansQueryOptions = createQueryOptions({
  key: queryKey,
  detail(queryParams: FilterParams, ...args: any[]) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get(`/admin/plans`, {
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
            type: 'iconButton',
            icon: <EditIcon />,
            onClick: row => {
              window.location.href = `/admin/plans/${row._id}`;
              // Router.push(`/admin/plans/${row._id}`);
            },
            label: 'edit',
            classNames: {
              root: 'w-[2.152rem] h-[2.152rem] rounded-full shadow-sm',
            },
          },
          {
            type: 'component',
            component: props => (
              <DeletePlans id={props.id} queryKey={queryKey} />
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

export default listAdminPlansQueryOptions;
