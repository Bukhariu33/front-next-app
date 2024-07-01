import { axiosInternal } from '@/libs/configs/axios';
import {
  openConfirmationModal,
  openSuccessModal,
} from '@/libs/packages/modals';
import { getAdminFundDetailsQueryOptions } from '@/libs/services/admin/funds/fundDetails';
import listFundsQueryOptions from '@/libs/services/admin/funds/list-funds';
import type { BaseFund } from '@/libs/types/interface/fund/base';

import { useMutation } from '../../use-mutation';

const useUpdateAdminFundStatus = (id: string) => {
  const { mutate: updateFundStatus } = useMutation({
    mutationFn: async (status: BaseFund['status']) => {
      const endpoint = `/admin/funds/${id}/${
        status === 'fundApproved' ? 'approve' : 'reject'
      }`;
      const { data } = await axiosInternal.put(endpoint, {
        status,
      });

      return data;
    },
    onSuccess() {
      openSuccessModal({
        id: 'update-admin-fund-status',
      });
    },
    revalidateOnSettled: true,
    queryOptions: [listFundsQueryOptions, getAdminFundDetailsQueryOptions],
  });

  const confirmAction = (status: BaseFund['status']) =>
    openConfirmationModal({
      id: 'update-admin-fund-status',
      classNames: {
        body: 'justify-start md:px-[1.5rem] md:mb-[1.88rem] md:pb-0',
      },
      size: 'lg',
      padding: 'lg',
      onConfirm() {
        updateFundStatus(status);
      },
    });

  return {
    updateFundStatus: confirmAction,
  };
};

export default useUpdateAdminFundStatus;
