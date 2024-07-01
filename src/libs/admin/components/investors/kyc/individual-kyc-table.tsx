import { Stack } from '@mantine/core';

import type { AdminInvestorSingleItem } from '@/libs/types/investors';
import type { IndividualKyc } from '@/libs/types/kyc/individual-kyc';

import KycClientCertification from './KycSections/client-certification';
import KycClientSuitabilityAssessment from './KycSections/client-suitability-assessment';
import KycFinancialCondition from './KycSections/financial-condition';
import KycGeneralInformation from './KycSections/general-information';
import KycPersonalInformation from './KycSections/personal-information';
import KycPageHeader from './KycTableComponents/KycPageHeader';

interface IndividualKycProps {
  investorDetails: AdminInvestorSingleItem;
  investorKYC: IndividualKyc;
}

export function IndividualKYCTable({
  investorDetails,
  investorKYC,
}: IndividualKycProps) {
  return (
    <>
      <KycPageHeader />
      <Stack className="gap-8" id="institutional-data">
        <KycPersonalInformation investorDetails={investorDetails} />
        <KycGeneralInformation investorKYC={investorKYC} type="individual" />
        <KycFinancialCondition investorKYC={investorKYC} />
        <KycClientCertification
          investorDetails={investorDetails}
          investorKYC={investorKYC}
          type="individual"
        />
        <KycClientSuitabilityAssessment
          investorDetails={investorDetails}
          investorKYC={investorKYC}
          type="individual"
        />
      </Stack>
    </>
  );
}
