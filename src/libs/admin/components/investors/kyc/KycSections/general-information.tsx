import { useTranslation } from 'next-i18next';

import type { CorporateKyc } from '@/libs/types/kyc/corporate-kyc';
import type { IndividualKyc } from '@/libs/types/kyc/individual-kyc';

import KycTableHeader from '../KycTableComponents/KycTableHeader';
import KycTableRow from '../KycTableComponents/KycTableRow';

function KycGeneralInformation({
  investorKYC,
  type,
}: {
  investorKYC: IndividualKyc | CorporateKyc;
  type?: 'individual' | 'corporate';
}) {
  const { t } = useTranslation('kyc');
  return (
    <div className="flex flex-col">
      <KycTableHeader title="generalInformation" />
      <KycTableRow
        title="workedInFinancialSector"
        value={
          investorKYC?.workedInFinancialSectorDuringPastFiveYears
            ? t('yes')
            : t('no')
        }
      />
      <KycTableRow
        title="practicalExperienceInFinancialSector"
        value={
          investorKYC?.otherPracticalExperienceInFinancialSector
            ? t('yes')
            : t('no')
        }
        noTopBorder
      />
      <KycTableRow
        title="investedInDebtInstruments"
        value={
          investorKYC?.investedInInvestmentOrRealEstateFunds
            ? t('yes')
            : t('no')
        }
        noTopBorder
      />
      <KycTableRow
        title="boardMemberOrExecutive"
        value={
          investorKYC?.boardMemberAuditCommitteeMemberSeniorExecutive
            ? t('yes')
            : t('no')
        }
        noTopBorder
      />
      <KycTableRow
        title="knowledgeAndInvestmentExperience"
        value={t(investorKYC?.investmentKnowledge)}
        noTopBorder
      />
      <KycTableRow
        title="investmentRiskTolerance"
        value={t(investorKYC?.riskTolerance)}
        noTopBorder
      />
      <KycTableRow
        title="investmentDuration"
        value={t(investorKYC?.investmentDuration)}
        noTopBorder
      />
      <KycTableRow
        title="prominentPublicFunctions"
        value={
          investorKYC?.entrustedWithProminentPublicFunctions
            ? t('yes')
            : t('no')
        }
        noTopBorder
      />
      <KycTableRow
        title="prominentPublicFunctionRelationship"
        value={
          investorKYC?.clientHasRelationshipWithProminentPublicFunction
            ? t('yes')
            : t('no')
        }
        noTopBorder
      />
      <KycTableRow
        title="beneficialOwner"
        value={investorKYC?.clientIsBeneficialOwner ? t('yes') : t('no')}
        noTopBorder
      />
      <KycTableRow
        title="realBeneficiary"
        value={
          investorKYC?.identityOfRealBeneficiaryOfInvestmentAccount ||
          t('notApplicable')
        }
        noTopBorder
      />
      {type === 'individual' && (
        <>
          <KycTableRow
            title="educationLevel"
            value={investorKYC?.educationalLevel}
            noTopBorder
          />
          <KycTableRow
            title="currentOccupation"
            value={investorKYC?.occupation}
            noTopBorder
          />
        </>
      )}
    </div>
  );
}

export default KycGeneralInformation;
