/* eslint-disable no-underscore-dangle */
import { notifications } from '@mantine/notifications';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import Button from '@/libs/components/Base/Buttons/Button';
import { axiosInternal } from '@/libs/configs/axios';
import { useMutation } from '@/libs/hooks/use-mutation';
import useUser from '@/libs/hooks/useUser';
import { openConfirmationModal } from '@/libs/packages/modals';

import React from 'react';
import { getUserPlanDetailsQueryOptions } from './user-current-plan';

interface DeleteOwaisUserProps {
  id: string;
  queryKey: string;
}
function SubscribePlan({ id, queryKey }: DeleteOwaisUserProps) {
  const { t } = useTranslation('admin-common');
  const { user } = useUser();
  const router = useRouter();
  const { data: planDetails } = useQuery(
    getUserPlanDetailsQueryOptions.details(user?._id),
  );


  console.log("My Current Plan: ", planDetails?.subscription?.plan?.validity, planDetails?.subscription?.createdAt)
  const { mutate: subscribePlan } = useMutation({
    mutationFn: async () => {
      await axiosInternal.put(`/user/plans/${id}/subscribe`, {
        userId: user?._id,
        created_at: new Date().getTime(),
      });
    },
    revalidateOnSettled: true,
    queryOptions: [queryKey],
    onSuccess: () => {
      notifications.show({
        title: t('confirmationTitle'),
        message: t('confirmationMessage'),
      });
      router.push('/user/deposit');
    },
    onError: err => {
      const errorMessage = err?.response?.data?.message || 'An error occurred';
      notifications.show({
        title: 'Error',
        message: errorMessage,
      });
    },
  });

  const { mutate: freeSubscribe } = useMutation({
    mutationFn: async () => {
      await axiosInternal.put(`/user/plans/free-subscribe`, {
        userId: user?._id,
      });
    },
    revalidateOnSettled: true,
    queryOptions: [queryKey],
    onSuccess: () => {
      notifications.show({
        title: t('confirmationTitle'),
        message: t('confirmationMessage'),
      });
    },
    onError: err => {
      const errorMessage = err?.response?.data?.message || 'An error occurred';
      notifications.show({
        title: 'Error',
        message: errorMessage,
      });
    },
  });
  React.useEffect(() => {
    const checkPlanValidity = async () => {
      if (planDetails?.subscription?.createdAt && planDetails?.subscription?.plan?.validity) {
        const createdTimestamp = new Date(planDetails.subscription.createdAt).getTime();
        const validityDays = parseInt(planDetails.subscription.plan.validity, 10);

        const expirationDate = new Date(createdTimestamp);
        expirationDate.setDate(expirationDate.getDate() + validityDays);

        const currentDate = new Date();

        if (currentDate > expirationDate) {
                    unSubscribePlan();

        }
      }
    };

    checkPlanValidity();
  }, [planDetails]);

  const { mutate: unSubscribePlan } = useMutation({
    mutationFn: async () => {
      await axiosInternal.put(
        `/user/plans/${planDetails?.subscription?.plan?._id}/unsubscribe`,
      );
    },
    revalidateOnSettled: true,
    queryOptions: [queryKey],
    onSuccess: () => {
      subscribePlan();
      notifications.show({
        title: t('confirmationTitle'),
        message: t('confirmationMessage'),
      });
      router.push('/user/deposit');
    },
    onError: err => {
      const errorMessage = err?.response?.data?.message || 'An error occurred';
      notifications.show({
        title: 'Error',
        message: errorMessage,
      });
    },
  });

  const unSubscribePrompt = () => {
    openConfirmationModal({
      id: 'delete-owais-user',
      namespace: 'admin-common',
      classNames: {
        body: 'justify-start md:px-[1.5rem] md:mb-[1.88rem] md:pb-0',
      },
      body: 'areyousure',
      size: 'lg',
      padding: 'lg',
      title: 'subscribePlan',
      children: null,
      onConfirm() {
        unSubscribePlan();
      },
    });
  };

  return (
    <Button
      onClick={() => {
        if (planDetails?.subscription?.plan?.planType === 'free') {
          freeSubscribe();
        } else if (!planDetails?.subscription?.plan?._id) {
          unSubscribePrompt();
        } else {
          unSubscribePlan();
        }
      }}
      disabled={planDetails?.subscription?.plan?._id === id}
      namespace="common"
      text={
        // eslint-disable-next-line no-nested-ternary
        planDetails?.subscription?.plan?._id === id
          ? 'currentPackage'
          : planDetails === undefined
          ? 'subscribe'
          : 'upgrade'
      }
    />
  );
}

export default SubscribePlan;
