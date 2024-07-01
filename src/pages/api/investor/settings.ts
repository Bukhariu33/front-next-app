import { isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import getInvestorSettingsMock from '../../../../__mocks__/hooks/investorSettingsMock';

const keys = [
  'accountUpgradeConditions',
  'annualIncomeOptions',
  'bankNameOptions',
  'educationalLevelOptions',
  'employmentStatusOptions',
  'investmentDocumentDestination',
  'investmentDurationOptions',
  'investmentExperienceOptions',
  'investmentGoalOptions',
  'investmentPortfolioOptions',
  'investmentRiskLevelOptions',
  'netWorthOptions',
  'owais-credit-team',
  'owaisCreditTeam',
  'proceedDestination',
  'profitDestination',
  'supportCategories',
  'structure',
  'paymentFrequency',
  'financingStructure',
  'sukukStructure',
  'purposeOfFundsUsage',
  'guarantees',
  'rolesListing',
  'userStatuses',
  'clientAndCustodian',
  'workedInFinancialSectorDuringPastFiveYears',
  'otherPracticalExperienceInFinancialSector',
  'investedInInvestmentOrRealEstateFunds',
  'boardMemberAuditCommitteeMemberSeniorExecutive',
  'entrustedWithProminentPublicFunctions',
  'clientHasRelationshipWithProminentPublicFunction',
  'clientIsBeneficialOwner',
  'clientShareholdersOrBeneficiariesHoldAmericanCitizenship',
  'clientHasAppointedCustodian',
] as const;

type SettingRecord = {
  category: string;
  key: string;
  label: string;
  label_ar: string;
  value: string;
  value_ar: string;
  uuid: string;
};

type InvestorSettings = {
  [key in (typeof keys)[number]]?: SettingRecord[];
};

export type APIResponseKycSettings = APIResponse<InvestorSettings>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, headers } = req;
  const lang = headers.localization as 'ar' | 'en';

  try {
    const settings = getInvestorSettingsMock();

    switch (method) {
      case 'GET': {
        return res.status(200).json(settings[lang]);
      }
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method method Not Allowed`);
    }
  } catch (error) {
    if (isAxiosError(error)) {
      return res
        .status(error.response?.status || 500)
        .json(error.response?.data);
    }

    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
