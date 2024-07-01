import { notifications } from '@mantine/notifications';
import { useTranslation } from 'next-i18next';

import Button from '@/libs/components/Base/Buttons/Button';
import { axiosInternal } from '@/libs/configs/axios';
import { useMutation } from '@/libs/hooks/use-mutation';
import { openConfirmationModal } from '@/libs/packages/modals';

interface RejectDepositProps {
  id: string;
  queryKey: string;
  status: any;
}
function RejectDeposit({ id, queryKey, status }: RejectDepositProps) {
  const { t } = useTranslation('admin-common');
  const { mutate } = useMutation({
    mutationFn: async () => {
      await axiosInternal.put(`/admin/deposits/${id}`, 'rejected');
    },
    revalidateOnSettled: true,
    queryOptions: [queryKey],
    onSuccess: () => {
      notifications.show({
        title: t('confirmationTitle'),
        message: t('confirmationMessage'),
      });
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
      text="rejectDeposit"
      disabled={status.rowData.status === 'approved'}
      onClick={() => confirmAction()}
    />
  );
}

export default RejectDeposit;
