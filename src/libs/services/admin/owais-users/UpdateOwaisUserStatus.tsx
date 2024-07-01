import { Stack, Switch } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'next-i18next';

import { axiosInternal } from '@/libs/configs/axios';
import { useMutation } from '@/libs/hooks/use-mutation';
import { openConfirmationModal } from '@/libs/packages/modals';
import type { TableCell } from '@/libs/packages/tables/types';
import type { OwaisUser } from '@/libs/types/owais-users/owais-user';

interface OwaisUserStatusProps {
  id: string;
  row: TableCell[];
  queryKey: string;
}
function UpdateOwaisUserStatus({ id, row, queryKey }: OwaisUserStatusProps) {
  const { t } = useTranslation('admin-common');
  const { mutate: updateAdminStatus } = useMutation({
    mutationFn: async (status: OwaisUser['status']) => {
      await axiosInternal.patch(`/admin/owais-users/${id}/edit`, {
        status,
      });
    },
    revalidateOnSettled: true,
    queryOptions: [queryKey],
    onSuccess: () => {
      notifications.show({
        title: t('owaisUserStatus'),
        message: t('owaisUserStatusMessage'),
      });
    },
  });

  const confirmAction = (status: OwaisUser['status']) => {
    openConfirmationModal({
      id: 'update-owais-user-status',
      namespace: 'admin-common',
      classNames: {
        body: 'justify-start md:px-[1.5rem] md:mb-[1.88rem] md:pb-0',
      },
      body: 'updateOwaisUserStatusConfirmMessage',
      size: 'lg',
      padding: 'lg',
      title: 'owaisUserStatus',
      children: null,
      onConfirm() {
        updateAdminStatus(status);
      },
    });
  };
  return (
    <Stack className="cursor-pointer rounded-full bg-white px-2 py-2">
      <Switch
        checked={!!(row && row[6] === 'active')}
        onChange={event => {
          confirmAction({
            name: event.currentTarget.checked ? 'active' : 'inactive',
            value: event.currentTarget.checked ? 'active' : 'inactive',
            description: '',
          });
        }}
      />
    </Stack>
  );
}

export default UpdateOwaisUserStatus;
