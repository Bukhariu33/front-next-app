import { Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import InvestorInvestmentDetailsLayout from '@/libs/components/investor/funds/investor-invest-details-layout';
import InvestAcknowledgment from '@/libs/components/investor/funds/investor-invest-terms-condition';
import ConfirmPayment from '@/libs/components/investor/invest/confirm-payment';
import InvestForm from '@/libs/components/investor/invest/invest-form';
import { useInvest } from '@/libs/hooks/use-invest/use-invest';
import useUser from '@/libs/hooks/useUser';
import { getSSRQuery } from '@/libs/packages/queryBuilder';
import { getInvestorFundDetails } from '@/libs/services/investor/funds/fundDetails';

interface InvestProps {
  fundId: string;
}
function Invest({ fundId }: InvestProps) {
  const [state, setState] = useState({
    investmentUnits: 1,
    acknowledgement: false,
  });
  const [currentStep, setCurrentStep] = useState<'One' | 'Two' | 'Three'>(
    'One',
  );
  const { user } = useUser();
  const { t } = useTranslation();
  const { data: fund } = useQuery(
    getInvestorFundDetails.details(fundId, user?.id!),
  );

  const { invest, checkIsKycCompletedOrThrow } = useInvest({ fund });

  useEffect(() => {
    checkIsKycCompletedOrThrow();
  }, [currentStep]);
  if (!fund) return null;

  const view = {
    stepOne: {
      title: t('investmentData'),
      component: (
        <InvestForm
          fund={fund}
          initialCount={state.investmentUnits}
          onSubmit={count => {
            setCurrentStep('Two');
            setState({
              ...state,
              investmentUnits: count,
            });
          }}
        />
      ),
    },
    stepTwo: {
      title: t('acknowledgment'),
      component: (
        <InvestAcknowledgment
          back={() => {
            setCurrentStep('One');
          }}
          onSubmit={agreed => {
            setCurrentStep('Three');
            setState({
              ...state,
              acknowledgement: agreed,
            });
          }}
        />
      ),
    },

    stepThree: {
      title: t('payment'),
      component: (
        <ConfirmPayment
          count={state.investmentUnits}
          fund={fund}
          onSubmit={() => {
            invest(state.investmentUnits);
          }}
        />
      ),
    },
  };

  return (
    <div className="p-4">
      <Text className="mb-8 text-2xl font-bold">
        {view[`step${currentStep}`].title}
      </Text>
      <InvestorInvestmentDetailsLayout
        fundId={fundId}
        showWallet={currentStep === 'One'}
      >
        {view[`step${currentStep}`].component}
      </InvestorInvestmentDetailsLayout>
    </div>
  );
}

export const getServerSideProps = (async context => {
  const session = await getSession(context);
  const accessToken = context.req.cookies.access_token;
  const fundId = context.query.fundId as string;

  const queryOptions = getInvestorFundDetails.details(
    fundId,
    session?.user?.id!,
  );

  const { props: ssrProps, notFound } = await getSSRQuery(
    queryOptions,
    accessToken,
  );

  return {
    props: {
      ...ssrProps,
      fundId,
    },
    notFound,
  };
}) satisfies GetServerSideProps;

export default Invest;
