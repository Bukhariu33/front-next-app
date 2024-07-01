import { Divider, Loader, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import ChevronIcon from '@/icons/chevron-icon';
import type { QueryOptionsReturnType } from '@/libs/packages/queryBuilder';
import type { FundInvestorDetails } from '@/libs/types/interface/fund/investor-data';

import Button from '../Base/Buttons/Button';
import {
  CancelInvestmentRequestModelContent,
  CancelInvestmentRequestModelTitle,
} from './CancelRequestModal';
import InvestmentInformation from './investmentInformation';
import PersonalInformation from './personal-information';

type Props = {
  investorId: string;
  fundInvestorQueryOptions: QueryOptionsReturnType<
    FundInvestorDetails,
    [investorId: string, fundId: string]
  >;
};

export const InvestorInformationModalHeader = ({
  investorId,
  fundInvestorQueryOptions,
}: Props) => {
  const { t } = useTranslation('common');
  const { query } = useRouter();

  const { data, isLoading } = useQuery(
    fundInvestorQueryOptions.details(investorId, query.fundId as string),
  );

  return (
    <div className=" mt-6 flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <Text
          className="flex cursor-pointer items-center"
          onClick={() => modals.close('investorInfo')}
        >
          <ChevronIcon className="mr-3 rotate-90 stroke-black rtl:-rotate-90" />
        </Text>
        <Divider orientation="vertical" className="border-brand-primary-main" />
        <p className="m-0 ml-2 text-4xl font-bold leading-8">
          {t('investorInformation')}
        </p>
      </div>
      {!isLoading ? (
        <Button
          namespace="common"
          text="cancelInvestmentRequest"
          variant="outlined-error"
          onClick={() => {
            modals.open({
              modalId: 'CancelModal',
              children: (
                <CancelInvestmentRequestModelContent
                  fundName={data?.investmentInformation.fundName as string}
                  fundId={data?.id as string}
                  investorName={
                    data?.personalInformation.investorName as string
                  }
                  investorId={data?.personalInformation.investorId as string}
                />
              ),
              title: <CancelInvestmentRequestModelTitle />,
              classNames: {
                title: 'w-full px-6',
                body: 'px-10 py-4',
              },
              size: '800px',
              withCloseButton: false,
            });
          }}
        />
      ) : null}
    </div>
  );
};

export const InvestorInformationModalContent = ({
  investorId,
  fundInvestorQueryOptions,
}: Props) => {
  const { query } = useRouter();

  const { data, isLoading } = useQuery(
    fundInvestorQueryOptions.details(investorId, query.fundId as string),
  );
  return (
    <div className="mx-auto flex flex-col gap-6 rounded-2xl bg-white p-6">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader size={80} color="black" />
        </div>
      ) : (
        <>
          <PersonalInformation
            birthDate={data?.personalInformation.birthDate as string}
            email={data?.personalInformation.email as string}
            idNumber={data?.personalInformation.idNumber as string}
            investorName={data?.personalInformation.investorName as string}
            nationalAddress={
              data?.personalInformation.nationalAddress as string
            }
            nationality={data?.personalInformation.nationality as string}
            phoneNumber={data?.personalInformation.phoneNumber as string}
          />
          <InvestmentInformation
            dateTimeOfInvestment={
              data?.investmentInformation.dateTimeOfInvestment as string
            }
            fundName={data?.investmentInformation.fundName as string}
            numberOfUnits={data?.investmentInformation.numberOfUnits as number}
            totalWithoutFeesAndVAT={
              data?.investmentInformation
                .totalWithoutSubscriptionFeesAndValueAddedTax as number
            }
            subscriptionFees={
              data?.investmentInformation.subscriptionFees as number
            }
            valueAddedTax={data?.investmentInformation.valueAddedTax as number}
            total={data?.investmentInformation.total as number}
          />
        </>
      )}
    </div>
  );
};
