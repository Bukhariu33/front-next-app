import { useFormikContext } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { useOtp } from '@/libs/atoms/otpAtom';
import { useAuth } from '@/libs/hooks/auth/useAuth';
import { useMutation } from '@/libs/hooks/use-mutation';
import { sendOTP } from '@/libs/services/otp';
import type { IndividualInvestorSignupSchemaType } from '@/libs/validations/auth-validations/individual-investor-validation';

import Button from '../Base/Buttons/Button';
import CheckboxInput from '../Base/inputs/checkbox-input';
import DateInput from '../Base/inputs/date-input';
import Input from '../Base/inputs/input';
import PasswordInput from '../Base/inputs/password-input';
import PhoneNumberInput from '../Base/inputs/phone-number-input';
import ReplaceTranslationKey from '../utils/ReplaceTranslationKey';
import {
  AuthCard,
  AuthCardBody,
  AuthCardFooter,
  AuthCardHeader,
} from './select-role';

const RegisterIndividualInvestor = () => {
  const { t } = useTranslation('auth');
  const { setIndividualInvestorData } = useAuth();
  const [, setOtp] = useOtp();
  const router = useRouter();

  const formik = useFormikContext<IndividualInvestorSignupSchemaType>();
  const { mutate } = useMutation({
    mutationFn: sendOTP,
  });

  const submitHandler = async () => {
    const { values, validateField } = formik;
    const keys = [
      'fullName',
      'email',
      'mobile',
      'password',
      'confirmPassword',
      'birthDate',
      'nationalId',
      'agreeToPrivacyPolicy',
      'confirmTermsAndConditions',
    ];
    await Promise.all(
      keys.map(key => {
        return validateField(key);
      }),
    );

    const currentStepHasError = keys.some(key => {
      return !!formik.errors[key as keyof IndividualInvestorSignupSchemaType];
    });

    if (!currentStepHasError) {
      setIndividualInvestorData(values, 'verify');
      setOtp({
        mobile: values.mobile,
        otpType: 'register',
      });
      mutate({
        action: 'register',
        contact: formik.values.mobile,
        contactType: 'mobile',
      });
    }
  };

  return (
    <div className="flex h-full w-full justify-center">
      <AuthCard className="flex flex-col justify-center sm:px-12 md:h-full">
        <AuthCardHeader>
          <p className="text-2xl font-bold text-black sm:text-3xl ">
            {t('createAccountAsAn')}{' '}
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
              data-cy-input="nationalId"
              label="Country"
              placeholder="Country"
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
              placeholder="phoneNumberFormat"
              data-cy-input="mobile"
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
            <div>
              <CheckboxInput
                label={
                  <ReplaceTranslationKey
                    text={t('continueAgreement')}
                    className="text-xs sm:text-sm"
                    values={{
                      terms: (
                        <Link
                          href="/terms-and-conditions"
                          className="text-brand-primary-main"
                        >
                          {t('termsAndConditions')}
                        </Link>
                      ),
                      disclosure: (
                        <Link
                          href="/disclosure-policy"
                          className="text-brand-primary-main"
                        >
                          {t('disclosurePolicy')}
                        </Link>
                      ),
                    }}
                  />
                }
                {...formik.getFieldProps('confirmTermsAndConditions')}
                onChange={e => {
                  formik.setFieldValue(
                    'confirmTermsAndConditions',
                    e.target.checked,
                  );
                }}
                checked={formik.values.confirmTermsAndConditions}
                {...(formik.errors.confirmTermsAndConditions &&
                  formik.touched.confirmTermsAndConditions && {
                    errorMessage: t(
                      formik.errors.confirmTermsAndConditions as any,
                    ),
                  })}
                data-cy-input="terms-and-conditions"
              />
              <CheckboxInput
                label={
                  <span className="text-xs sm:text-sm">
                    {t('continueAgreement2')}{' '}
                    <Link
                      href="privacy-policy"
                      className="text-brand-primary-main"
                    >
                      {t('privacyPolicy')}
                    </Link>
                  </span>
                }
                {...formik.getFieldProps('agreeToPrivacyPolicy')}
                onChange={e => {
                  formik.setFieldValue(
                    'agreeToPrivacyPolicy',
                    e.target.checked,
                  );
                }}
                checked={formik.values.agreeToPrivacyPolicy}
                {...(formik.errors.agreeToPrivacyPolicy &&
                  formik.touched.agreeToPrivacyPolicy && {
                    errorMessage: t(formik.errors.agreeToPrivacyPolicy as any),
                  })}
                data-cy-input="privacy-policy"
              />
            </div>
          </div>
          <AuthCardFooter
            withBackButton
            backButtonOnClick={() => router.push('/auth')}
          >
            <Button
              type="submit"
              namespace="common"
              loading={formik.isSubmitting}
              disabled={!formik.isValid}
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

export default RegisterIndividualInvestor;
