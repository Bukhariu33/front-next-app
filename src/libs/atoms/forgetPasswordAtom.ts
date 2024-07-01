import { useWindowEvent } from '@mantine/hooks';
import { atom, useRecoilState } from 'recoil';

import { sessionEffect } from '@/utils/atomSessionStorage';

type Step = 'forgetPassword' | 'verify' | 'resetPassword' | 'clear';

export interface ForgetPasswordState {
  userData?: any;
  step: Step;
}

const initialState: ForgetPasswordState = {
  step: 'forgetPassword',
  userData: {
    mobile: '',
    password: '',
    confirmPassword: '',
    otp: '',
  },
};

const forgetPasswordEffect = sessionEffect<ForgetPasswordState>(
  'forget-password-data',
);

export const ForgetPasswordAtom = atom({
  key: 'forgetPassword',
  default: initialState,
  effects: [forgetPasswordEffect],
});

export const useForgetPassword = () => {
  const [data, setData] = useRecoilState(ForgetPasswordAtom);

  useWindowEvent('beforeunload', () => {
    if (window.location.pathname !== '/auth/forget-password') {
      setData({ step: 'clear' });
    }
  });
  return [data, setData] as const;
};
