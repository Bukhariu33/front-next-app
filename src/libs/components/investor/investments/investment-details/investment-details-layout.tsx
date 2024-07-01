import useLinkTabs from '@/libs/hooks/use-link-tabs/use-link-tabs';
import type { InvestorFund } from '@/libs/types/interface/fund';
import type { InvestorInvestmentInfo } from '@/libs/types/investors/investments/investment-fund-data';

import InvestorFundDetailsPanel from '../../funds/fund-details';
import InvestorMyFund from './my-fund';

type FundDetailsProps = {
  fund: InvestorFund;
  investmentInfo: InvestorInvestmentInfo;
};

function InvestorInvestmentDetailsLayout({
  fund,
  investmentInfo,
}: FundDetailsProps) {
  const View = useLinkTabs({
    namespace: 'common',
    tabs: ['fundsInformation', 'myFund'],
    defaultTab: 'fundsInformation',
    type: 'top',
    panels: {
      fundsInformation: <InvestorFundDetailsPanel fund={fund} />,
      myFund: <InvestorMyFund investmentInfo={investmentInfo} />,
    },
  });
  return <div className="w-full @container">{View}</div>;
}

export default InvestorInvestmentDetailsLayout;
