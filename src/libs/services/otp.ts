import type { AxiosError } from 'axios';

import type { APIResponseOTP } from '@/pages/api/otp';

import { axiosInternal } from '../configs/axios';
import type { RestrictedMutationOptions } from '../hooks/use-mutation';
import { useMutation } from '../hooks/use-mutation';

type ContactType = 'mobile' | 'email' | 'nationalId' | 'crNumber';
type Action =
  | 'login'
  | 'register'
  | 'reset-password'
  | 'approve-fund'
  | 'deleteOwaisUser'
  | 'update-admin-owais-user-status'
  | 'reject-fund'
  | 'update-fund-manager-status';

export interface OTPPayload {
  contact: string;
  contactType: ContactType;
  action: Action;
}

const sendOTP = async (payload: OTPPayload) => {
  const { data } = await axiosInternal.post<APIResponseOTP>('/otp', payload);
  return data;
};

export interface CheckOTPPayload {
  contact: string;
  contactType: ContactType;
  action: Action;
  code: string;
}

const checkOTP = async (payload: CheckOTPPayload) => {
  const { data } = await axiosInternal.post<APIResponseOTP>(
    '/otp/check',
    payload,
  );
  return data;
};

const useSendOTPEvent = (
  onSuccess?: RestrictedMutationOptions<
    void,
    AxiosError<APIError>,
    OTPPayload,
    unknown
  >['onSuccess'],
) => {
  const { mutate: resendOtp } = useMutation({
    mutationFn: async (params: OTPPayload) => {
      await sendOTP(params);
    },
    onSuccess,
    onError(error, variables) {
      return {
        body: error.response?.data?.message || error.message,
        id: 'Mutations.Error.resendOtp',
        labels: {
          tryAgain: 'resendCode',
        },
        onTryAgain() {
          resendOtp(variables);
        },
      };
    },
  });

  return resendOtp;
};

const useCheckOTPEvent = (
  onSuccess?: RestrictedMutationOptions<
    void,
    AxiosError<APIError>,
    CheckOTPPayload,
    unknown
  >['onSuccess'],
) => {
  const resendOtp = useSendOTPEvent();
  const { mutate: checkOtp } = useMutation({
    mutationFn: async (params: CheckOTPPayload) => {
      await checkOTP(params);
    },
    onSuccess,
    onError(error, variables) {
      if (error.response?.status === 400) {
        return {
          id: 'Mutations.Error.checkOtp',
          body: error.response?.data?.message,
          labels: {
            tryAgain: 'resendCode',
          },
          onTryAgain() {
            resendOtp(variables);
          },
        };
      }
      return {
        body: error.response?.data?.message || error.message,
        id: 'Mutations.Error.checkOtp',
        onTryAgain() {},
        tryAgainProps: {
          disabled: true,
        },
      };
    },
  });

  return checkOtp;
};

export { checkOTP, sendOTP, useCheckOTPEvent, useSendOTPEvent };
