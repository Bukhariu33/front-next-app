import { axiosInternal } from '@/libs/configs/axios';
import { openSuccessModal } from '@/libs/packages/modals';

import { useMutation } from '../../use-mutation';

const useDownloadKyc = () => {
  const { mutate: downloadKyc } = useMutation({
    mutationFn: async (id: string) => {
      const data = await axiosInternal.post(`/admin/funds/${id}/download-kyc`);
      return data;
    },
    onSuccess: () => {
      openSuccessModal({
        namespace: 'admin-common',
        id: 'downloadKyc',
        body: 'processingRequestAndSendingListViaEmail',
      });
    },
  });
  return { downloadKyc };
};

export default useDownloadKyc;
