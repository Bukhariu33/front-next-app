import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import type { OwaisUser } from '@/libs/types/owais-users/owais-user';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/packages/queryBuilder';

export const getOwaisUserDetailsQueryOptions = createQueryOptions({
  key: createQKey('admin', 'OwaisUser-details'),
  detail(id: string) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get<APIResponse<OwaisUser>>(
        `admin/owais-users/${id}`,
        {
          headers: setSafeAccessToken(token),
        },
      );
      return data.data;
    };

    return {
      queryFn,
      ssrQueryFn: createSSRQueryFn(queryFn),
    };
  },
});
