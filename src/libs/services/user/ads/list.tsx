/* eslint-disable no-underscore-dangle */
import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import { initTableData } from '@/libs/packages/tables/utils';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/packages/queryBuilder';

import ViewAds from './view-ads';

const queryKey = createQKey('individualInvestor', 'user-ads-list');

const listUserAdsQueryOptions = createQueryOptions({
  key: queryKey,
  detail(userId: any) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get(
        `/user/ads/${userId}`, // Use the correct userId variable here
        {
          headers: setSafeAccessToken(token),
        },
      );
      const tableData = initTableData<any, 'admin-common'>(
        data,
        ['amount', 'link'],
        data.meta,
        [
          {
            type: 'component',
            component: rowData => <ViewAds hyperLink={rowData} />,
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

export default listUserAdsQueryOptions;
