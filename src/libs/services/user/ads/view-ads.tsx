/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line simple-import-sort/imports
import { Notifications, notifications } from '@mantine/notifications';
import { useTranslation } from 'next-i18next';

import Button from '@/libs/components/Base/Buttons/Button';
import { axiosInternal } from '@/libs/configs/axios';
import { useMutation } from '@/libs/hooks/use-mutation';

interface ViewAdsProps {
  hyperLink: any;
}
function ViewAds({ hyperLink }: ViewAdsProps) {
  const { t } = useTranslation('admin-common');
  console.log(hyperLink.rowData);
  const { mutate } = useMutation({
    mutationFn: async () => {
      const body = {
        amount: parseInt(hyperLink.rowData.amount, 10),
      };
      await axiosInternal.post(`/user/ads/click-ad`, body);
    },
    onSuccess: () => {
      window.location.href = `${hyperLink.rowData.link}`;

      notifications.show({
        title: t('confirmationTitle'),
        message: t('confirmationMessage'),
      });
    },
  });

  const { mutate: validateAdClick } = useMutation({
    mutationFn: async () => {
      const body = {
        ad: hyperLink.rowData._id,
        clickedAt: new Date().getTime(),
      };
      await axiosInternal.post(`/user/ads/validate-click`, body);
    },
    onSuccess: () => {
      mutate();
      notifications.show({
        title: t('confirmationTitle'),
        message: t('confirmationMessage'),
      });
    },
    onError: () => {
      Notifications.show({
        title: 'Error',
        message: 'Ad Already Clicked Today',
      });
    },
  });

  return (
    <Button
      namespace="admin-common"
      text="visitLink"
      onClick={() => {
        validateAdClick();
      }}
    />
  );
}

export default ViewAds;
