import { notifications } from '@mantine/notifications';
import { useTranslation } from 'next-i18next';

import Button from '@/libs/components/Base/Buttons/Button';
import { axiosInternal } from '@/libs/configs/axios';
import { useMutation } from '@/libs/hooks/use-mutation';
import { openConfirmationModal } from '@/libs/packages/modals';

interface ApproveDepositProps {
  id: string;
  queryKey: string;
  status: any;
}
function ApproveDeposit({ id, queryKey, status }: ApproveDepositProps) {
  const { t } = useTranslation('admin-common');


  console.log('status', status.rowData.userData.referredBy)

    const { mutate: confirmRefferalComission } = useMutation({
    mutationFn: async () => {
      const body = {
        referred: status?.rowData?.userData?.referredBy,
        planPrice: status?.rowData?.planDetails.planPrice,
      };
      await axiosInternal.put(`/user/reffered-users/update`, body);
    },
   
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      await axiosInternal.put(`/admin/deposits/${id}`, 'approved');
    },
    revalidateOnSettled: true,
    queryOptions: [queryKey],
    onSuccess: () => {
      notifications.show({
        title: t('confirmationTitle'),
        message: t('confirmationMessage'),
      });
      confirmRefferalComission();
    },
  });

  const confirmAction = () => {
    openConfirmationModal({
      id: 'delete-owais-user',
      namespace: 'admin-common',
      classNames: {
        body: 'justify-start md:px-[1.5rem] md:mb-[1.88rem] md:pb-0',
      },
      body: 'confirmationMessage',
      size: 'lg',
      padding: 'lg',
      title: 'confirmationTitle',
      children: null,
      onConfirm() {
        mutate();
      },
    });
  };

  return (
    <Button
      namespace="admin-common"
      text="approveDeposit"
      disabled={status.rowData.status === 'approved'}
      onClick={() => confirmAction()}
    />
  );
}

export default ApproveDeposit;
