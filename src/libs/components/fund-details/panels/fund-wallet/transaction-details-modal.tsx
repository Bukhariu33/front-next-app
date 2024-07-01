import { ActionIcon, Loader, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';

import InfoCard from '@/libs/components/Base/Card/info-card';
import StatusChip from '@/libs/components/Base/status-chip/status-chip';
import { CancelIcon } from '@/libs/icons/cancel-icon';
import type { QueryOptionsReturnType } from '@/libs/packages/queryBuilder';
import type {
  TransactionDetails,
  TransactionWithAccount,
  TransactionWithInvestor,
} from '@/libs/types/base/fundWalletTransactionDetails';
import type { Status } from '@/libs/types/status';
import { cn } from '@/utils/cn';

import AccountInformation from './account-information';
import InvestorInformation from './investor-information';

interface TransactionDetailsModalHeaderProps {
  /** versatile unique identifier (UUID) representing either an investor or a fund,
   * This will be passed as the first argument to the passed `transactionDetails` service prop
   */
  entityId: string;

  /** This will be passed as the second argument to the passed `transactionDetails` service prop */
  transactionId: string;

  transactionDetails: QueryOptionsReturnType<
    TransactionDetails,
    [entityId: string, transactionId: string]
  >;
}

export const TransactionDetailsModalHeader = ({
  entityId,
  transactionId,
  transactionDetails,
}: TransactionDetailsModalHeaderProps) => {
  const { t } = useTranslation('fund');
  const { data: fundDetails, isLoading } = useQuery<TransactionDetails>(
    transactionDetails.details(entityId, transactionId),
  );

  return (
    <>
      <div className="mt-[-0.5rem] text-right rtl:text-left">
        <ActionIcon
          variant="subtle"
          color="gray"
          onClick={() => {
            modals.closeAll();
          }}
        >
          <CancelIcon />{' '}
        </ActionIcon>
      </div>
      <div className="flex items-center justify-between">
        {isLoading ? null : (
          <>
            <InfoCard
              title={t('refId')}
              value={fundDetails?.code}
              withCopy
              titleClassName="font-medium text-brand-accent-500"
              valueClassName="text-brand-primary-main"
            />
            <StatusChip status={fundDetails?.status as Status} />
          </>
        )}
      </div>
    </>
  );
};

const Card = ({
  title,
  value,
  wrapperClassName,
}: {
  title: string;
  value: string | number;
  wrapperClassName?: string;
}) => (
  <div
    className={cn(
      'flex flex-col justify-center gap-[10px] rounded-[10px] bg-[#F5F7F9] px-12 py-2 text-center',
      wrapperClassName,
    )}
  >
    <Text className="text-sm font-medium">{title}</Text>
    <Text className="text-lg font-medium">{value}</Text>
  </div>
);

const isTransactionWithAccount = (
  transaction: TransactionDetails,
): transaction is TransactionWithAccount => transaction.type === 'withdrawal';

const isTransactionWithInvestorInfo = (
  transaction: TransactionDetails,
): transaction is TransactionWithInvestor => transaction.type !== 'withdrawal';

interface TransactionDetailsModalContentProps {
  /** versatile unique identifier (UUID) representing either an investor or a fund,
   * This will be passed as the first argument to the passed `transactionDetails` service prop
   */
  entityId: string;

  /** This will be passed as the second argument to the passed `transactionDetails` service prop */
  transactionId: string;
  transactionDetailsQueryOptions: QueryOptionsReturnType<
    TransactionDetails,
    [entityId: string, transactionId: string]
  >;
}

export const TransactionDetailsModalContent = ({
  entityId,
  transactionId,
  transactionDetailsQueryOptions,
}: TransactionDetailsModalContentProps) => {
  const { t } = useTranslation(['fund', 'common']);

  const { data: transactionDetails, isLoading } = useQuery<TransactionDetails>(
    transactionDetailsQueryOptions.details(entityId, transactionId),
  );

  if (isLoading) {
    return (
      <div className="flex w-full justify-center py-6">
        <Loader size="100px" />
      </div>
    );
  }

  if (!transactionDetails)
    return (
      <div className="flex w-full justify-center py-6">
        <Text className="text-2xl font-medium">
          {t('noDataFound', { ns: 'common' })}
        </Text>
      </div>
    );
  return (
    <div className="flex flex-col gap-6 py-4">
      <div className="flex justify-between">
        <InfoCard
          title={t('paymentMethod')}
          value={transactionDetails?.paymentMethod}
          rootClassName="w-2/5"
          valueClassName="text-xl font-medium"
        />
        <InfoCard
          title={t('transactionMessage')}
          value={transactionDetails?.message}
          withDivider
          rootClassName="w-3/5"
          valueClassName="text-xl font-medium"
        />
      </div>
      <div className="flex justify-between gap-5 border-solid border-transparent border-b-[#D9D9D9] pb-5">
        <Card
          title={t('dateTimeOfTheTransaction')}
          value={transactionDetails?.createdAt}
          wrapperClassName="flex-[1.7]"
        />
        <Card
          title={t('amount')}
          value={transactionDetails?.amount}
          wrapperClassName="flex-1"
        />
        <Card
          title={t('transactionType')}
          value={transactionDetails?.type}
          wrapperClassName="flex-1"
        />
      </div>
      {isTransactionWithAccount(transactionDetails) ? (
        <AccountInformation accountInfo={transactionDetails?.account} />
      ) : null}
      {isTransactionWithInvestorInfo(transactionDetails) && (
        <InvestorInformation
          investorInformation={transactionDetails?.investor}
        />
      )}
    </div>
  );
};
