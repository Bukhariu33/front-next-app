import { Stack } from '@mantine/core';

import type { AdminInvestorSingleItem } from '@/libs/types/investors';
import type { CorporateKyc } from '@/libs/types/kyc/corporate-kyc';

import KycClientCertification from './KycSections/client-certification';
import KycClientClassification from './KycSections/client-classification';
import KycClientSuitabilityAssessment from './KycSections/client-suitability-assessment';
import KycContactInformation from './KycSections/contact-information';
import KycFinancialCondition from './KycSections/financial-condition';
import KycGeneralInformation from './KycSections/general-information';
import KycInstitutionalInvestorInformation from './KycSections/institutional-investor-information';
import KycPageHeader from './KycTableComponents/KycPageHeader';

interface CorporateKycProps {
  investorDetails: AdminInvestorSingleItem;
  investorKYC: CorporateKyc;
}

export function CorporateKYCTable({
  investorDetails,
  investorKYC,
}: CorporateKycProps) {
  return (
    <>
      <KycPageHeader />
      <Stack className="gap-8">
        <KycInstitutionalInvestorInformation
          investorDetails={investorDetails}
        />
        <KycContactInformation investorDetails={investorDetails} />
        <KycGeneralInformation investorKYC={investorKYC} />
        <KycClientClassification investorKYC={investorKYC} />
        <KycFinancialCondition investorKYC={investorKYC} />
        <KycClientCertification
          investorDetails={investorDetails}
          investorKYC={investorKYC}
          type="corporate"
        />
        <KycClientSuitabilityAssessment
          investorDetails={investorDetails}
          investorKYC={investorKYC}
          type="corporate"
        />
      </Stack>
    </>
  );
}
