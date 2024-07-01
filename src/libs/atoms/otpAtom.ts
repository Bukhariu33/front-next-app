import { atom, useRecoilState } from 'recoil';

import { sessionEffect } from '@/utils/atomSessionStorage';

export type OtpType = 'login' | 'register' | 'reset-password';

export type OtpState = {
  otpType: OtpType;
  mobile: string;
};

const otpEffect = sessionEffect<OtpState>('otp_data');

export const otpAtom = atom({
  key: 'otp',
  default: {} as OtpState,
  effects: [otpEffect],
});

export const useOtp = () => useRecoilState(otpAtom);
