import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import type { UseMutateFunction } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useTranslation } from 'next-i18next';

import OtpCard from '../components/auth/otp-card';
import { openConfirmationModal, openErrorModal } from '../packages/modals';
import type { ConfirmModalProps } from '../packages/modals/types';
import type { OTPPayload } from '../services/otp';
import { useSendOTPEvent } from '../services/otp';
import type { Namespace } from '../types/utils/withTranslation';
import useUser from './useUser';

interface UseConfirmWithOtpProps<T extends Namespace> {
  confirmationModalProps: Pick<
    ConfirmModalProps<T>,
    | 'body'
    | 'children'
    | 'namespace'
    | 'classNames'
    | 'title'
    | 'labels'
    | 'confirmProps'
  >;
  onConfirm: UseMutateFunction<
    void,
    AxiosError<APIError, any>,
    string,
    unknown
  >;
  action: OTPPayload['action'];
}

const APPROVAL_OTP_CARD = 'APPROVAL_OTP_CARD';
const CONFIRM_ACTION = 'CONFIRM_ACTION';

const useConfirmWithOtp = <T extends Namespace>({
  confirmationModalProps,
  onConfirm,
  action,
}: UseConfirmWithOtpProps<T>) => {
  const { t } = useTranslation();
  const sendOTP = useSendOTPEvent();
  const { user } = useUser();

  const confirmHandler = async (otp: string) => {
    const notificationId = notifications.show({
      message: t('processingYourRequest'),
      loading: true,
      withCloseButton: false,
      color: 'primary',
      h: '45px',
    });
    /**
     *  callback function to be called if the otp request successes and the action is confirmed in the modal
     */
    onConfirm(otp, {
      onSettled() {
        notifications.update({
          id: notificationId,
          message: t('processingYourRequest'),
          autoClose: 300,
        });
      },
    });
    modals.close(APPROVAL_OTP_CARD);
  };

  const sendOrResendOtp = () => {
    sendOTP(
      {
        contact: user?.mobile ?? '',
        contactType: 'mobile',
        action,
      },
      {
        onSuccess() {
          modals.open({
            modalId: APPROVAL_OTP_CARD,
            children: (
              <OtpCard
                send={confirmHandler}
                reSend={sendOrResendOtp}
                mobile={user?.mobile ?? ''}
                classNames={{
                  root: 'w-full',
                  subtitle: 'sm:px-0',
                }}
              />
            ),
            withCloseButton: false,
            classNames: {
              content:
                'bg-transparent shadow-none shadow-[0_0_0_0] max-w-[546px]',
              body: 'flex p-0',
            },
          });
        },
        onError(error) {
          openErrorModal({
            id: 'APPROVAL_OTP_CARD_ERROR',
            body: error.response?.data.message ?? error.message,
            translate: false,
            onTryAgain() {
              sendOrResendOtp();
            },
          });
        },
      },
    );
  };

  const confirmAction = () =>
    openConfirmationModal({
      id: CONFIRM_ACTION,
      namespace: confirmationModalProps?.namespace,
      classNames: {
        body: 'justify-start md:px-[1.5rem] md:mb-[1.88rem] md:pb-0',
      },
      body: confirmationModalProps?.body,
      size: 'lg',
      padding: 'lg',
      title: confirmationModalProps?.title,
      children: confirmationModalProps?.children,
      labels: {
        confirm: confirmationModalProps?.labels?.confirm ?? ('confirm' as any),
      },
      onConfirm() {
        return sendOrResendOtp();
      },
    });

  return { confirmAction };
};

export default useConfirmWithOtp;
