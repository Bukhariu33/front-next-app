import useLinkTabs from '@/libs/hooks/use-link-tabs/use-link-tabs';

import type { FundDetailsProps } from '../FundDetails';
import FundDetailsInformation from '../panels/fund-details-information';

function GuestFundDetailsLayout({ fund }: FundDetailsProps) {
  const View = useLinkTabs({
    namespace: 'common',
    tabs: ['fundsInformation'],
    defaultTab: 'fundsInformation',
    type: 'top',
    panels: {
      fundsInformation: <FundDetailsInformation fund={fund} />,
    },
  });
  return <div className="w-full @container">{View}</div>;
}

export default GuestFundDetailsLayout;
