import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useFormikContext } from 'formik';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

import { useAuth } from '@/libs/hooks/auth/useAuth';
import { useMutation } from '@/libs/hooks/use-mutation';
import { corpInfoQueryOptions } from '@/libs/services/corp-info';
import { sendOTP } from '@/libs/services/otp';
import type { CorporateInvestorSignupSchemaType } from '@/libs/validations/auth-validations/corporate-investor-validation';
import type { FundManagerSignupSchemaType } from '@/libs/validations/auth-validations/fund-manager-validtions';
import { formatDate } from '@/utils/formatDate';

import Button from '../Base/Buttons/Button';
import InfoCard from '../Base/Card/info-card';
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

const ConfirmCompanyDetails = () => {
  const { t } = useTranslation('auth');
  const { auth, setAuthStep } = useAuth();
  const formik = useFormikContext<UserSchema>();
  const { data, isError, error } = useQuery(
    corpInfoQueryOptions.details(formik.values.crNumber),
  );

  const { mutate } = useMutation({
    mutationFn: sendOTP,
    onSuccess: () => {
      setAuthStep('verify');
    },
  });

  useEffect(() => {
    if (isError) {
      const handleError = async () => {
        const err = (error as AxiosError<APIError>).response?.data;
        const message =
          err?.status === 500
            ? 'Invalid CR Number'
            : err?.message ?? 'Invalid CR Number';
        await formik.setFieldTouched('crNumber', true, true);
        formik.setFieldError('crNumber', message);
        setAuthStep('crNumber');
      };
      handleError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return (
    <AuthCard className="flex flex-col justify-center py-10 md:h-full">
      <AuthCardHeader>
        <ReplaceTranslationKey
          text={t('createFundManagerAccount')}
          className="py-2 text-2xl font-bold text-black sm:py-6 sm:text-3xl"
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
      </AuthCardHeader>
      <AuthCardBody mb={20}>
        <div className="grid   gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <InfoCard title={t('companyName')} value={data?.name} />
          </div>
          <InfoCard
            title={t('commercialRegistrationNumber')}
            value={data?.crNumber}
            valueClassName="text-brand-primary-main"
            withCopy
          />
          <InfoCard
            title={t('city')}
            value={data?.city}
            withDivider
            wrapperClassName="w-2/5"
          />
          <InfoCard
            title={t('dateOfIssuance')}
            value={formatDate(data?.issuanceDate)}
          />
          <InfoCard
            title={t('expirationDate')}
            value={formatDate(data?.expiryDate)}
            withDivider
            wrapperClassName="w-2/5"
          />
        </div>
        <AuthCardFooter
          withBackButton
          backButtonOnClick={() => {
            setAuthStep('crNumber');
          }}
          className="sm:px-14"
        >
          <Button
            namespace="auth"
            text="createAccount"
            className="w-3/5 text-base"
            data-cy-button="createAccount"
            onClick={() =>
              mutate({
                action: 'register',
                contact: formik.values.mobile,
                contactType: 'mobile',
              })
            }
            loading={formik.isSubmitting}
          />
        </AuthCardFooter>
      </AuthCardBody>
    </AuthCard>
  );
};

export default ConfirmCompanyDetails;
