import { modals } from '@mantine/modals';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useRef } from 'react';

import Table from '@/libs/packages/tables';
import { DateRangeFilter } from '@/libs/packages/tables/filters/Builders/DateRange';
import { StatusFilter } from '@/libs/packages/tables/filters/Builders/Status-Filter';
import getTransactionStatusOptions from '@/utils/get-wallet-transaction-status-options';

import FundWalletCard from './fund-wallet-card';
import {
  TransactionDetailsModalContent,
  TransactionDetailsModalHeader,
} from './transaction-details-modal';
import type {
  FundWalletTransactionDetailsQueryOptions,
  FundWalletTransactionQueryOptions,
} from './type';

type FundWalletProps = {
  fundWalletTransactionsQueryOptions: FundWalletTransactionQueryOptions;
  walletTransactionDetails: FundWalletTransactionDetailsQueryOptions;
};

const FundWallet = ({
  fundWalletTransactionsQueryOptions,
  walletTransactionDetails,
}: FundWalletProps) => {
  const { t } = useTranslation('fund');
  const router = useRouter();
  const { fundId } = router.query as { fundId: string };

  const filters = useRef({
    statusFilter: new StatusFilter(getTransactionStatusOptions()),
    DateFilter: new DateRangeFilter(),
  }).current;

  const openTransactionDetailsModal = (transactionId: string) => {
    modals.open({
      size: '880px',
      title: (
        <TransactionDetailsModalHeader
          entityId={fundId}
          transactionId={transactionId}
          transactionDetails={walletTransactionDetails}
        />
      ),
      children: (
        <TransactionDetailsModalContent
          entityId={fundId}
          transactionId={transactionId}
          transactionDetailsQueryOptions={walletTransactionDetails}
        />
      ),
      centered: true,
      withCloseButton: false,
      classNames: {
        title: 'w-full',
        content: 'px-2',
      },
    });
  };

  return (
    <div className="my-8">
      <FundWalletCard />
      <div className="flex flex-col gap-4">
        <h3 className="text-3xl font-bold">{t('transactions')}</h3>
        <div className="rounded-2xl bg-white p-3 pb-0 shadow-sm">
          <Table
            namespace="fund"
            headers={[
              'refId',
              'transaction',
              'transactionDate',
              'transactionType',
              'amount',
              'status',
              'description',
            ]}
            cellsType={[
              transaction => openTransactionDetailsModal(transaction.id),
              'text',
              'date',
              'text',
              'money',
              'status',
              'text',
            ]}
            queryOptions={fundWalletTransactionsQueryOptions.details}
            args={[fundId]}
            filters={filters}
            hideFooter
          />
        </div>
      </div>
    </div>
  );
};

export default FundWallet;
