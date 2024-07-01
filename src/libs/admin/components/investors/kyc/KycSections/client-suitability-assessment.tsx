import { useTranslation } from 'next-i18next';

import { isInvestorSuitable } from '@/utils/kyc/isInvestorSuitable';

import KycTableHeader from '../KycTableComponents/KycTableHeader';
import KycTableRow from '../KycTableComponents/KycTableRow';
import type {
  CorporateClientDeclarationProps,
  IndividualClientDeclarationProps,
} from './client-certification';

function KycClientSuitabilityAssessment({
  investorDetails,
  investorKYC,
  type,
}: IndividualClientDeclarationProps | CorporateClientDeclarationProps) {
  const { t } = useTranslation('kyc');
  return (
    <div className="flex flex-col">
      <KycTableHeader title="clientSuitabilityAssessment" />

      <KycTableRow
        title="result"
        value={
          isInvestorSuitable(investorKYC) ? t('unsuitable') : t('suitable')
        }
      />

      {isInvestorSuitable(investorKYC) && (
        <KycTableRow title="kycClientUnsuitable" noTopBorder />
      )}

      <KycTableRow
        title="clientAgreeCustomerAcknowledgment"
        value={investorKYC?.acknowledgmentSigned ? t('yes') : t('no')}
        noTopBorder
      />
      <KycTableRow title="acknowledgeDebtInstrumentProduct" noTopBorder />
      <KycTableRow
        title="label"
        value={t('acknowledgedElectronically')}
        noTopBorder
      />
      <KycTableRow
        title="acknowledgedBy"
        value={investorDetails?.fullName}
        noTopBorder
      />

      {type === 'individual' && (
        <KycTableRow
          title="nationalId"
          value={investorDetails?.nationalId}
          noTopBorder
        />
      )}

      <KycTableRow title="mobile" value={investorDetails?.mobile} noTopBorder />
      <KycTableRow title="email" value={investorDetails?.email} noTopBorder />
      <KycTableRow
        title="dateTime"
        value={investorKYC?.createdAt}
        noTopBorder
      />
      <KycTableRow title="IP" value={investorKYC?.ipAddress} noTopBorder />
    </div>
  );
}

export default KycClientSuitabilityAssessment;
