import useLinkTabs from '@/libs/hooks/use-link-tabs/use-link-tabs';
import { getFundManagerFundAnalysis } from '@/libs/services/fund-manager/funds/fund-analysis';
import fundReportQueryOptions, {
  uploadReport,
} from '@/libs/services/fund-manager/funds/fund-report';
import fundWalletTransactionsQueryOptions from '@/libs/services/fund-manager/funds/fund-wallet-transactions';
import { fundManagerTransactionDetailsQueryOptions } from '@/libs/services/fund-manager/funds/transaction-details';

import type { FundDetailsProps } from '../FundDetails';
import FundAnalysis from '../panels/fund-analysis';
import FundDetailsInformation from '../panels/fund-details-information';
import FundWallet from '../panels/fund-wallet';
import MyFund from '../panels/my-fund';

function FundManagerFundDetailsLayout({
  fund,
  withInvestorsPage,
}: FundDetailsProps) {
  const View = useLinkTabs({
    namespace: 'common',
    tabs: ['fundsInformation', 'myFund', 'fundAnalysis', 'fundWallet'],
    defaultTab: 'fundsInformation',
    type: 'top',
    panels: {
      fundsInformation: <FundDetailsInformation fund={fund} />,
      fundWallet: (
        <FundWallet
          fundWalletTransactionsQueryOptions={
            fundWalletTransactionsQueryOptions
          }
          walletTransactionDetails={fundManagerTransactionDetailsQueryOptions}
        />
      ),
      myFund: (
        <MyFund
          fundReportQueryOptions={fundReportQueryOptions}
          uploadReport={uploadReport}
          withInvestorsPage={withInvestorsPage}
        />
      ),
      fundAnalysis: (
        <FundAnalysis
          fundId={fund?.id}
          fundAnalysisQueryOptions={getFundManagerFundAnalysis}
        />
      ),
    },
  });
  return <div className="w-full @container">{View}</div>;
}

export default FundManagerFundDetailsLayout;
