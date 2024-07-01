import type { BaseFund } from '@/libs/types/interface/fund/base';

import AttachmentsPanel from './fund-details-information/AttachmentsPanel';
import LocationPanel from './fund-details-information/LocationPanel';
import TeamPanel from './fund-details-information/TeamPanel';
import TextPanel from './TextPanel';

const getFundDetailsPanels = (fund: BaseFund) => ({
  generalOverview: (
    <TextPanel label="generalOverview" text={fund.generalInformation} />
  ),
  updates: <TextPanel label="updates" text={fund.updates} />,
  financialInformation: (
    <TextPanel label="financialInformation" text={fund.financialInformation} />
  ),
  location: <LocationPanel location={fund.location} />,
  attachments: fund?.attachments ? (
    <AttachmentsPanel attachments={fund?.attachments} />
  ) : null,
  team: fund?.fundTeam ? <TeamPanel members={fund.fundTeam} /> : null,
});

export { getFundDetailsPanels };
