import { Box, Button, Flex, Text, Title } from '@mantine/core';
import type { Resources } from 'i18next';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import AlertIcon from '@/icons/alert-icon';
import MinusIcon from '@/icons/minus-icon';
import PlusIcon from '@/icons/plus-icon';
import Input from '@/libs/components/Base/inputs/input';
import SelectInput from '@/libs/components/Base/inputs/select-input';
import KycCheckboxGroup from '@/libs/components/kyc/kyc-checkbox-group';
import { KycForm } from '@/libs/components/kyc/kyc-form';
import { KycAlertMessage } from '@/libs/components/kyc/KycAlertMessage';
import useCorporateKyc from '@/libs/hooks/kyc/useCorporateKyc';
import useIndividualKyc from '@/libs/hooks/kyc/useIndividualKyc';
import useKycMutation from '@/libs/hooks/kyc/useKycMutation';
import { useForms } from '@/libs/hooks/useForms';
import useInvestorSettings from '@/libs/hooks/useInvestorSettings';
import useUser from '@/libs/hooks/useUser';
import { withKycQueries } from '@/libs/services/investor/kyc/withKycQueries';
import type { FinancialSchemaType } from '@/libs/validations/investor/kyc';
import { FinancialSchema } from '@/libs/validations/investor/kyc';
import { mapSettingRecordsToSelectData } from '@/utils/kyc/mapSettingRecordsToSelectData';

