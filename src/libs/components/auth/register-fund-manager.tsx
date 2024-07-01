import { useFormikContext } from 'formik';
import Link from 'next/link';
import Router from 'next/router';
import { useTranslation } from 'next-i18next';

import { useOtp } from '@/libs/atoms/otpAtom';
import { useAuth } from '@/libs/hooks/auth/useAuth';
import type { FundManagerSignupSchemaType } from '@/libs/validations/auth-validations/fund-manager-validtions';

import Button from '../Base/Buttons/Button';
import Input from '../Base/inputs/input';
import PasswordInput from '../Base/inputs/password-input';
import { default as PhoneNumberInput } from '../Base/inputs/phone-number-input';
import ReplaceTranslationKey from '../utils/ReplaceTranslationKey';
import {
  AuthCard,
  AuthCardBody,
  AuthCardFooter,
  AuthCardHeader,
} from './select-role';

const RegisterFundManager = () => {
  const { t } = useTranslation(['auth', 'error']);
  const { setFundManagerData } = useAuth();
  const [, setOtp] = useOtp();

  const formik = useFormikContext<FundManagerSignupSchemaType>();
  const submitHandler = async () => {
    const { values, setFieldTouched } = formik;
    const keys = ['fullName', 'email', 'mobile', 'password', 'confirmPassword'];
    await Promise.all(
      keys.map(key => {
        return setFieldTouched(key, true, true);
      }),
    );

    const currentStepHasError = keys.some(key => {
      return !!formik.errors[key as keyof FundManagerSignupSchemaType];
    });

    if (!currentStepHasError) {
      setFundManagerData(values, 'crNumber');
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
          <ReplaceTranslationKey
            text={t('createFundManagerAccount')}
            className="pt-4 text-2xl font-bold text-black sm:text-3xl"
            values={{
              fundManager: (
                <span className="text-brand-primary-main">
                  {t('fundManager')}
                </span>
              ),
            }}
          />

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
            backButtonOnClick={() => Router.push('/auth')}
          >
            <Button
              namespace="common"
              loading={formik.isSubmitting}
              text="next"
              data-cy-button="next"
              type="button"
              onClick={submitHandler}
              className="w-3/5 text-base"
            />
          </AuthCardFooter>
        </AuthCardBody>
      </AuthCard>
    </div>
  );
};

export default RegisterFundManager;
