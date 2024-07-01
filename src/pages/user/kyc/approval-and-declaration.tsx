import { Checkbox, Space, Text } from '@mantine/core';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { KycForm } from '@/libs/components/kyc/kyc-form';
import { StyledCheckbox } from '@/libs/components/kyc/StyledCheckbox';
import TermsCard from '@/libs/components/kyc/terms-card';
import useCorporateKyc from '@/libs/hooks/kyc/useCorporateKyc';
import useIndividualKyc from '@/libs/hooks/kyc/useIndividualKyc';
import useKycMutation from '@/libs/hooks/kyc/useKycMutation';
import { useForms } from '@/libs/hooks/useForms';
import useUser from '@/libs/hooks/useUser';
import { withKycQueries } from '@/libs/services/investor/kyc/withKycQueries';
import type { ApprovalDeclarationSchemaType } from '@/libs/validations/investor/kyc';
import { ApprovalDeclarationSchema } from '@/libs/validations/investor/kyc';

const KycPage = () => {
  const { t } = useTranslation(['kyc', 'error']);
  const { user } = useUser();
  const router = useRouter();

  const corporateKycData = useCorporateKyc();
  const individualKycData = useIndividualKyc();

  const userKyc =
    user?.type === 'corporateInvestor'
      ? corporateKycData?.data
      : individualKycData?.data;

  const initialValues: ApprovalDeclarationSchemaType = {
    checked: userKyc?.checked ?? [],
    acknowledgmentSigned: userKyc?.acknowledgmentSigned ?? false,
  };

  const { mutateAsync } = useKycMutation({
    onSuccess: () => {
      router.push('/investor/kyc/rating');
    },
  });

  const formik = useForms({
    initialValues,
    validationSchema: ApprovalDeclarationSchema,
    enableReinitialize: true,
    onSubmit: _values => mutateAsync({ acknowledgmentSigned: false }),
  });
  const isValid =
    user?.type === 'individualInvestor'
      ? formik?.values?.checked?.length === 3
      : formik?.values?.checked?.length === 2;

  return (
    <KycForm
      onSubmit={formik.handleSubmit}
      alert={!isValid && !formik.isValid && !formik.touched}
      disableSubmit={!isValid}
    >
      {user?.type === 'corporateInvestor' && (
        <Checkbox.Group
          className="mt-[16px] grid gap-[25px]"
          value={formik.values.checked}
          onChange={value => {
            formik.setFieldValue('checked', value);
          }}
        >
          <TermsCard>
            <Checkbox value="checked1" />
            <Text className="text-sm md:text-base">
              <span>
                {t('acknowledgeTermsAndConditions')}{' '}
                <span className="mx-[5px] cursor-pointer text-brand-primary-main">
                  {t('termsAndConditions')}
                </span>
                {', '}
                <span className="mx-[5px] cursor-pointer text-brand-primary-main">
                  {t('investmentAgencyAgreement')}
                </span>{' '}
                {t('andBothThe')}{' '}
                <span className="mx-[5px] cursor-pointer text-brand-primary-main">
                  {t('disclosurePolicy')}
                </span>{' '}
                {t('and')}{' '}
                <span className="mx-[5px] cursor-pointer text-brand-primary-main">
                  {t('privacyPolicy')}
                </span>{' '}
                {t('clearlyAndInBestMind')}{' '}
              </span>
            </Text>
          </TermsCard>
          <Space h="25px" />
          <TermsCard text={t('institutionalAcknowledgementDeclaration') || ''}>
            <Checkbox value="checked2" />
          </TermsCard>
        </Checkbox.Group>
      )}

      {user?.type === 'individualInvestor' && (
        <Checkbox.Group
          className="mt-[16px] grid gap-[25px]"
          value={formik.values.checked}
          onChange={value => {
            formik.setFieldValue('checked', value);
          }}
        >
          <Space h="25px" />
          <TermsCard>
            <StyledCheckbox value="checked1" />
            <Text className="text-sm md:text-base" c="#000">
              {t('yesme')}
              <span className="mx-[5px] cursor-pointer text-brand-primary-main">
                {user.fullName}
              </span>{' '}
              {t('Idnumber')}
              <Text className="mx-[5px] cursor-pointer text-brand-primary-main">
                {user.nationalId}
              </Text>{' '}
              {t('Declaration1')}
            </Text>
          </TermsCard>
          <Space h="25px" />
          <TermsCard text={t('Declaration2') || ''}>
            <StyledCheckbox value="checked2" />
          </TermsCard>
          <Space h="25px" />
          <TermsCard text={t('Declaration3') || ''}>
            <StyledCheckbox value="checked3" />
          </TermsCard>
        </Checkbox.Group>
      )}
    </KycForm>
  );
};

export default KycPage;

export const getServerSideProps: GetServerSideProps = withKycQueries();
