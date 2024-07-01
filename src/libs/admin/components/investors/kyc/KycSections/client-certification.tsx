import { useTranslation } from 'next-i18next';

import ReplaceTranslationKey from '@/libs/components/utils/ReplaceTranslationKey';
import type { AdminInvestorSingleItem } from '@/libs/types/investors';
import type { CorporateKyc } from '@/libs/types/kyc/corporate-kyc';
import type { IndividualKyc } from '@/libs/types/kyc/individual-kyc';

import KycTableHeader from '../KycTableComponents/KycTableHeader';
import KycTableRow from '../KycTableComponents/KycTableRow';

export interface IndividualClientDeclarationProps {
  investorDetails: AdminInvestorSingleItem;
  investorKYC: IndividualKyc;
  type: 'individual';
}

export interface CorporateClientDeclarationProps {
  investorDetails: AdminInvestorSingleItem;
  investorKYC: CorporateKyc;
  type: 'corporate';
}

function KycClientCertification({
  investorDetails,
  investorKYC,
  type,
}: IndividualClientDeclarationProps | CorporateClientDeclarationProps) {
  const { t } = useTranslation('kyc');

  const individualClientDeclaration = () => (
    <ReplaceTranslationKey
      className="text-xl"
      text={t('individualClientDeclaration')}
      values={{
        fullName: (
          <span className="text-brand-primary-main">
            {investorDetails?.fullName}
          </span>
        ),
        nationalId: (
          <span className="text-brand-primary-main">
            {investorDetails?.nationalId}
          </span>
        ),
        terms: (
          <span className="text-brand-primary-main">
            {t('termsAndConditions')}
          </span>
        ),
        agencyAgreement: (
          <span className="text-brand-primary-main">
            {t('investmentAgencyAgreement')}
          </span>
        ),
        disclosurePolicy: (
          <span className="text-brand-primary-main">
            {t('disclosurePolicy')}
          </span>
        ),
        privacyPolicy: (
          <span className="text-brand-primary-main">{t('privacyPolicy')}</span>
        ),
      }}
    />
  );

  const corporateClientDeclaration = () => (
    <ReplaceTranslationKey
      className="text-xl"
      text={t('corporateClientDeclaration')}
      values={{
        terms: (
          <span className="text-brand-primary-main">
            {t('termsAndConditions')}
          </span>
        ),
        agencyAgreement: (
          <span className="text-brand-primary-main">
            {t('investmentAgencyAgreement')}
          </span>
        ),
        disclosurePolicy: (
          <span className="text-brand-primary-main">
            {t('disclosurePolicy')}
          </span>
        ),
        privacyPolicy: (
          <span className="text-brand-primary-main">{t('privacyPolicy')}</span>
        ),
      }}
    />
  );

  return (
    <div className="flex flex-col">
      <KycTableHeader title="clientCertification" />
      <KycTableRow>
        {type === 'corporate'
          ? corporateClientDeclaration()
          : individualClientDeclaration()}
      </KycTableRow>

      {type === 'corporate' && (
        <KycTableRow
          title="institutionalAcknowledgementDeclaration"
          noTopBorder
        />
      )}

      {type === 'individual' && (
        <>
          <KycTableRow title="individualClientDeclaration2" noTopBorder />
          <KycTableRow title="individualClientDeclaration3" noTopBorder />
        </>
      )}

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

export default KycClientCertification;
