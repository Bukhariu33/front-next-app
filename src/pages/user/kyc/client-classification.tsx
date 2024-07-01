import { Text } from '@mantine/core';
import type { Resources } from 'i18next';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { KycForm } from '@/libs/components/kyc/kyc-form';
import KycRadioGroup from '@/libs/components/kyc/kyc-radio-group';
import TermsCard from '@/libs/components/kyc/terms-card';
import useCorporateKyc from '@/libs/hooks/kyc/useCorporateKyc';
import useKycMutation from '@/libs/hooks/kyc/useKycMutation';
import { useForms } from '@/libs/hooks/useForms';
import useInvestorSettings from '@/libs/hooks/useInvestorSettings';
import { withKycQueries } from '@/libs/services/investor/kyc/withKycQueries';
import type { ClientClassificationSchemaType } from '@/libs/validations/investor/kyc';
import { ClientClassificationSchema } from '@/libs/validations/investor/kyc';

const KycPage = () => {
  const { data: investorSettings } = useInvestorSettings();
  const { t } = useTranslation('kyc');
  const router = useRouter();
  const { data: userKyc } = useCorporateKyc();

  const initialValues: ClientClassificationSchemaType = {
    clientHasAppointedCustodian: userKyc?.clientHasAppointedCustodian ?? '',
    clientShareholdersOrBeneficiariesHoldAmericanCitizenship:
      userKyc?.clientShareholdersOrBeneficiariesHoldAmericanCitizenship ?? '',
    investmentDocumentDestination: userKyc?.investmentDocumentDestination ?? '',
    profitDestination: userKyc?.profitDestination ?? '',
    proceedDestination: userKyc?.proceedDestination ?? '',
  } as ClientClassificationSchemaType;

  const { mutateAsync } = useKycMutation({
    onSuccess: () => {
      router.push('/investor/kyc/financial-condition');
    },
  });

  const formik = useForms({
    initialValues: initialValues as ClientClassificationSchemaType,
    validationSchema: ClientClassificationSchema,
    enableReinitialize: true,
    onSubmit: values => mutateAsync({ ...values }),
  });
  if (!investorSettings?.data) return null;

  return (
    <KycForm
      onSubmit={formik.handleSubmit}
      alert={!formik.isValid && formik.submitCount > 0}
    >
      <TermsCard className="mt-[16px]">
        {t('clientCapacityAndClassification')}
      </TermsCard>
      <Text className="text-xl font-bold text-brand-accent-500">
        {t('fatca')}
      </Text>
      <KycRadioGroup
        data-cy="is-shareholders-american"
        label={t('clientShareholdersOrBeneficiariesHoldAmericanCitizenship')}
        data={
          investorSettings?.data
            .clientShareholdersOrBeneficiariesHoldAmericanCitizenship
        }
        {...formik.getFieldProps(
          'clientShareholdersOrBeneficiariesHoldAmericanCitizenship',
        )}
        onChange={e => {
          formik.setFieldValue(
            'clientShareholdersOrBeneficiariesHoldAmericanCitizenship',
            e,
          );
        }}
        errorMessage={
          formik.touched
            .clientShareholdersOrBeneficiariesHoldAmericanCitizenship!
            ? (formik.errors
                .clientShareholdersOrBeneficiariesHoldAmericanCitizenship as keyof Resources['error'])
            : undefined
        }
      />
      <Text className="text-xl font-bold text-brand-accent-500">
        {t('custodian')}
      </Text>
      <KycRadioGroup
        data-cy="client-has-custodian"
        label={t('clientHasAppointedCustodian')}
        data={investorSettings?.data.clientHasAppointedCustodian}
        {...formik.getFieldProps('clientHasAppointedCustodian')}
        onChange={e => {
          formik.setFieldValue('clientHasAppointedCustodian', e);
        }}
        errorMessage={
          formik.touched.clientHasAppointedCustodian!
            ? (formik.errors
                .clientHasAppointedCustodian as keyof Resources['error'])
            : undefined
        }
      />
      <KycRadioGroup
        data-cy="where-investment-docs"
        label={t('WhereyouwantToDend')}
        data={investorSettings?.data.clientAndCustodian}
        {...formik.getFieldProps('investmentDocumentDestination')}
        onChange={e => {
          formik.setFieldValue('investmentDocumentDestination', e);
        }}
        errorMessage={
          formik.touched.investmentDocumentDestination!
            ? (formik.errors
                .investmentDocumentDestination as keyof Resources['error'])
            : undefined
        }
      />
      <KycRadioGroup
        data-cy="where-earnings"
        label={t('sendEarning')}
        data={investorSettings?.data.clientAndCustodian}
        {...formik.getFieldProps('profitDestination')}
        onChange={e => {
          formik.setFieldValue('profitDestination', e);
        }}
        errorMessage={
          formik.touched.profitDestination
            ? (formik.errors.profitDestination as keyof Resources['error'])
            : undefined
        }
      />
      <KycRadioGroup
        data-cy="where-results"
        label={t('SendResult')}
        data={investorSettings?.data.clientAndCustodian}
        {...formik.getFieldProps('proceedDestination')}
        onChange={e => {
          formik.setFieldValue('proceedDestination', e);
        }}
        errorMessage={
          formik.touched.proceedDestination
            ? (formik.errors.proceedDestination as keyof Resources['error'])
            : undefined
        }
      />
    </KycForm>
  );
};

export default KycPage;

export const getServerSideProps: GetServerSideProps = withKycQueries();
