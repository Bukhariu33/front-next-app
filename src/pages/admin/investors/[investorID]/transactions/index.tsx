import SubLayout from '@/libs/admin/components/fund-managers/sub-layout';
import AdminInvestorTransactions from '@/libs/components/investor/transactions/admin-investor-transactions';
import { adminInvestorGetWalletTransactionDetails } from '@/libs/services/admin/investors/fund-wallet/investor-transaction-details';
import adminInvestorTransactionsQueryOptions from '@/libs/services/admin/investors/fund-wallet/investor-transactions';

function AdminInvestorTransactionsPage() {
  return (
    <SubLayout>
      <AdminInvestorTransactions
        adminInvestorTransactionsQueryOptions={
          adminInvestorTransactionsQueryOptions
        }
        adminInvestorwalletTransactionDetails={
          adminInvestorGetWalletTransactionDetails
        }
      />{' '}
    </SubLayout>
  );
}

export default AdminInvestorTransactionsPage;
