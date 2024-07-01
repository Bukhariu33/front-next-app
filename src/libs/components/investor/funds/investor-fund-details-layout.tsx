import useLinkTabs from '@/libs/hooks/use-link-tabs/use-link-tabs';
import type { InvestorFund } from '@/libs/types/interface/fund';

import InvestorFundDetailsPanel from './fund-details';

type FundDetailsProps = {
  fund: InvestorFund;
};

function InvestorFundDetailsLayout({ fund }: FundDetailsProps) {
  const View = useLinkTabs({
    namespace: 'common',
    tabs: ['fundsInformation', 'transferUnits'],
    defaultTab: 'fundsInformation',
    type: 'top',
    panels: {
      fundsInformation: <InvestorFundDetailsPanel fund={fund} />,
      transferUnits: <div>transferUnits</div>,
    },
  });
  return <div className="w-full @container">{View}</div>;
}

export default InvestorFundDetailsLayout;
