import AuthLayout from '@/libs/components/auth/auth-layout';
import RegisterUser from '@/libs/components/auth/register-user';
import RootLayout from '@/libs/components/Base/layout/RootLayout';

function UserRegistration() {
  <RegisterUser />;
}

UserRegistration.getLayout = function getLayout() {
  return (
    <RootLayout>
      <AuthLayout>
        <RegisterUser />
      </AuthLayout>
    </RootLayout>
  );
};

export default UserRegistration;
