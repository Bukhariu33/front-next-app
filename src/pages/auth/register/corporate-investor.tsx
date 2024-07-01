import { notifications } from '@mantine/notifications';
import { FormikProvider } from 'formik';
import { useRouter } from 'next/router';

import type { AuthState } from '@/libs/atoms/authAtom';
import AuthLayout from '@/libs/components/auth/auth-layout';
import ConfirmCompanyDetails from '@/libs/components/auth/confirm-company-details';
import OtpCard from '@/libs/components/auth/otp-card';
import RegisterCorporateInvestor from '@/libs/components/auth/register-corporate-investor';
import ConfirmCorporateInvestor from '@/libs/components/auth/register-cr-number';
import RootLayout from '@/libs/components/Base/layout/RootLayout';
import { useAuth } from '@/libs/hooks/auth/useAuth';
import { useMutation } from '@/libs/hooks/use-mutation';
import { useForms } from '@/libs/hooks/useForms';
import { register } from '@/libs/services/auth/register';
import { useSendOTPEvent } from '@/libs/services/otp';
import type { CorporateInvestorSignupSchemaType } from '@/libs/validations/auth-validations/corporate-investor-validation';
import { CorporateInvestorSignupSchema } from '@/libs/validations/auth-validations/corporate-investor-validation';

function initForm(state?: AuthState): CorporateInvestorSignupSchemaType {
  const defaultFormData: CorporateInvestorSignupSchemaType = {
    fullName: '',
    confirmPassword: '',
    email: '',
    mobile: '',
    password: '',
    agreeToPrivacyPolicy: false,
    confirmTermsAndConditions: false,
    birthDate: '' as any,
    nationalId: '',
    crNumber: '',
    otp: '____',
  };

  if (state?.userType === 'corporateInvestor') {
    const { corporateInvestorData } = state;
    defaultFormData.fullName = corporateInvestorData?.fullName ?? '';
    defaultFormData.email = corporateInvestorData?.email ?? '';
    defaultFormData.mobile = corporateInvestorData?.mobile ?? '';
    defaultFormData.password = corporateInvestorData?.password ?? '';
    defaultFormData.confirmPassword =
      corporateInvestorData?.confirmPassword ?? '';
    defaultFormData.agreeToPrivacyPolicy =
      corporateInvestorData?.agreeToPrivacyPolicy ?? false;
    defaultFormData.confirmTermsAndConditions =
      corporateInvestorData?.confirmTermsAndConditions ?? false;
    defaultFormData.birthDate = corporateInvestorData?.birthDate ?? '';
    defaultFormData.nationalId = corporateInvestorData?.nationalId ?? '';
    defaultFormData.crNumber = corporateInvestorData?.crNumber ?? '';
  }

  return defaultFormData;
}

function CorporateInvestorRegister() {
  const { auth, setAuthStep } = useAuth();
  const router = useRouter();
  const step = auth?.steps;

  const resendOtp = useSendOTPEvent(() => {
    if (step !== 'verify') setAuthStep('verify');
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (values: CorporateInvestorSignupSchemaType) => {
      await register({
        corporateInvestorData: {
          ...values,
        },
        otp: values.otp,
        userType: 'corporateInvestor',
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
        id: 'error-register-corporate-investor',
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
    validationSchema: CorporateInvestorSignupSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: mutateAsync,
  });

  const getForm = () => {
    switch (step) {
      case 'register': {
        return <RegisterCorporateInvestor />;
      }
      case 'crNumber':
        return <ConfirmCorporateInvestor />;
      case 'confirm':
        return <ConfirmCompanyDetails />;
      case 'verify': {
        return (
          <OtpCard
            send={otp => {
              formik.setFieldValue('otp', otp).then(() => formik.submitForm());
            }}
            reSend={async () => {
              resendOtp({
                action: 'register',
                contact: formik.values.mobile,
                contactType: 'mobile',
              });
            }}
            length={4}
            mobile={(auth as any)?.corporateInvestorData?.mobile}
          />
        );
      }
      default:
        throw new Error(`Invalid step ${step}`);
    }
  };

  return <FormikProvider value={formik}>{getForm()}</FormikProvider>;
}

CorporateInvestorRegister.getLayout = function getLayout(
  page: React.ReactNode,
) {
  return (
    <RootLayout>
      <AuthLayout>{page}</AuthLayout>
    </RootLayout>
  );
};

export default CorporateInvestorRegister;
