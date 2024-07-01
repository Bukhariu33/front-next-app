import { useQuery } from '@tanstack/react-query';

import { axiosInternal } from '@/libs/configs/axios';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
} from '@/libs/packages/queryBuilder';
import type { APIResponseIndividualKyc } from '@/libs/types/kyc/individual-kyc';

import useUser from '../useUser';

export const individualKycQueryOptions = createQueryOptions({
  key: createQKey('individualInvestor', 'individual-kyc-investor'),
  detail: (id?: string) => {
    const queryFn = async () => {
      const { data } = await axiosInternal.get<APIResponseIndividualKyc>(
        '/investor/kyc/individual',
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
const useIndividualKyc = () => {
  const { user } = useUser();
  return useQuery({
    ...individualKycQueryOptions.details(),
    enabled: user?.type === 'individualInvestor',
  });
};

export default useIndividualKyc;
