import type { UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { axiosInternal } from '@/libs/configs/axios';
import type { CorporateKyc } from '@/libs/types/kyc/corporate-kyc';
import type { IndividualKyc } from '@/libs/types/kyc/individual-kyc';

import { useMutation } from '../use-mutation';
import useUser from '../useUser';
import useCorporateKyc, { corporateKycQueryOptions } from './useCorporateKyc';
import useIndividualKyc, {
  individualKycQueryOptions,
} from './useIndividualKyc';

type KycMutationType = (Partial<CorporateKyc> | Partial<IndividualKyc>) & {
  submit?: boolean;
};
interface Props {
  options?: UseMutationOptions<any, AxiosError, KycMutationType, unknown>;
}
function useKycMutation(options?: Props['options']) {
  const { user } = useUser();
  const { data: kycCorporate } = useCorporateKyc();
  const { data: kycIndividual } = useIndividualKyc();
  const userKyc =
    user?.type === 'corporateInvestor' ? kycCorporate : kycIndividual;

  const revalidateOption =
    user?.type === 'corporateInvestor'
      ? corporateKycQueryOptions
      : individualKycQueryOptions;

  return useMutation<CorporateKyc | IndividualKyc, KycMutationType>({
    mutationFn: async (values: KycMutationType) => {
      const individualUrl = `/investor/kyc/individual`;
      const CorporateUrl = `/investor/kyc/corporate`;
      await axiosInternal.post(
        user?.type === 'corporateInvestor' ? CorporateUrl : individualUrl,
        {
          ...userKyc,
          ...values,
        },
      );
    },
    ...(options as any),
    revalidateOnSettled: true,
    queryOptions: revalidateOption,
  });
}

export default useKycMutation;
