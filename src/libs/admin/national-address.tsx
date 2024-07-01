import { useTranslation } from 'next-i18next';

import InfoCard from '../components/Base/Card/info-card';

type NationalAddressProps = {
  unitNum: string;
  buildingNum: string;
  streetNum: string;
  zone: string;
  city: string;
  postalCode: string;
};

const NationalAddress = ({
  buildingNum,
  city,
  postalCode,
  streetNum,
  unitNum,
  zone,
}: NationalAddressProps) => {
  const { t } = useTranslation('profile');
  return (
    <div className="flex justify-between rounded-[10px] bg-[#F5F7F9] p-5">
      <InfoCard title={t('UnitNum')} value={unitNum} />
      <InfoCard title={t('BuildingNum')} value={buildingNum} withDivider />
      <InfoCard title={t('StreetNum')} value={streetNum} withDivider />
      <InfoCard title={t('Zone')} value={zone} withDivider />
      <InfoCard title={t('City')} value={city} withDivider />
      <InfoCard title={t('PostalCode')} value={postalCode} withDivider />
    </div>
  );
};

export default NationalAddress;
