import { modals } from '@mantine/modals';

import { axiosInternal } from '@/libs/configs/axios';
import type { CancelInvestmentRequestSchemaType } from '@/libs/validations/fund-manager/cancel-investment-request-validation';

import { useMutation } from '../use-mutation';
import useUser from '../useUser';

type CancelInvestment = {
  fundId: string;
  investorId: string;
  values: CancelInvestmentRequestSchemaType;
};

const useCancelInvestment = () => {
  const { user } = useUser();
  const { mutate: cancelInvestment } = useMutation({
    namespace: 'fund',
    mutationFn: async ({ fundId, investorId, values }: CancelInvestment) => {
      const userType = user?.type;
      const endpoint =
        userType === 'admin'
          ? `/admin/funds/${fundId}/investors-list/${investorId}/cancel-investment`
          : `/fund-manager/funds/${fundId}/investors-list/${investorId}/cancel-investment`;
      const { data } = await axiosInternal.put(endpoint, values);

      return data;
    },
    onSuccess: () => ({
      id: 'cancelInvestment',
      body: 'investmentCancelSuccess',
      onClose: () => {
        modals.closeAll();
      },
    }),
  });
  return { cancelInvestment };
};

export default useCancelInvestment;
