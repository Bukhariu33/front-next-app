import { Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useQueries } from '@tanstack/react-query';
import { FormikProvider } from 'formik';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import AdditionalInfo from '@/libs/admin/components/funds/fund-form-elements/AdditionalInfo';
import FundAttachments from '@/libs/admin/components/funds/fund-form-elements/FundAttachments';
import FundImage from '@/libs/admin/components/funds/fund-form-elements/FundImage';
import FundInformation from '@/libs/admin/components/funds/fund-form-elements/FundInformation';
import FundTeam from '@/libs/admin/components/funds/fund-form-elements/FundTeam';
import GeneralInformation from '@/libs/admin/components/funds/fund-form-elements/GeneralInformation';
import SelectFundLocation from '@/libs/admin/components/funds/fund-form-elements/SelectFundLocation';
import Header from '@/libs/admin/layout/Header';
import Button from '@/libs/components/Base/Buttons/Button';
import TabToggle from '@/libs/components/Base/tab-toggle';
import { EPermission } from '@/libs/configs/appConfig';
import { axiosInternal } from '@/libs/configs/axios';
import { useMutation } from '@/libs/hooks/use-mutation';
import { useForms } from '@/libs/hooks/useForms';
import { acl } from '@/libs/packages/acl';
import { ProtectedView } from '@/libs/packages/acl/components/ProtectedView';
import { getSSRQuery } from '@/libs/packages/queryBuilder';
import { getAdminFundDetailsQueryOptions } from '@/libs/services/admin/funds/fundDetails';
import listFundsQueryOptions from '@/libs/services/admin/funds/list-funds';
import type { FrequentPayoutFundsValidationType } from '@/libs/validations/admin/fund-form-validation';
import { FrequentPayoutFundsValidationSchema } from '@/libs/validations/admin/fund-form-validation';

const REQUIRE_PERMISSION: EPermission[] = [EPermission.UpdateFund];

interface EditFundProps {
  fundId: string;
  can: Record<string, boolean>;
}

export default function EditFund({ fundId, can }: EditFundProps) {
  const [{ data: fundDetailsEn }, { data: fundDetailsAr }] = useQueries({
    queries: [
      getAdminFundDetailsQueryOptions.details(fundId, 'en'),
      getAdminFundDetailsQueryOptions.details(fundId, 'ar'),
    ],
  });
  const { t } = useTranslation('fund');
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: async (values: FrequentPayoutFundsValidationType) => {
      const v = values;
      v.subscriptionFeesPercentage = values.subscriptionFeesPercentage / 100;
      v.durationInMonths = Number(values.durationInMonths);
      await axiosInternal.patch(`/admin/funds/${fundId}`, values);
    },
    onSuccess: () => {
      notifications.show({
        title: t('success'),
        message: t('fundUpdatedSuccess'),
      });
      router.push('/admin/funds');
    },
    revalidateOnSettled: true,
    queryOptions: listFundsQueryOptions,
  });

  const options = [
    { value: 'frequentPayoutFunds', label: t('frequentPayoutFunds') },
    { value: 'maturityPayoutFunds', label: t('maturityPayoutFunds') },
  ];

  const initialValues = {
    nameEn: fundDetailsEn?.name,
    nameAr: fundDetailsAr?.name,
    assetsClass: fundDetailsAr?.assetsClass,
    fundManagerId: fundDetailsAr?.fundManagerId,
    type: fundDetailsAr?.type,
    city: fundDetailsAr?.city,
    coverage: fundDetailsAr?.coverage,
    minCoverage: fundDetailsAr?.minCoverage,
    minInvestment: fundDetailsAr?.minInvestment,
    investmentStartingDate: fundDetailsAr?.investmentStartingDate
      ? new Date(fundDetailsAr?.investmentStartingDate)
      : '',
    investmentEndingDate: fundDetailsAr?.investmentEndingDate
      ? new Date(fundDetailsAr?.investmentEndingDate)
      : '',
    expectedRoi: fundDetailsAr?.expectedRoi,
    durationInMonths: fundDetailsAr?.durationInMonths.toString(),
    unitPrice: fundDetailsAr?.unitPrice,
    units: fundDetailsAr?.units,
    subscriptionFeesPercentage: !Number.isNaN(fundDetailsAr?.fees.subscription)
      ? (fundDetailsAr?.fees.subscription || 0) * 100
      : '',
    distributionFees: fundDetailsAr?.fees.distribution,
    riskMessageEn: fundDetailsEn?.riskMessage,
    riskMessageAr: fundDetailsAr?.riskMessage,
    generalInformationEn: fundDetailsEn?.generalInformation,
    generalInformationAr: fundDetailsAr?.generalInformation,
    financialInformationEn: fundDetailsEn?.financialInformation,
    financialInformationAr: fundDetailsAr?.financialInformation,
    updatesEn: fundDetailsEn?.updates,
    updatesAr: fundDetailsAr?.updates,
    imageDimension: '',
    fundImages: fundDetailsAr?.fundImages ?? [],
    attachments: fundDetailsAr?.attachments ?? [],
    location: {},
    fundTeam: fundDetailsAr?.fundTeam ?? [
      {
        name: '',
        image: '',
        position: '',
      },
    ],
    paymentFrequency: fundDetailsEn?.paymentFrequency,
  } as any as FrequentPayoutFundsValidationType;

  const formik = useForms({
    initialValues,
    validationSchema: FrequentPayoutFundsValidationSchema,
    enableReinitialize: true,
    onSubmit: mutateAsync,
  });

  return (
    <ProtectedView can={can} required={[EPermission.UpdateFund]}>
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
                  ? 'maturityPayoutFunds'
                  : 'frequentPayoutFunds'
              }
              onChange={value => {
                const v =
                  value === 'maturityPayoutFunds' ? 'onMaturity' : 'monthly';
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
            <FundAttachments mode="edit" />
            <GeneralInformation />
            <FundImage mode="edit" />
            {formik.values.assetsClass === 'realEstateDevelopmentFund' && (
              <SelectFundLocation />
            )}
            <FundTeam mode="edit" />
            <AdditionalInfo />
            <Button
              namespace="fund"
              text="update"
              disabled={formik.isSubmitting || !formik.dirty}
              data-cy-button="update-fund"
              classNames={{ root: 'ml-auto w-[min(100%,17.25rem)]' }}
              type="submit"
            />
          </form>
        </Stack>
      </FormikProvider>
    </ProtectedView>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const fundId = context.params?.fundId;
  const accessToken = context.req.cookies.access_token;

  if (!accessToken)
    return {
      props: {},
      redirect: { destination: '/admin/auth/sign-in', permanent: false },
    };
  const can = await acl.canAccessAll(accessToken, REQUIRE_PERMISSION);

  const queryOptions = getAdminFundDetailsQueryOptions.details(
    fundId as string,
    'en',
  );
  // fetch both languages to fill the form ar and en
  getAdminFundDetailsQueryOptions.details(fundId as string, 'ar');

  const { props: ssrProps, notFound } = await getSSRQuery(
    queryOptions,
    accessToken,
  );

  return {
    props: {
      ...ssrProps,
      fundId,
      can,
    },
    notFound,
  };
};
