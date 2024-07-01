import { Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'next-i18next';

import { axiosInternal } from '@/libs/configs/axios';
import { useMutation } from '@/libs/hooks/use-mutation';
import DeleteIcon from '@/libs/icons/DeleteIcon';
import { openConfirmationModal } from '@/libs/packages/modals';

interface DeleteOwaisUserProps {
  id: string;
  queryKey: string;
}
function DeleteAds({ id, queryKey }: DeleteOwaisUserProps) {
  const { t } = useTranslation('admin-common');
  const { mutate } = useMutation({
    mutationFn: async () => {
      await axiosInternal.delete(`/admin/Ads/${id}/delete`);
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
    <Stack className="cursor-pointer rounded-full bg-white px-2 py-2">
      <DeleteIcon
        className="h-[1.2rem] w-[1.2rem]  text-brand-danger shadow-sm"
        onClick={() => confirmAction()}
      />
    </Stack>
  );
}

export default DeleteAds;
