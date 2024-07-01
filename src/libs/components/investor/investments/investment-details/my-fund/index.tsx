import AttachmentsPanel from '@/libs/components/fund-details/panels/fund-details-information/AttachmentsPanel';
import FundReportPanel from '@/libs/components/fund-details/panels/my-fund/FundReportPanel';
import useLinkTabs from '@/libs/hooks/use-link-tabs/use-link-tabs';
import InvestorFundReportQueryOptions from '@/libs/services/investor/investments/fund-reports';
import type { InvestorInvestmentInfo } from '@/libs/types/investors/investments/investment-fund-data';

import Purchases from './Purchases';

interface InvestorMyFundProps {
  investmentInfo: InvestorInvestmentInfo;
}

const InvestorMyFund = ({ investmentInfo }: InvestorMyFundProps) => {
  const View = useLinkTabs({
    namespace: 'common',
    tabs: [
      'fundReport',
      'investmentDocumentAndInvoice',
      'suitabilityAssessment',
      'contactFundManager',
      'yourPurchases',
      'voting',
    ],
    defaultTab: 'fundReport',
    type: 'side',
    panels: {
      fundReport: (
        <FundReportPanel
          fundReportQueryOptions={InvestorFundReportQueryOptions}
        />
      ),
      investmentDocumentAndInvoice: investmentInfo.investmentDocsAndInvoice ? (
        <AttachmentsPanel
          attachments={investmentInfo.investmentDocsAndInvoice}
        />
      ) : null,
      suitabilityAssessment: <div>suitabilityAssessment</div>,
      contactFundManager: <div>contactFundManager</div>,
      yourPurchases: <Purchases purchases={investmentInfo.purchases} />,
      voting: <div>voting</div>,
    },
  });
  return <div className="w-full @container">{View}</div>;
};

export default InvestorMyFund;
