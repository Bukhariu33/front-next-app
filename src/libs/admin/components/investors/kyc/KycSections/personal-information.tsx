import { useTranslation } from 'next-i18next';

import type { AdminInvestorSingleItem } from '@/libs/types/investors';

import KycTableHeader from '../KycTableComponents/KycTableHeader';
import KycTableRow from '../KycTableComponents/KycTableRow';

function KycPersonalInformation({
  investorDetails,
}: {
  investorDetails: AdminInvestorSingleItem;
}) {
  const { t } = useTranslation('kyc');
  return (
    <div className="flex flex-col">
      <KycTableHeader title="personalInformation" />
      <KycTableRow title="fullName" value={investorDetails?.fullName} />
      <KycTableRow
        title="dateOfBirth"
        value={investorDetails?.birthDate}
        noTopBorder
      />
      <KycTableRow
        title="nationalId"
        value={investorDetails?.nationalId}
        noTopBorder
      />
      <KycTableRow title="mobile" value={investorDetails?.mobile} noTopBorder />
      <KycTableRow title="email" value={investorDetails?.email} noTopBorder />
      <KycTableRow
        title="nationality"
        value={investorDetails?.nationalId}
        noTopBorder
      />
      <KycTableRow
        title="gender"
        value={
          investorDetails?.gender ? investorDetails?.gender : t('notApplicable')
        }
        noTopBorder
      />
      <KycTableRow
        title="nationalAddress"
        value={t('nationalAddressValue', {
          unitNum: investorDetails?.unitNum,
          buildingNum: investorDetails?.buildingNum,
          streetNum: investorDetails?.streetNum,
          zone: investorDetails?.zone,
          city: investorDetails?.city,
          postalCode: investorDetails?.postalCode,
        })}
        noTopBorder
      />
    </div>
  );
}

export default KycPersonalInformation;
