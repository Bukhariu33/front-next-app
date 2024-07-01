import { signOut } from 'next-auth/react';

import { axiosInternal } from '@/libs/configs/axios';

export const logout = async (withCallbackUrl = false) => {
  await axiosInternal.post('/auth/logout');
  const isAdmin = window.location.pathname.includes('/admin');
  const authPage = isAdmin ? '/admin/auth/sign-in' : '/auth/sign-in';

  await signOut({
    redirect: true,
    callbackUrl: authPage,
  });
  if (withCallbackUrl)
    window.location.href = `${authPage}?${new URLSearchParams({
      callbackUrl: window.location.href,
    })}`;
};
