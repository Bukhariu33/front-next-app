import { Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { FormikProvider } from 'formik';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import AdditionalInfo from '@/libs/admin/components/funds/fund-form-elements/AdditionalInfo';
import FundInformation from '@/libs/admin/components/funds/fund-form-elements/FundInformation';
import FundTeam from '@/libs/admin/components/funds/fund-form-elements/FundTeam';
import GeneralInformation from '@/libs/admin/components/funds/fund-form-elements/GeneralInformation';
import SelectFundLocation from '@/libs/admin/components/funds/fund-form-elements/SelectFundLocation';
import Header from '@/libs/admin/layout/Header';
import Button from '@/libs/components/Base/Buttons/Button';
import TabToggle from '@/libs/components/Base/tab-toggle';
import { axiosInternal } from '@/libs/configs/axios';
import { useMutation } from '@/libs/hooks/use-mutation';
import { useForms } from '@/libs/hooks/useForms';
import listFundsQueryOptions from '@/libs/services/admin/funds/list-funds';
import type { FrequentPayoutFundsValidationType } from '@/libs/validations/admin/fund-form-validation';
import { FrequentPayoutFundsValidationSchema } from '@/libs/validations/admin/fund-form-validation';

import FundAttachments from './FundAttachments';
import FundImage from './FundImage';

export default function FundForm() {
  const { t } = useTranslation('fund');
  const router = useRouter();
  const options = [
    { value: 'frequentPayoutFunds', label: t('frequentPayoutFunds') },
    { value: 'onMaturity', label: t('maturityPayoutFunds') },
  ];
  const { mutateAsync } = useMutation({
    mutationFn: async (values: FrequentPayoutFundsValidationType) => {
      const v = values;
      v.subscriptionFeesPercentage = values.subscriptionFeesPercentage / 100;
      v.durationInMonths = Number(values.durationInMonths);
      await axiosInternal.post('/admin/funds', values);
    },
    onSuccess: () => {
      notifications.show({
        title: t('success'),
        message: t('fundCreatedSuccessfully'),
      });
      router.push('/admin/funds');
    },
    revalidateOnSettled: true,
    queryOptions: listFundsQueryOptions,
  });

  const initialValues = {
    nameEn: '',
    nameAr: '',
    assetsClass: '',
    fundManagerId: '',
    type: '',
    city: '',
    coverage: '',
    minCoverage: '',
    minInvestment: '',
    investmentStartingDate: '',
    investmentEndingDate: '',
    expectedRoi: '',
    durationInMonths: 0,
    unitPrice: '',
    units: '',
    subscriptionFeesPercentage: '',
    distributionFees: '',
    riskMessageEn: '',
    riskMessageAr: '',
    generalInformationEn: '',
    generalInformationAr: '',
    financialInformationEn: '',
    financialInformationAr: '',
    updatesEn: '',
    updatesAr: '',
    imageDimension: '',
    fundImages: [],
    attachments: [],
    location: {},
    fundTeam: [
      {
        name: '',
        position: '',
        image: '',
      },
    ],
    paymentFrequency: 'onMaturity',
  } as any as FrequentPayoutFundsValidationType;

  const formik = useForms({
    initialValues,
    validationSchema: FrequentPayoutFundsValidationSchema,
    enableReinitialize: true,
    onSubmit: mutateAsync,
  });

  return (
    <FormikProvider value={formik}>
      <Stack className="gap-0 @container">
        <Header title={t('createFundCard')} backLink="/admin/funds" />
        <form
          className="flex w-[min(100%,913px)] flex-col gap-[30px]"
          onSubmit={formik.handleSubmit}
        >
          <TabToggle
            options={options}
            value={
              formik.values.paymentFrequency === 'onMaturity'
                ? 'onMaturity'
                : 'frequentPayoutFunds'
            }
            onChange={value => {
              const v = value === 'maturityPayoutFunds' ? 'onMaturity' : '';
              formik.setFieldValue('paymentFrequency', v);
            }}
            className="mx-auto sm:mt-[24px] md:mt-[32px] [@media(min-width:2800px)]:mt-[80px]"
            labelClassName="text-base font-medium leading-[1.25] py-[1.06rem]"
            indicatorClassName="bg-brand-primary-main"
          />
          <FundInformation
            type={
              formik.values.paymentFrequency === 'onMaturity'
                ? 'maturityPayoutFunds'
                : 'frequentPayoutFunds'
            }
          />
          <FundAttachments />
          <GeneralInformation />
          <FundImage />
          {formik.values.assetsClass === 'realEstateDevelopmentFund' && (
            <SelectFundLocation />
          )}
          <FundTeam />
          <AdditionalInfo />
          <Button
            namespace="fund"
            text="create"
            disabled={formik.isSubmitting}
            data-cy-button="create-fund"
            classNames={{ root: 'ml-auto w-[min(100%,17.25rem)]' }}
            type="submit"
          />
        </form>
      </Stack>
    </FormikProvider>
  );
}
