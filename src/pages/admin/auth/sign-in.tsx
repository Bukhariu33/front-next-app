import AuthLayout from '@/libs/components/auth/auth-layout';
import SignInPage from '@/libs/components/auth/sign-in-page';
import RootLayout from '@/libs/components/Base/layout/RootLayout';

function AdminSignIn() {
  return <SignInPage isAdmin />;
}

AdminSignIn.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <RootLayout>
      <AuthLayout>{page}</AuthLayout>
    </RootLayout>
  );
};

export default AdminSignIn;
