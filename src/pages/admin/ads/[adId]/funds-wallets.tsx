import { modals } from '@mantine/modals';
import { useQuery } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { useRef, useState } from 'react';

import FundManagerWalletCard from '@/libs/admin/components/fund-managers/fund-manager-wallet-card';
import SubLayout from '@/libs/admin/components/fund-managers/sub-layout';
import Card from '@/libs/admin/section-card';
import {
  TransactionDetailsModalContent,
  TransactionDetailsModalHeader,
} from '@/libs/components/fund-details/panels/fund-wallet/transaction-details-modal';
import { EPermission } from '@/libs/configs/appConfig';
import { acl } from '@/libs/packages/acl';
import { ProtectedView } from '@/libs/packages/acl/components/ProtectedView';
import { getSSRQuery } from '@/libs/packages/queryBuilder';
import Table from '@/libs/packages/tables';
import { DateRangeFilter } from '@/libs/packages/tables/filters/Builders/DateRange';
import { StatusFilter } from '@/libs/packages/tables/filters/Builders/Status-Filter';
import { getAdminFundWalletQueryOptions } from '@/libs/services/admin/funds/fund-wallet';
import getFundsOptionsQueryOptions from '@/libs/services/admin/funds/funds-options';
import listFundsTransactionsQueryOptions from '@/libs/services/admin/funds/list-fund-transactions';
import { adminGetWalletTransactionDetails } from '@/libs/services/admin/funds/transaction-details';
import getTransactionStatusOptions from '@/utils/get-wallet-transaction-status-options';

const REQUIRE_PERMISSION: EPermission[] = [EPermission.ReadFundManagers];

const FundsWallets = ({
  fundManagerID,
  can,
}: {
  fundManagerID: string;
  can: Record<string, boolean>;
}) => {
  const [currentFundID, setCurrentFundID] = useState<string | null>(null);

  // OPTIONS
  const { data: options } = useQuery(
    getFundsOptionsQueryOptions.details(fundManagerID),
  );
  // WALLET
  const { data: fundWallet, isLoading } = useQuery({
    ...getAdminFundWalletQueryOptions.details(currentFundID),
  });

  const filters = useRef({
    statusFilter: new StatusFilter(getTransactionStatusOptions()),
    DateFilter: new DateRangeFilter('date-wallet'),
  }).current;

  const openTransactionDetailsModal = (transactionId: string) => {
    modals.open({
      size: '880px',
      title: (
        <TransactionDetailsModalHeader
          entityId={currentFundID!}
          transactionId={transactionId}
          transactionDetails={adminGetWalletTransactionDetails}
        />
      ),
      children: (
        <TransactionDetailsModalContent
          entityId={currentFundID!}
          transactionId={transactionId}
          transactionDetailsQueryOptions={adminGetWalletTransactionDetails}
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
    <SubLayout>
      {' '}
      <ProtectedView can={can} required={[EPermission.ReadFundManagers]}>
        <FundManagerWalletCard
          accountName={fundWallet?.bankAccount?.name!}
          amount={fundWallet?.walletBalance!}
          ibanNumber={fundWallet?.bankAccount?.iban!}
          options={options!}
          onFundChange={id => {
            setCurrentFundID(id);
          }}
          onClear={() => {
            setCurrentFundID(null);
          }}
          isLoading={!!currentFundID && isLoading}
        />
        {currentFundID && (
          <Card>
            <Table
              namespace="fund"
              headers={[
                'refId',
                'transaction',
                'transactionDate',
                'transactionType',
                'amount',
                'status',
              ]}
              cellsType={[
                transaction => openTransactionDetailsModal(transaction.id),
                'text',
                'date',
                'text',
                'money',
                'status',
              ]}
              queryOptions={listFundsTransactionsQueryOptions.details}
              args={[currentFundID]}
              filters={filters}
              hideFooter
            />
          </Card>
        )}
      </ProtectedView>
    </SubLayout>
  );
};

export default FundsWallets;

export const getServerSideProps = (async context => {
  const activeTab = (context.query.tab as string | undefined) ?? 'approved';
  const accessToken = context.req.cookies.access_token;

  if (!accessToken)
    return {
      props: {},
      redirect: { destination: '/admin/auth/sign-in', permanent: false },
    };
  const can = await acl.canAccessAll(accessToken, REQUIRE_PERMISSION);

  const fundManagerID = context.params?.fundManagerID as string;
  const queryOptions = getFundsOptionsQueryOptions.details(fundManagerID);
  const { props: ssrProps, notFound } = await getSSRQuery(
    queryOptions,
    accessToken,
  );
  return {
    props: {
      ...ssrProps,
      activeTab,
      fundManagerID,
      can,
    },
    notFound,
  };
}) satisfies GetServerSideProps;
