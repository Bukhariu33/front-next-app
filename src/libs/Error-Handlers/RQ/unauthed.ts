import type { AxiosError } from 'axios';

import { logout } from '@/libs/services/auth/logout';

const EXCEPTION = ['UNAUTHENTICATED', 'TOKEN_EXPIRED'];

const unAuthoredHandler = async (error: any) => {
  if (typeof window === 'undefined') return;

  const axiosError = error as AxiosError<APIError>;

  const isAuthPage = window.location.pathname.includes('/auth/sign-in');
  if (
    EXCEPTION.includes(axiosError.response?.data.exception ?? '') &&
    !isAuthPage
  ) {
    await logout(true);
  }
};

export default unAuthoredHandler;
