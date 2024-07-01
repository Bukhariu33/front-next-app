import { Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import InfoCard from '@/libs/components/Base/Card/info-card';
import type { TransactionWithInvestor } from '@/libs/types/base/fundWalletTransactionDetails';

type Props = {
  investorInformation: TransactionWithInvestor['investor'];
};

const InvestorInformation = ({ investorInformation }: Props) => {
  const { t } = useTranslation('fund');
  return (
    <div className="flex flex-col gap-6">
      <Text className="text-lg font-medium">{t('investorInformation')}</Text>
      <div className="flex gap-12">
        <InfoCard
          title={t('investorId')}
          value={investorInformation?.id}
          valueClassName="text-brand-primary-main"
          withCopy
        />
        <InfoCard
          title={t('investorName')}
          value={investorInformation?.name}
          valueClassName="text-brand-primary-main"
          withCopy
        />
        <InfoCard
          title={t('investorClassification')}
          value={investorInformation?.classification}
          valueClassName="text-brand-primary-main"
          withCopy
        />
      </div>
      <div className="flex gap-12">
        <InfoCard
          title={t('crNumber')}
          value={investorInformation?.crNumber}
          valueClassName="text-brand-primary-main"
          withCopy
        />
        <InfoCard
          title={t('email')}
          value={investorInformation?.email}
          valueClassName="text-brand-primary-main"
          withCopy
        />
        <InfoCard
          title={t('phoneNumber')}
          value={investorInformation?.phoneNumber}
          valueClassName="text-brand-primary-main"
          withCopy
        />
      </div>
    </div>
  );
};

export default InvestorInformation;
