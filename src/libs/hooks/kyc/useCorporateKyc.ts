import { useQuery } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
} from '@/libs/packages/queryBuilder';
import type { APIResponseCorporateKyc } from '@/libs/types/kyc/corporate-kyc';

import useUser from '../useUser';

export const corporateKycQueryOptions = createQueryOptions({
  key: createQKey('corporateInvestor', 'corporate-kyc-investor'),
  detail: (id?: string) => {
    const queryFn = async () => {
      const { data } = await axiosInternal.get<APIResponseCorporateKyc>(
        '/investor/kyc/corporate',
        { params: { id } },
      );
      return data.data;
    };
    return {
      queryFn,
      ssrQueryFn: createSSRQueryFn(queryFn),
      enabled: !!id,
    };
  },
});
const useCorporateKyc = () => {
  const { user } = useUser();
  return useQuery({
    ...corporateKycQueryOptions.details(),
    enabled: user?.type === 'corporateInvestor',
  });
};

export default useCorporateKyc;
