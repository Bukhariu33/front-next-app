import type { CorporateKyc } from '@/libs/types/kyc/corporate-kyc';
import type { IndividualKyc } from '@/libs/types/kyc/individual-kyc';

import KycTableHeader from '../KycTableComponents/KycTableHeader';
import KycTableRow from '../KycTableComponents/KycTableRow';

function KycFinancialCondition({
  investorKYC,
}: {
  investorKYC: IndividualKyc | CorporateKyc;
}) {
  return (
    <div className="flex flex-col">
      <KycTableHeader title="financialCondition" />
      <KycTableRow
        title="netWorthExcludingHome"
        value={investorKYC?.netWorth}
      />
      <KycTableRow
        title="currentInvestments"
        value={
          Array.isArray(investorKYC?.investmentPortfolio) &&
          investorKYC?.investmentPortfolio.join(', ')
        }
        noTopBorder
      />
      <KycTableRow
        title="investmentObjective"
        value={
          Array.isArray(investorKYC?.investmentGoal) &&
          investorKYC?.investmentGoal.join(', ')
        }
        noTopBorder
      />
      <KycTableRow
        title="investmentYears"
        value={investorKYC?.investmentExperienceYears?.toString()}
        noTopBorder
      />
      <KycTableRow
        title="approximateAnnualIncome"
        value={investorKYC?.approximateAnnualIncome}
        noTopBorder
      />
      <KycTableRow
        title="expectedInvestmentPerOpportunity"
        value={investorKYC?.expectedAmountToInvestForEachOpportunity}
        noTopBorder
      />
      <KycTableRow
        title="expectedAnnualInvestment"
        value={investorKYC?.annualIncome}
        noTopBorder
      />
      <KycTableRow
        title="otherFinancialInformation"
        value={
          investorKYC?.otherFinancialInformationAboutClient || 'notApplicable'
        }
        noTopBorder
      />
    </div>
  );
}

export default KycFinancialCondition;
