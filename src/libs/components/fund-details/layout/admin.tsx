import useDownloadKyc from '@/libs/hooks/admin/funds/use-download-kyc';
import useLinkTabs from '@/libs/hooks/use-link-tabs/use-link-tabs';
import DownloadIcon from '@/libs/icons/download-icon';
import { getAdminFundAnalysis } from '@/libs/services/admin/funds/fund-analysis';
import adminFundReportQueryOptions, {
  uploadReport,
} from '@/libs/services/admin/funds/fund-report';
import adminFundWalletTransactionsQueryOptions from '@/libs/services/admin/funds/fund-wallet-transactions';
import adminListFundInvestorsQueryOptions from '@/libs/services/admin/funds/list-investors';
import { adminGetWalletTransactionDetails } from '@/libs/services/admin/funds/transaction-details';

import Button from '../../Base/Buttons/Button';
import InvestorsList from '../../funds/investors-list';
import type { FundDetailsProps } from '../FundDetails';
import FundAnalysis from '../panels/fund-analysis';
import FundDetailsInformation from '../panels/fund-details-information';
import FundWallet from '../panels/fund-wallet';
import MyFund from '../panels/my-fund';

function AdminFundDetailsLayout({ fund, withInvestorsPage }: FundDetailsProps) {
  const { downloadKyc } = useDownloadKyc();

  const View = useLinkTabs({
    namespace: 'common',
    tabs: ['fundsInformation', 'myFund', 'fundAnalysis', 'fundWallet'],
    defaultTab: 'fundsInformation',
    type: 'top',
    panels: {
      fundsInformation: <FundDetailsInformation fund={fund} />,
      myFund: (
        <MyFund
          fundReportQueryOptions={adminFundReportQueryOptions}
          uploadReport={uploadReport}
          withInvestorsPage={withInvestorsPage}
        />
      ),
      fundWallet: (
        <FundWallet
          fundWalletTransactionsQueryOptions={
            adminFundWalletTransactionsQueryOptions
          }
          walletTransactionDetails={adminGetWalletTransactionDetails}
        />
      ),
      fundAnalysis: (
        <FundAnalysis
          fundId={fund?.id}
          fundAnalysisQueryOptions={getAdminFundAnalysis}
        />
      ),
    },
  });
  const statuses = [
    'pendingApproval',
    'fundRejected',
    'fundApproved',
    'contractApproved',
    'contractRejected',
    'fundSchedule',
  ];

  const hideInvestors = statuses.includes(fund?.status as string);

  const handleDownloadAllInvestorsKYCs = async () => {
    if (!fund?.id) return;
    await downloadKyc(fund?.id);
  };
  return (
    <div className="flex w-full flex-col gap-6 @container">
      {View}
      {!hideInvestors && !withInvestorsPage ? (
        <InvestorsList
          listInvestorsQueryOptions={adminListFundInvestorsQueryOptions}
          headerButton={
            <Button
              namespace="common"
              text="downloadAllInvestorsKYCs"
              leftSection={<DownloadIcon className="h-5 w-5 stroke-white" />}
              onClick={handleDownloadAllInvestorsKYCs}
            />
          }
        />
      ) : null}
    </div>
  );
}

export default AdminFundDetailsLayout;
