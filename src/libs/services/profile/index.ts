import type { QueryFunctionContext } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import type { UserType } from '@/libs/types/auth';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/packages/queryBuilder';
import type { APIResponseProfile } from '@/pages/api/investor/profile';

const getProfileQueryOptions = (userType: UserType, userId: string) =>
  createQueryOptions({
    key: createQKey('individualInvestor', 'fund-details'),
    detail() {
      const queryFn = async (
        _context: QueryFunctionContext,
        token?: string,
      ) => {
        let endpoint: string;

        switch (userType) {
          case 'fundManager':
            endpoint = '/fund-manager/profile';
            break;
          case 'individualInvestor':
          case 'corporateInvestor':
            endpoint = '/investor/profile';
            break;
          default:
            throw new Error(`Wrong user type: ${userType}`);
        }

        const { data } = await axiosInternal.get<APIResponseProfile>(endpoint, {
          headers: setSafeAccessToken(token),
          params:
            userType === 'fundManager'
              ? { userId }
              : { userId, type: userType },
        });
        return data.data;
      };

      return {
        queryFn,
        ssrQueryFn: createSSRQueryFn(queryFn),
      };
    },
  });

export { getProfileQueryOptions };
