import type { AdminInvestorSingleItem } from '@/libs/types/investors';

import KycTableHeader from '../KycTableComponents/KycTableHeader';
import KycTableRow from '../KycTableComponents/KycTableRow';

function KycContactInformation({
  investorDetails,
}: {
  investorDetails: AdminInvestorSingleItem;
}) {
  return (
    <div className="flex flex-col">
      <KycTableHeader title="contactInfo" />

      <KycTableRow title="fullName" value={investorDetails?.fullName} />
      <KycTableRow
        title="jobTitleWithInstitutionalInvestor"
        value={investorDetails?.fullName}
        noTopBorder
      />
      <KycTableRow title="mobile" value={investorDetails?.mobile} noTopBorder />
      <KycTableRow title="email" value={investorDetails?.email} noTopBorder />
    </div>
  );
}

export default KycContactInformation;
