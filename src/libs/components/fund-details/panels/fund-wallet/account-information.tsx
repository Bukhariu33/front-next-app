import { Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import InfoCard from '@/libs/components/Base/Card/info-card';
import type { TransactionWithAccount } from '@/libs/types/base/fundWalletTransactionDetails';

import BankIcon from './BankIcon';

type Props = {
  accountInfo: TransactionWithAccount['account'];
};

const AccountInformation = ({ accountInfo }: Props) => {
  const { t } = useTranslation('fund');
  return (
    <>
      <Text className="text-lg font-medium">{t('toAccountInformation')}</Text>
      <BankIcon />
      <div className="flex flex-col gap-5">
        <InfoCard
          title={`${t(
            'accountNameOfSpecialPurposeEntitiesForThe',
          )} ${accountInfo?.name}`}
          value={accountInfo?.name}
          withCopy
          titleClassName="font-medium text-brand-accent-500"
          valueClassName="text-brand-primary-main"
        />
        <InfoCard
          title={`${t('accountNumberIban')}`}
          value={accountInfo?.iban}
          withCopy
          titleClassName="font-medium text-brand-accent-500"
          valueClassName="text-brand-primary-main"
        />
      </div>
    </>
  );
};

export default AccountInformation;
