import type { FC } from 'react';

import useLinkTabs from '@/libs/hooks/use-link-tabs/use-link-tabs';
import useUser from '@/libs/hooks/useUser';
import type { BaseFund } from '@/libs/types/interface/fund/base';

import UnAuthorizedFundView from '../../UnAuthorized';
import { getFundDetailsPanels } from '..';

interface FundInformationPanelProps {
  fund?: BaseFund;
}

const FundInformationPanel: FC<FundInformationPanelProps> = ({ fund }) => {
  const { status } = useUser();
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
    panels:
      fund && status === 'authenticated'
        ? getFundDetailsPanels(fund)
        : {
            generalOverview: <UnAuthorizedFundView />,
            attachments: <UnAuthorizedFundView />,
            financialInformation: <UnAuthorizedFundView />,
            location: <UnAuthorizedFundView />,
            updates: <UnAuthorizedFundView />,
            team: <UnAuthorizedFundView />,
          },
  });
  return <div className="w-full @container">{View}</div>;
};

export default FundInformationPanel;
