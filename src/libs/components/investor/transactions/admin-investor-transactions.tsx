import { Portal } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useRef } from 'react';

import {
  TransactionDetailsModalContent,
  TransactionDetailsModalHeader,
} from '@/libs/components/fund-details/panels/fund-wallet/transaction-details-modal';
import type {
  FundWalletTransactionDetailsQueryOptions,
  FundWalletTransactionQueryOptions,
} from '@/libs/components/fund-details/panels/fund-wallet/type';
import Table from '@/libs/packages/tables';
import { DateRangeFilter } from '@/libs/packages/tables/filters/Builders/DateRange';
import { StatusFilter } from '@/libs/packages/tables/filters/Builders/Status-Filter';
import getTransactionStatusOptions from '@/utils/get-wallet-transaction-status-options';

import Button from '../../Base/Buttons/Button';
import AdminInvestorWalletCard from './admin-investor-wallet';
import TransactionCreditDebitForm from './credit-debit-form';

type AdminInvestorTransactionsProps = {
  adminInvestorTransactionsQueryOptions: FundWalletTransactionQueryOptions;
  adminInvestorwalletTransactionDetails: FundWalletTransactionDetailsQueryOptions;
};

const AdminInvestorTransactions = ({
  adminInvestorTransactionsQueryOptions,
  adminInvestorwalletTransactionDetails,
}: AdminInvestorTransactionsProps) => {
  const { t } = useTranslation('admin-common');
  const { query } = useRouter();
  const filters = useRef({
    statusFilter: new StatusFilter(getTransactionStatusOptions()),
    DateFilter: new DateRangeFilter(),
  }).current;

  const openTransactionDetailsModal = (transactionId: string) => {
    modals.open({
      size: '880px',
      title: (
        <TransactionDetailsModalHeader
          transactionId={transactionId}
          transactionDetails={adminInvestorwalletTransactionDetails}
          entityId={query.investorID as string}
        />
      ),
      children: (
        <TransactionDetailsModalContent
          transactionId={transactionId}
          transactionDetailsQueryOptions={adminInvestorwalletTransactionDetails}
          entityId={query.investorID as string}
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

  const openManualCreditDebitModal = () => {
    modals.open({
      size: '600px',
      title: t('creditDebitTitle'),
      children: <TransactionCreditDebitForm />,
      centered: true,
      withCloseButton: true,
      classNames: {
        title: 'text-2xl font-bold',
        content: 'px-2',
      },
    });
  };

  return (
    <div className="my-8 mt-[0rem]">
      <AdminInvestorWalletCard />
      <Portal target="#portal-custom-button-in-filter">
        <Button
          namespace="admin-common"
          text="creditDebitTransaction"
          variant="plain-white"
          onClick={() => {
            openManualCreditDebitModal();
          }}
        />
      </Portal>
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
        queryOptions={adminInvestorTransactionsQueryOptions.details}
        args={[query.investorID as string]}
        filters={filters}
        hideFooter
      />
    </div>
  );
};

export default AdminInvestorTransactions;
