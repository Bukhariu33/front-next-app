import type { AdminInvestorSingleItem } from '@/libs/types/investors';

import KycTableHeader from '../KycTableComponents/KycTableHeader';
import KycTableRow from '../KycTableComponents/KycTableRow';

function KycInstitutionalInvestorInformation({
  investorDetails,
}: {
  investorDetails: AdminInvestorSingleItem;
}) {
  return (
    <div className="flex flex-col">
      <KycTableHeader title="institutionalInvestorInformation" />
      <KycTableRow
        title="companyName"
        value={investorDetails?.corporate?.name}
      />
      <KycTableRow
        title="companyCommercialRegistrationNumber"
        value={investorDetails?.corporate?.crNumber}
        noTopBorder
      />
      <KycTableRow
        title="countryOfRegistration"
        value={investorDetails?.city}
        noTopBorder
      />
      <KycTableRow
        title="cityOfRegistration"
        value={investorDetails?.city}
        noTopBorder
      />
      <KycTableRow
        title="commercialRegistrationIssuanceDate"
        value={investorDetails?.corporate?.crIssuanceDate}
        noTopBorder
      />
      <KycTableRow
        title="commercialRegistrationExpirationDate"
        value={investorDetails?.corporate?.crExpiryDate}
        noTopBorder
      />
    </div>
  );
}

export default KycInstitutionalInvestorInformation;
