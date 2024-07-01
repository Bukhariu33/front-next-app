import { notifications } from '@mantine/notifications';
import { FormikProvider } from 'formik';
import { useRouter } from 'next/router';

import type { AuthState } from '@/libs/atoms/authAtom';
import AuthLayout from '@/libs/components/auth/auth-layout';
import ConfirmCompanyDetails from '@/libs/components/auth/confirm-company-details';
import OtpCard from '@/libs/components/auth/otp-card';
import ConfirmFundManager from '@/libs/components/auth/register-cr-number';
import RegisterFundManager from '@/libs/components/auth/register-fund-manager';
import RootLayout from '@/libs/components/Base/layout/RootLayout';
import { useAuth } from '@/libs/hooks/auth/useAuth';
import { useMutation } from '@/libs/hooks/use-mutation';
import { useForms } from '@/libs/hooks/useForms';
import { register } from '@/libs/services/auth/register';
import { useSendOTPEvent } from '@/libs/services/otp';
import {
  FundManagerSignupSchema,
  type FundManagerSignupSchemaType,
} from '@/libs/validations/auth-validations/fund-manager-validtions';

function initForm(state?: AuthState): FundManagerSignupSchemaType {
  const defaultFormData: FundManagerSignupSchemaType = {
    fullName: '',
    confirmPassword: '',
    email: '',
    mobile: '',
    password: '',
    crNumber: '',
    agreeToPrivacyPolicy: false,
    confirmTermsAndConditions: false,
    otp: '____',
  };

  if (state?.userType === 'fundManager') {
    const { fundManagerData } = state;
    defaultFormData.fullName = fundManagerData?.fullName ?? '';
    defaultFormData.email = fundManagerData?.email ?? '';
    defaultFormData.mobile = fundManagerData?.mobile ?? '';
    defaultFormData.password = fundManagerData?.password ?? '';
    defaultFormData.confirmPassword = fundManagerData?.confirmPassword ?? '';
    defaultFormData.crNumber = fundManagerData?.crNumber ?? '';
    defaultFormData.agreeToPrivacyPolicy =
      fundManagerData?.agreeToPrivacyPolicy ?? false;
    defaultFormData.confirmTermsAndConditions =
      fundManagerData?.confirmTermsAndConditions ?? false;
  }

  return defaultFormData;
}

function FundManagerRegister() {
  const { auth, setAuthStep } = useAuth();
  const router = useRouter();
  const step = auth?.steps;

  const resendOtp = useSendOTPEvent(() => {
    if (step !== 'verify') setAuthStep('verify');
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (
      values: FundManagerSignupSchemaType & { otp: string },
    ) => {
      await register({
        fundManagerData: {
          ...values,
        },
        otp: values.otp,
        userType: 'fundManager',
        steps: 'verify',
      });
      return values;
    },
    onError: (error, { mobile }) => {
      if (error.response?.status === 422) {
        const { step: errorInStep } = error.response?.data as any;
        setAuthStep(errorInStep);
      }
      return {
        id: 'error-register-fund-manager',
        body: error.response?.data?.message ?? 'Something went wrong',
        labels: {
          tryAgain: 'resendCode',
        },
        onTryAgain() {
          resendOtp({
            action: 'register',
            contact: mobile,
            contactType: 'mobile',
          });
        },
      };
    },
    onSuccess: () => {
      notifications.show({
        title: 'تم إنشاء حسابك بنجاح',
        message: 'تم إرسال رسالة تأكيد إلى البريد الإلكتروني الخاص بك',
        color: 'teal',
      });
      router.replace('/auth/sign-in');
    },
  });

  const formik = useForms({
    initialValues: initForm(auth),
    validationSchema: FundManagerSignupSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: mutateAsync,
  });

  const getForm = () => {
    switch (step) {
      case 'register': {
        return <RegisterFundManager />;
      }
      case 'crNumber':
        return <ConfirmFundManager />;
      case 'confirm':
        return <ConfirmCompanyDetails />;
      case 'verify':
        return (
          <OtpCard
            send={otp => {
              formik.setFieldValue('otp', otp).then(() => formik.submitForm());
            }}
            reSend={() => {
              resendOtp({
                action: 'register',
                contact: formik.values.mobile,
                contactType: 'mobile',
              });
            }}
            length={4}
            mobile={(auth as any)?.fundManagerData?.mobile}
          />
        );
      default:
        throw new Error(`Invalid step ${step}`);
    }
  };

  return <FormikProvider value={formik}>{getForm()}</FormikProvider>;
}

FundManagerRegister.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <RootLayout>
      <AuthLayout>{page}</AuthLayout>
    </RootLayout>
  );
};

export default FundManagerRegister;
