import type { CorporateKyc } from '@/libs/types/kyc/corporate-kyc';
import type { IndividualKyc } from '@/libs/types/kyc/individual-kyc';

export const isInvestorSuitable = (
  investorKYC: IndividualKyc | CorporateKyc,
) => {
  return (
    investorKYC?.investmentKnowledge === 'high' &&
    investorKYC?.riskTolerance === 'high' &&
    investorKYC?.investmentExperienceYears > 1
  );
};
