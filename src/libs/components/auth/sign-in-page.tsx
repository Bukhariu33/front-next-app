import Router from 'next/router';
import { useState } from 'react';

import OtpCard from '@/libs/components/auth/otp-card';
import SignInCard from '@/libs/components/auth/sign-in-card';
import { useMutation } from '@/libs/hooks/use-mutation';
import { useForms } from '@/libs/hooks/useForms';
import signin from '@/libs/services/auth/signin';
import type { SigninSchemaType } from '@/libs/validations/auth-validations/signin-validation';
import { SigninSchema } from '@/libs/validations/auth-validations/signin-validation';

const SignInPage = ({ isAdmin = false }: { isAdmin?: boolean }) => {
  const [showOTP, setShowOTP] = useState(false);
  console.log('isAdmin', isAdmin);

  const { mutateAsync } = useMutation({
    // mutationFn: async (values: SigninSchemaType) => {
    //   await sendOTP({
    //     action: 'login',
    //     contact: values.email,
    //     contactType: 'email',
    //   });
    // },
    // onSuccess: () => {
    //   setShowOTP(true);
    // },

    mutationFn: async (values: SigninSchemaType) => {
      await signin(values, isAdmin ? 'Admin' : 'user');
    },
    onSuccess: () => {
      const callbackUrl =
        new URLSearchParams(window.location.search).get('callbackUrl') ??
        '/user';
      console.log('call back url: ', callbackUrl);
      if (callbackUrl === '/user') {
        window.location.href = '/user';
      } else {
        Router.push(callbackUrl);
      }
      // Router.push(callbackUrl)
    },
    onError(error) {
      return {
        id: 'signin-error',
        body: error.message,
        onTryAgain() {
          if (error.response?.status === 401) {
            setShowOTP(false);
          }
        },
      };
    },
  });

  const { mutate: SignIn } = useMutation({
    mutationFn: async (values: SigninSchemaType) => {
      await signin(values, isAdmin ? 'Admin' : ('user' as const));
    },
    onSuccess: () => {
      const callbackUrl =
        new URLSearchParams(window.location.search).get('callbackUrl') ?? '/';
      console.log('call back url222: ', callbackUrl);
      Router.push(callbackUrl);
    },
    onError(error) {
      return {
        id: 'signin-error',
        body: error.message,
        onTryAgain() {
          if (error.response?.status === 401) {
            setShowOTP(false);
          }
        },
      };
    },
  });

  const formik = useForms({
    initialValues: {
      email: '',
      password: '',
      otp: '____',
    },
    validationSchema: SigninSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: mutateAsync,
  });

  // if (!auth.userType) throw new Error('please select a role');

  if (!showOTP) return <SignInCard {...formik} />;

  return (
    <OtpCard
      send={async otp => {
        SignIn({ ...formik.values, otp });
      }}
      reSend={() => {
        formik.submitForm();
      }}
      length={4}
      mobile="+966xxxxxx243"
    />
  );
};
export default SignInPage;
