import type { FC } from 'react';

import useLinkTabs from '@/libs/hooks/use-link-tabs/use-link-tabs';
import type { InvestorFund } from '@/libs/types/interface/fund';

import { getFundDetailsPanels } from '../../fund-details/panels';

interface InvestorFundDetailsPanelProps {
  fund: InvestorFund;
}

const InvestorFundDetailsPanel: FC<InvestorFundDetailsPanelProps> = ({
  fund,
}) => {
  const View = useLinkTabs({
    namespace: 'common',
    tabs: [
      'generalOverview',
      'attachments',
      'financialInformation',
      'location',
      'updates',
      'team',
    ],
    defaultTab: 'generalOverview',
    type: 'side',
    panels: getFundDetailsPanels(fund),
  });
  return <div className="w-full @container">{View}</div>;
};

export default InvestorFundDetailsPanel;