const KycPage = () => {
  const { data: investorSettings } = useInvestorSettings();
  const { t } = useTranslation(['kyc', 'error']);
  const router = useRouter();
  const { user } = useUser();
  const corporateKycData = useCorporateKyc();
  const individualKycData = useIndividualKyc();

  const userKyc =
    user?.type === 'corporateInvestor'
      ? corporateKycData?.data
      : individualKycData?.data;

  const initialValues: FinancialSchemaType = {
    approximateAnnualIncome: userKyc?.approximateAnnualIncome ?? '',
    expectedAmountToInvestForEachOpportunity:
      userKyc?.expectedAmountToInvestForEachOpportunity ?? '',
    otherFinancialInformationAboutClient:
      userKyc?.otherFinancialInformationAboutClient ?? '',
    investmentExperienceYears: userKyc?.investmentExperienceYears ?? 0,
    netWorth: userKyc?.netWorth ?? '',
    investmentPortfolio: userKyc?.investmentPortfolio ?? [],
    investmentGoal: userKyc?.investmentGoal ?? [],
    annualIncome: userKyc?.annualIncome ?? '',
  };

  const { mutateAsync } = useKycMutation({
    onSuccess: () => {
      router.push('/investor/kyc/approval-and-declaration');
    },
  });

  const formik = useForms({
    initialValues,
    validationSchema: FinancialSchema,
    onSubmit: mutateAsync,
  });

  if (!investorSettings?.data) return null;
  return (
    <KycForm
      onSubmit={formik.handleSubmit}
      alert={!formik.isValid && formik.submitCount > 0}
    >
      <SelectInput
        data-cy-input="net-worth"
        namespace="kyc"
        className="mt-[16px]"
        label="netWorth"
        data={mapSettingRecordsToSelectData(
          investorSettings?.data.netWorthOptions ?? [],
        )}
        {...formik.getFieldProps('netWorth')}
        onChange={value => formik.setFieldValue('netWorth', value)}
        placeholder="enterTheAmount"
        errorMessage={
          formik.touched.netWorth
            ? (formik.errors.netWorth as keyof Resources['error'])
            : undefined
        }
      />
      <KycCheckboxGroup
        data-cy="portfolio-checkboxes"
        options={investorSettings.data.investmentPortfolioOptions}
        {...formik.getFieldProps('investmentPortfolio')}
        onChange={value => {
          formik.setFieldValue('investmentPortfolio', value);
        }}
        label="currentPortfolio"
        description={t('ChooseOne')}
        errorMessage={
          formik.touched.investmentPortfolio
            ? (formik.errors
                .investmentPortfolio as any as keyof Resources['error'])
            : undefined
        }
      />
      <KycCheckboxGroup
        data-cy="goal-checkboxes"
        options={investorSettings.data.investmentGoalOptions}
        {...formik.getFieldProps('investmentGoal')}
        onChange={value => {
          formik.setFieldValue('investmentGoal', value);
        }}
        label={t('YourGeneralInvestmentGoals')}
        description={t('ChooseOne')}
        errorMessage={
          formik.touched.investmentGoal
            ? (formik.errors.investmentGoal as any as keyof Resources['error'])
            : undefined
        }
      />
      <Box>
        <Flex justify="space-between" align="center">
          <Title className="flex-1 text-sm leading-[1.42857]">
            {t('numOfInvestment')}
          </Title>
          <Flex align="center" columnGap={9}>
            <Button
              data-cy-button="remove-experience-year"
              classNames={{ root: 'bg-[#D1CEC5]', section: 'px-0 mx-0' }}
              leftSection={<MinusIcon />}
              onClick={() => {
                formik.setFieldValue(
                  'investmentExperienceYears',
                  Math.max(0, formik.values.investmentExperienceYears! - 1),
                );
              }}
            />
            <Text
              data-cy="investment-experience-years"
              className="rounded-[8px] border border-solid border-[#EFF0F6] px-[24px] pb-[8px] pt-[12px] text-base leading-[1.25] text-brand-accent-500"
            >
              {formik.values.investmentExperienceYears}
            </Text>
            <Button
              data-cy-button="add-experience-year"
              classNames={{ section: 'px-0 mx-0' }}
              leftSection={<PlusIcon />}
              onClick={() => {
                formik.setFieldValue(
                  'investmentExperienceYears',
                  formik.values.investmentExperienceYears! + 1,
                );
              }}
            />
          </Flex>
        </Flex>
        {formik.errors.investmentExperienceYears &&
          formik.touched.investmentExperienceYears && (
            <Text className="mb-[8px] mt-[2px] flex items-center gap-[10px] text-sm font-normal text-[#1A1A1D]">
              <AlertIcon size="xs" />
              {t(
                `error:${
                  formik.errors
                    .investmentExperienceYears as keyof Resources['error']
                }`,
              )}
            </Text>
          )}
        {formik.values.investmentExperienceYears &&
        formik.values.investmentExperienceYears <= 1 ? (
          <KycAlertMessage message={t('certainYearExperienceRist') || ''} />
        ) : null}
      </Box>
      <SelectInput
        data-cy-input="appr-annual-income"
        namespace="kyc"
        label="approximateAnnualIncome"
        value={formik.values.approximateAnnualIncome}
        data={mapSettingRecordsToSelectData(
          investorSettings?.data.annualIncomeOptions ?? [],
        )}
        onChange={value =>
          formik.setFieldValue('approximateAnnualIncome', value)
        }
        placeholder="enterTheAmount"
        errorMessage={
          formik.touched.approximateAnnualIncome
            ? (formik.errors
                .approximateAnnualIncome as keyof Resources['error'])
            : undefined
        }
      />
      <SelectInput
        data-cy-input="expected-amount-per-opportunity"
        namespace="kyc"
        label="expectedAmountToInvestForEachOpportunity"
        value={formik.values.expectedAmountToInvestForEachOpportunity}
        data={mapSettingRecordsToSelectData(
          investorSettings?.data.annualIncomeOptions ?? [],
        )}
        onChange={value =>
          formik.setFieldValue(
            'expectedAmountToInvestForEachOpportunity',
            value,
          )
        }
        placeholder="enterTheAmount"
        errorMessage={
          formik.touched.expectedAmountToInvestForEachOpportunity
            ? (formik.errors
                .expectedAmountToInvestForEachOpportunity as keyof Resources['error'])
            : undefined
        }
      />
      <SelectInput
        data-cy-input="expected-annual-investments"
        namespace="kyc"
        label="ExpectedAmountInvestedAnnually"
        value={formik.values.annualIncome}
        data={mapSettingRecordsToSelectData(
          investorSettings?.data.annualIncomeOptions ?? [],
        )}
        onChange={value => formik.setFieldValue('annualIncome', value)}
        placeholder="enterTheAmount"
        errorMessage={
          formik.touched.annualIncome
            ? (formik.errors.annualIncome as keyof Resources['error'])
            : undefined
        }
      />
      <Input
        namespace="kyc"
        label="otherFinancialInformationAboutClient"
        {...formik.getFieldProps('otherFinancialInformationAboutClient')}
        placeholder="enterOtherInformation"
        errorMessage={
          formik.touched.otherFinancialInformationAboutClient
            ? (formik.errors
                .otherFinancialInformationAboutClient as keyof Resources['error'])
            : undefined
        }
      />
    </KycForm>
  );
};

export default KycPage;

export const getServerSideProps: GetServerSideProps = withKycQueries();
