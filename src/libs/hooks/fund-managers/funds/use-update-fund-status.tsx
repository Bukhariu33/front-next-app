import PersonalInfo from '@/libs/components/PersonalInfo';
import { axiosInternal } from '@/libs/configs/axios';
import {
  openConfirmationModal,
  openSuccessModal,
} from '@/libs/packages/modals';
import { getFundManagerFundListQueryOptions } from '@/libs/services/fund-manager/funds';
import { getFundManagerFundDetailsQueryOptions } from '@/libs/services/fund-manager/funds/fundDetails';
import type { BaseFund } from '@/libs/types/interface/fund/base';

import { useMutation } from '../../use-mutation';
import useUser from '../../useUser';

const useUpdateFundStatus = (id: string) => {
  const { user } = useUser();
  const { mutate: updateFundStatus } = useMutation({
    mutationFn: async (status: BaseFund['status']) => {
      const endpoint = `/fund-manager/funds/${id}/${
        status === 'contractApproved' ? 'approve' : 'reject'
      }`;
      const { data } = await axiosInternal.patch(endpoint, {
        status,
      });

      return data;
    },
    onSuccess() {
      openSuccessModal({
        id: 'update-fund-status',
      });
    },
    revalidateOnSettled: true,
    queryOptions: [
      getFundManagerFundDetailsQueryOptions,
      getFundManagerFundListQueryOptions,
    ],
  });

  const confirmAction = (status: BaseFund['status']) =>
    openConfirmationModal({
      id: 'update-fund-status',
      classNames: {
        body: 'justify-start md:px-[1.5rem] md:mb-[1.88rem] md:pb-0',
      },
      size: 'lg',
      padding: 'lg',
      children: (
        <PersonalInfo
          data={[
            { title: 'Fullname', value: user?.fullName },
            { title: 'JobTitle', value: user?.jobTitle },
            { title: 'MobileNumberRegisteredWithAbsher', value: user?.mobile },
            { title: 'Email', value: user?.email },
          ]}
          namespace="profile"
        />
      ),
      onConfirm() {
        updateFundStatus(status);
      },
    });

  return {
    updateFundStatus: confirmAction,
  };
};

export default useUpdateFundStatus;
