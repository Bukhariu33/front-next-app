import { signIn } from 'next-auth/react';

import type { SigninSchemaType } from '@/libs/validations/auth-validations/signin-validation';

const signin = async (values: SigninSchemaType, userType: 'Admin' | 'user') => {
  const response = await signIn('credentials', {
    ...values,
    userType,
    email: values.email,
    redirect: false,
  });
  if (response?.error) {
    console.log(response.error);
  }
    // throw new Error(response?.error ?? '');
  return response;
};

export default signin;
