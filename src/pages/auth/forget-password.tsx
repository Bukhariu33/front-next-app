// eslint-disable-next-line simple-import-sort/imports
import { notifications } from '@mantine/notifications';
import { FormikProvider } from 'formik';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { useForgetPassword } from '@/libs/atoms/forgetPasswordAtom';
import AuthLayout from '@/libs/components/auth/auth-layout';
import ConfirmPassword from '@/libs/components/auth/confirm-password';
import ForgetPassword from '@/libs/components/auth/forget-password';
import OtpCard from '@/libs/components/auth/otp-card';
import RootLayout from '@/libs/components/Base/layout/RootLayout';
import { axiosInternal } from '@/libs/configs/axios';
import { useMutation } from '@/libs/hooks/use-mutation';
import { useForms } from '@/libs/hooks/useForms';
import { resetPassword } from '@/libs/services/auth/reset-password';
import { useSendOTPEvent } from '@/libs/services/otp';
import { ForgetPasswordSchema } from '@/libs/validations/auth-validations/forget-password-validation';

function ForgetPassowdPage() {
  const [data, setData] = useForgetPassword();
  const router = useRouter();
  const step = data?.step;
  const resendOtp = useSendOTPEvent();

  console.log('Here is my data: ', data);
  const { t } = useTranslation('auth');

  const { mutateAsync: submitForm } = useMutation({
    mutationFn: async (values: any) => {
      await resetPassword({
        mobile: values.mobile,
        newPassword: values.password,
        confirmPassword: values.confirmPassword,
        otp: values.otp,
      });
      return values;
    },
    onError: error => {
      return {
        id: 'otp-error',
        body:
          error.response?.data?.message ??
          'wrong otp please check the otp again',
        onTryAgain() {},
      };
    },
    onSuccess: () => {
      notifications.show({
        title: t('passwordResetedSuccuessfuly'),
        message: t('pleaseLogInAgain'),
        color: 'teal',
      });

      router.replace('/auth/sign-in');
      setData({ step: 'forgetPassword' });
    },
  });

  const initialValues: any = {
    mobile: data.userData?.mobile || '',
    otp: data.userData?.otp || '',
    password: data.userData?.password || '',
    confirmPassword: data.userData?.confirmPassword || '',
  };

  const formik = useForms({
    initialValues,
    validationSchema: ForgetPasswordSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: submitForm,
  });

  const { mutate: verifyResetCode } = useMutation({
    mutationFn: async ({
      email,
      reset_code,
    }: {
      email: string;
      reset_code: string;
    }) => {
      await axiosInternal.post(`/networkbux-reset/verify-email`, {
        email,
        reset_code,
      });
    },
    onSuccess: () => {
      setData({
        userData: { ...data.userData, ...formik.values },
        step: 'resetPassword',
      });
    },
  });

  const otpSend = async (otp: string) => {
    // api call to check the otp
    await formik.setFieldValue('otp', otp);

    // Use the actual OTP value passed to the function
    verifyResetCode({
      email: data?.userData?.email,
      reset_code: otp,
    });
  };

  const getForm = () => {
    switch (step) {
      case 'forgetPassword': {
        return <ForgetPassword />;
      }
      case 'verify':
        return (
          <OtpCard
            send={otpSend}
            reSend={() => {
              resendOtp({
                action: 'reset-password',
                contact: formik.values.mobile,
                contactType: 'mobile',
              });
            }}
            length={4}
            mobile={formik.values.mobile}
          />
        );
      case 'resetPassword':
        return <ConfirmPassword />;
      case 'clear':
        return null;

      default:
        throw new Error(`Invalid step ${step}`);
    }
  };
  return <FormikProvider value={formik}>{getForm()}</FormikProvider>;
}

ForgetPassowdPage.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <RootLayout>
      <AuthLayout>{page}</AuthLayout>
    </RootLayout>
  );
};

export default ForgetPassowdPage;
