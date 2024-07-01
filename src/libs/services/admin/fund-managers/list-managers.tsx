import type { QueryFunctionContext } from '@tanstack/react-query';
import Router from 'next/router';

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

import DeleteAds from './delete-ads';

const queryKey = createQKey('admin', 'OwaisUser-list');
const listAdminAdsQueryOptions = createQueryOptions({
  key: queryKey,
  detail(queryParams: FilterParams, ...args: any[]) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get(`/admin/Ads/ads`, {
        params: {
          ...queryParams,
          ...args,
        },
        headers: setSafeAccessToken(token),
      });

      const tableData = initTableData<any, 'admin-common'>(
        data.data,
        ['link', 'amount', 'duration'],
        data.meta,
        [
          {
            type: 'iconButton',
            icon: <EditIcon />,
            onClick: row => {
              Router.push(`/admin/ads/${row.id}/edit`);
            },
            label: 'edit',
            classNames: {
              root: 'w-[2.152rem] h-[2.152rem] rounded-full shadow-sm',
            },
          },
          {
            type: 'component',
            component: props => <DeleteAds id={props.id} queryKey={queryKey} />,
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

export default listAdminAdsQueryOptions;
