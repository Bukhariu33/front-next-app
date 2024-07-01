import { useTranslation } from 'next-i18next';

import InfoCard from '@/libs/components/Base/Card/info-card';
import type { FundWalletDetails } from '@/libs/types/fund-managers/funds/fund-wallet-details';

import BankIcon from './BankIcon';

type DepositModalProps = {
  depositAccountInfo: FundWalletDetails['depositInfo'];
};

const DepositModal = ({ depositAccountInfo }: DepositModalProps) => {
  const { t } = useTranslation('fund');
  return (
    <div className="flex flex-col gap-5 py-4">
      <div className="flex flex-col gap-3 py-3">
        <BankIcon />
        <InfoCard
          title={`${t('collectionAccountNameFor')} ${
            depositAccountInfo.fundName
          }`}
          value={depositAccountInfo.fundName}
          withCopy
          titleClassName="font-medium text-brand-accent-500"
          valueClassName="text-brand-primary-main"
        />
        <InfoCard
          title={`${t('accountNumberForTransfersFrom')} ${
            depositAccountInfo.name
          }`}
          value={depositAccountInfo.iban}
          withCopy
          titleClassName="font-medium text-brand-accent-500"
          valueClassName="text-brand-primary-main"
        />
        <InfoCard
          title={`${t('ibanForTransfersFromOtherBanks')}`}
          value={depositAccountInfo.otherBanksIban}
          withCopy
          titleClassName="font-medium text-brand-accent-500"
          valueClassName="text-brand-primary-main"
        />
      </div>
    </div>
  );
};

export default DepositModal;
