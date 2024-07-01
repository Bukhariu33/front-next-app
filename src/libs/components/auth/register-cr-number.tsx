import { useFormikContext } from 'formik';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { useAuth } from '@/libs/hooks/auth/useAuth';
import type { CorporateInvestorSignupSchemaType } from '@/libs/validations/auth-validations/corporate-investor-validation';
import type { FundManagerSignupSchemaType } from '@/libs/validations/auth-validations/fund-manager-validtions';

import Button from '../Base/Buttons/Button';
import CheckboxInput from '../Base/inputs/checkbox-input';
import Input from '../Base/inputs/input';
import ReplaceTranslationKey from '../utils/ReplaceTranslationKey';
import {
  AuthCard,
  AuthCardBody,
  AuthCardFooter,
  AuthCardHeader,
} from './select-role';

type UserSchema =
  | FundManagerSignupSchemaType
  | CorporateInvestorSignupSchemaType;

const RegisterCrNumber = () => {
  const { t } = useTranslation('auth');
  const { setCrNumberData, setAuthStep, auth } = useAuth();

  const formik = useFormikContext<UserSchema>();

  const submitHandler = async () => {
    const { values, isValid, setFieldTouched } = formik;
    const keys = [
      'crNumber',
      'confirmTermsAndConditions',
      'agreeToPrivacyPolicy',
    ];
    await Promise.all(
      keys.map(key => {
        return setFieldTouched(key, true, true);
      }),
    );
    if (isValid) {
      setCrNumberData(values, 'confirm');
    }
  };

  const renderHeader = () => {
    return (
      <AuthCardHeader>
        {auth.userType === 'fundManager' ? (
          <ReplaceTranslationKey
            text={t('createFundManagerAccount')}
            className="py-6 text-2xl font-bold text-black sm:text-3xl"
            values={{
              fundManager: (
                <span className="text-brand-primary-main">
                  {t(
                    auth.userType === 'fundManager'
                      ? 'fundManager'
                      : 'corporateInvestor',
                  )}
                </span>
              ),
            }}
          />
        ) : (
          <p className="text-2xl font-bold text-black sm:text-3xl ">
            {t('createAccountAsAn')}{' '}
            <span className="text-brand-primary-main">
              {t('corporateInvestor2')}
            </span>
          </p>
        )}
      </AuthCardHeader>
    );
  };

  return (
    <AuthCard className="flex flex-col justify-center py-10 md:h-full">
      {renderHeader()}
      <AuthCardBody mb={20}>
        <div className="flex flex-col gap-5 text-sm sm:text-lg">
          <Input
            namespace="auth"
            label="commercialRegister"
            data-cy-input="crNumber"
            placeholder="enterCRNumber"
            type="number"
            {...formik.getFieldProps('crNumber')}
            {...(formik.errors.crNumber &&
              formik.touched.crNumber && {
                errorMessage: formik.errors.crNumber as any,
              })}
          />
          <div>
            <CheckboxInput
              label={
                <ReplaceTranslationKey
                  className="text-xs sm:text-sm"
                  text={t('continueAgreement')}
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
              className="text-sm"
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
              className="mt-3 text-sm "
              {...formik.getFieldProps('agreeToPrivacyPolicy')}
              onChange={e => {
                formik.setFieldValue('agreeToPrivacyPolicy', e.target.checked);
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
          backButtonOnClick={() => {
            setAuthStep('register');
          }}
          className="sm:px-14"
        >
          <Button
            namespace="common"
            text="next"
            data-cy-button="next"
            loading={formik.isSubmitting}
            className="w-3/5 text-base"
            type="button"
            onClick={submitHandler}
          />
        </AuthCardFooter>
      </AuthCardBody>
    </AuthCard>
  );
};

export default RegisterCrNumber;
