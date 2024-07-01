import type { ReactNode } from 'react';

import AuthLayout from '@/libs/components/auth/auth-layout';
import SignInPage from '@/libs/components/auth/sign-in-page';
import RootLayout from '@/libs/components/Base/layout/RootLayout';

function SignIn() {
  return <SignInPage isAdmin={true} />;
}

SignIn.getLayout = (page: ReactNode) => {
  return (
    <RootLayout>
      <AuthLayout>{page}</AuthLayout>
    </RootLayout>
  );
};

export default SignIn;
