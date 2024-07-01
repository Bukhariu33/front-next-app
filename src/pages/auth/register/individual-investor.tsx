import { notifications } from '@mantine/notifications';
import { FormikProvider } from 'formik';
import { useRouter } from 'next/router';

import type { AuthState } from '@/libs/atoms/authAtom';
import AuthLayout from '@/libs/components/auth/auth-layout';
import OtpCard from '@/libs/components/auth/otp-card';
import RegisterIndividualInvestor from '@/libs/components/auth/register-individual-investor';
import RootLayout from '@/libs/components/Base/layout/RootLayout';
import { useAuth } from '@/libs/hooks/auth/useAuth';
import { useMutation } from '@/libs/hooks/use-mutation';
import { useForms } from '@/libs/hooks/useForms';
import { register } from '@/libs/services/auth/register';
import { useSendOTPEvent } from '@/libs/services/otp';
import {
  IndividualInvestorSignupSchema,
  type IndividualInvestorSignupSchemaType,
} from '@/libs/validations/auth-validations/individual-investor-validation';

function initForm(state?: AuthState): IndividualInvestorSignupSchemaType {
  const defaultFormData: IndividualInvestorSignupSchemaType = {
    fullName: '',
    confirmPassword: '',
    email: '',
    mobile: '',
    password: '',
    agreeToPrivacyPolicy: false,
    confirmTermsAndConditions: false,
    birthDate: '' as any,
    nationalId: '',
    otp: '____',
  };

  if (state?.userType === 'individualInvestor') {
    const { individualInvestorData } = state;
    defaultFormData.fullName = individualInvestorData?.fullName ?? '';
    defaultFormData.email = individualInvestorData?.email ?? '';
    defaultFormData.mobile = individualInvestorData?.mobile ?? '';
    defaultFormData.password = individualInvestorData?.password ?? '';
    defaultFormData.confirmPassword =
      individualInvestorData?.confirmPassword ?? '';
    defaultFormData.agreeToPrivacyPolicy =
      individualInvestorData?.agreeToPrivacyPolicy ?? false;
    defaultFormData.confirmTermsAndConditions =
      individualInvestorData?.confirmTermsAndConditions ?? false;
    defaultFormData.birthDate = individualInvestorData?.birthDate ?? '';
    defaultFormData.nationalId = individualInvestorData?.nationalId ?? '';
  }

  return defaultFormData;
}

function IndividualInvestorRegister() {
  const { auth, setAuthStep } = useAuth();
  const router = useRouter();
  const step = auth?.steps;

  const resendOtp = useSendOTPEvent(() => {
    if (step !== 'verify') setAuthStep('verify');
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (values: IndividualInvestorSignupSchemaType) => {
      await register({
        individualInvestorData: {
          ...values,
        },
        otp: values.otp,
        userType: 'individualInvestor',
        steps: 'verify',
      });
      return values;
    },
    onError: (error, { mobile }) => {
      if (error.response?.status === 422) {
        setAuthStep('register');
      }
      return {
        id: 'error-register-individual-investor',
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
    validationSchema: IndividualInvestorSignupSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: mutateAsync,
  });

  const getForm = () => {
    switch (step) {
      case 'register': {
        return <RegisterIndividualInvestor />;
      }
      case 'verify': {
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
            mobile={(auth as any)?.individualInvestorData?.mobile}
          />
        );
      }
      default:
        throw new Error(`Invalid step ${step}`);
    }
  };

  return <FormikProvider value={formik}>{getForm()}</FormikProvider>;
}

IndividualInvestorRegister.getLayout = function getLayout(
  page: React.ReactNode,
) {
  return (
    <RootLayout>
      <AuthLayout>{page}</AuthLayout>
    </RootLayout>
  );
};

export default IndividualInvestorRegister;
