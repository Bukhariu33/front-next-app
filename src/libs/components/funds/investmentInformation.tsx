import { useTranslation } from 'next-i18next';

import GrayCard, { GrayCardInfo } from './gray-card';

type Props = {
  dateTimeOfInvestment: string;
  fundName: string;
  numberOfUnits: number;
  totalWithoutFeesAndVAT: number;
  valueAddedTax: number;
  subscriptionFees: number;
  total: number;
};

const InvestmentInformation = ({
  dateTimeOfInvestment,
  fundName,
  numberOfUnits,
  subscriptionFees,
  total,
  totalWithoutFeesAndVAT,
  valueAddedTax,
}: Props) => {
  const { t } = useTranslation('common');

  return (
    <GrayCard>
      <span className="m-0 text-2xl font-bold">
        {t('investmentInformation')}
      </span>
      <GrayCardInfo
        name={t('dateTimeOfInvestment')}
        value={dateTimeOfInvestment}
      />
      <GrayCardInfo name={t('fundName')} value={fundName} />
      <GrayCardInfo name={t('numberOfUnits')} value={numberOfUnits} />
      <GrayCardInfo
        name={t('totalWithoutFeesAndVAT')}
        value={totalWithoutFeesAndVAT}
      />
      <GrayCardInfo name={t('valueAddedTax')} value={valueAddedTax} />
      <GrayCardInfo name={t('subscriptionFees')} value={subscriptionFees} />
      <GrayCardInfo name={t('total')} value={total} className="font-bold" />
    </GrayCard>
  );
};

export default InvestmentInformation;
