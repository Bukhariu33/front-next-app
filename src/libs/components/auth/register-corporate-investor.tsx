import { useFormikContext } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { useOtp } from '@/libs/atoms/otpAtom';
import { useAuth } from '@/libs/hooks/auth/useAuth';
import type { CorporateInvestorSignupSchemaType } from '@/libs/validations/auth-validations/corporate-investor-validation';

import Button from '../Base/Buttons/Button';
import DateInput from '../Base/inputs/date-input';
import Input from '../Base/inputs/input';
import PasswordInput from '../Base/inputs/password-input';
import PhoneNumberInput from '../Base/inputs/phone-number-input';
import {
  AuthCard,
  AuthCardBody,
  AuthCardFooter,
  AuthCardHeader,
} from './select-role';

const RegisterCorporateInvestor = () => {
  const { t } = useTranslation('auth');
  const { setCorporateInvestorData } = useAuth();
  const [, setOtp] = useOtp();
  const router = useRouter();

  const formik = useFormikContext<CorporateInvestorSignupSchemaType>();

  const submitHandler = async () => {
    const { values, setFieldTouched } = formik;
    const keys = [
      'fullName',
      'email',
      'mobile',
      'password',
      'confirmPassword',
      'birthDate',
      'nationalId',
    ];
    await Promise.all(
      keys.map(key => {
        return setFieldTouched(key, true, true);
      }),
    );

    const currentStepHasError = keys.some(key => {
      return !!formik.errors[key as keyof CorporateInvestorSignupSchemaType];
    });

    if (!currentStepHasError) {
      setCorporateInvestorData(values, 'crNumber');
      setOtp({
        mobile: values.mobile,
        otpType: 'register',
      });
    }
  };

  return (
    <div className="flex h-full w-full justify-center">
      <AuthCard className="flex flex-col justify-center sm:px-12 md:h-full">
        <AuthCardHeader>
          <p className="text-2xl font-bold text-black sm:text-3xl ">
            {t('createAccountAsAn')}{' '}
            <span className="text-brand-primary-main">
              {t('corporateInvestor2')}
            </span>
          </p>
          <p className="mt-3 text-sm text-brand-accent-500 sm:text-xl">
            {t('haveAccount')}{' '}
            <Link
              href="/auth/sign-in"
              className="font-medium text-brand-primary-main"
            >
              {t('loginNow')}
            </Link>
          </p>
        </AuthCardHeader>
        <AuthCardBody mb={20}>
          <div className="flex flex-col gap-5 text-sm sm:text-lg">
            <Input
              namespace="auth"
              label="fullName"
              data-cy-input="fullName"
              placeholder="enterFullName"
              {...formik.getFieldProps('fullName')}
              {...(formik.errors.fullName &&
                formik.touched.fullName && {
                  errorMessage: formik.errors.fullName as any,
                })}
            />
            <Input
              namespace="auth"
              label="email"
              data-cy-input="email"
              placeholder="enterEmail"
              type="email"
              {...formik.getFieldProps('email')}
              {...(formik.errors.email &&
                formik.touched.email && {
                  errorMessage: formik.errors.email as any,
                })}
            />
            <Input
              type="number"
              namespace="auth"
              label="nationalID"
              data-cy-input="nationalId"
              placeholder="enterNationalID"
              {...formik.getFieldProps('nationalId')}
              {...(formik.errors.nationalId &&
                formik.touched.nationalId && {
                  errorMessage: formik.errors.nationalId as any,
                })}
            />
            <DateInput
              namespace="auth"
              label="dateOfBirth"
              placeholder="dateFormat"
              data-test="dateOfBirth"
              name="birthDate"
              onChange={e => {
                formik.setFieldValue('birthDate', e);
              }}
              onBlur={_ => {
                formik.setFieldTouched('birthDate', true);
              }}
              value={formik.values.birthDate}
              {...(formik.errors.birthDate &&
                formik.touched.birthDate && {
                  errorMessage: formik.errors.birthDate as any,
                })}
            />
            <PhoneNumberInput
              namespace="auth"
              label="phoneNumber"
              data-cy-input="mobile"
              placeholder="phoneNumberFormat"
              name="mobile"
              onChange={value => {
                formik.setFieldValue('mobile', value);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.mobile}
              {...(formik.errors.mobile &&
                formik.touched.mobile && {
                  errorMessage: formik.errors.mobile as any,
                })}
            />
            <PasswordInput
              namespace="auth"
              label="password"
              data-cy-input="password"
              placeholder="enterPassword"
              {...formik.getFieldProps('password')}
              {...(formik.errors.password &&
                formik.touched.password && {
                  errorMessage: formik.errors.password as any,
                })}
            />
            <PasswordInput
              namespace="auth"
              label="confirmPassword"
              data-cy-input="confirmPassword"
              placeholder="reEnterPassword"
              {...formik.getFieldProps('confirmPassword')}
              {...(formik.errors.confirmPassword &&
                formik.touched.confirmPassword && {
                  errorMessage: formik.errors.confirmPassword as any,
                })}
            />
          </div>
          <AuthCardFooter
            withBackButton
            backButtonOnClick={() => router.push('/auth')}
          >
            <Button
              type="submit"
              namespace="common"
              loading={formik.isSubmitting}
              // disabled={!formik.isValid}
              data-cy-button="next"
              text="next"
              className="w-3/5 text-base"
              onClick={submitHandler}
            />
          </AuthCardFooter>
        </AuthCardBody>
      </AuthCard>
    </div>
  );
};

export default RegisterCorporateInvestor;
