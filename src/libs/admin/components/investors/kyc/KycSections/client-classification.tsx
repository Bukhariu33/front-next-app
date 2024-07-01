import { useTranslation } from 'next-i18next';

import ReplaceTranslationKey from '@/libs/components/utils/ReplaceTranslationKey';
import type { CorporateKyc } from '@/libs/types/kyc/corporate-kyc';

import KycTableHeader from '../KycTableComponents/KycTableHeader';
import KycTableRow from '../KycTableComponents/KycTableRow';

function KycClientClassification({
  investorKYC,
}: {
  investorKYC: CorporateKyc;
}) {
  const { t } = useTranslation('kyc');
  return (
    <div className="flex flex-col">
      <KycTableHeader title="clientClassification" />

      <KycTableRow>
        <ReplaceTranslationKey
          className="text-xl"
          text={t('confirmationAsInstitutionalClient')}
          values={{
            institutionalClient: (
              <span className="text-brand-primary-main">
                {t('institutionalClient')}
              </span>
            ),
          }}
        />
      </KycTableRow>

      <KycTableRow
        title="americanShareholders"
        value={
          investorKYC?.clientShareholdersOrBeneficiariesHoldAmericanCitizenship
            ? t('yes')
            : t('no')
        }
        noTopBorder
      />
      <KycTableRow
        title="clientHasCustodian"
        value={investorKYC?.clientHasAppointedCustodian ? t('yes') : t('no')}
        noTopBorder
      />
      <KycTableRow
        title="sendInvestmentDocuments"
        value={
          investorKYC?.investmentDocumentDestination
            ? investorKYC?.investmentDocumentDestination
            : t('notApplicable')
        }
        noTopBorder
      />
      <KycTableRow
        title="sendProfitOrIncome"
        value={
          investorKYC?.profitDestination
            ? investorKYC?.profitDestination
            : t('notApplicable')
        }
        noTopBorder
      />
      <KycTableRow
        title="sendSalesOutcome"
        value={
          investorKYC?.proceedDestination
            ? investorKYC?.proceedDestination
            : t('notApplicable')
        }
        noTopBorder
      />
    </div>
  );
}

export default KycClientClassification;
