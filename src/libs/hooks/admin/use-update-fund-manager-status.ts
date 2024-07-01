import { axiosInternal } from '@/libs/configs/axios';
import {
  openConfirmationModal,
  openSuccessModal,
} from '@/libs/packages/modals';
import { fundManagerQueryOptions } from '@/libs/services/admin/fund-managers/fund-manager-details';
import listFundManagersQueryOptions from '@/libs/services/admin/fund-managers/list-managers';
import type { BaseFundManager } from '@/libs/types/fund-managers';

import { useMutation } from '../use-mutation';

const useUpdateFundManagerStatus = (id: string) => {
  const { mutate: updateFundManagerStatus } = useMutation({
    mutationFn: async (status: BaseFundManager['status']) => {
      const fundManagerStatus = status === 'approved' ? 'approve' : 'reject';
      const { data } = await axiosInternal.patch(
        `/admin/fund-managers/${id}/${fundManagerStatus}`,
        {
          status,
        },
      );
      return data;
    },
    onSuccess() {
      openSuccessModal({
        id: 'updateFundManagerStatus',
      });
    },
    revalidateOnSettled: true,
    queryOptions: [listFundManagersQueryOptions, fundManagerQueryOptions],
  });

  const confirmAction = (status: BaseFundManager['status']) => {
    openConfirmationModal({
      id: 'update-fund-manager-status',
      onConfirm() {
        updateFundManagerStatus(status);
      },
    });
  };

  return {
    updateFundManagerStatus: confirmAction,
  };
};

export default useUpdateFundManagerStatus;
