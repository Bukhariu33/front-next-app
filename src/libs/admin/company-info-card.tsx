import { List, ListItem } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import InfoCard from '../components/Base/Card/info-card';
import type { CorporateInfo } from '../types/fund-managers';
import { CardSection } from './section-card';

type Props = CorporateInfo;
const CompanyInfoCard = ({
  activities,
  city,
  crNumber,
  expiryDate,
  issuanceDate,
  name,
}: Props) => {
  const { t } = useTranslation('profile');
  const crActivities = activities?.map(activity => (
    <ListItem key={activity.id}>{activity.name}</ListItem>
  ));
  return (
    <CardSection title={t('companyInfo')}>
      <InfoCard title={t('companyName')} value={name} />
      <div className="grid grid-cols-4">
        <InfoCard title={t('CrNumber')} value={crNumber} withCopy />
        <InfoCard
          title={t('CrIssuanceDate')}
          value={issuanceDate}
          withDivider
        />
        <InfoCard title={t('City')} value={city} withDivider />
        <InfoCard title={t('CrExpiryDate')} value={expiryDate} withDivider />
      </div>
      <InfoCard
        title={t('CrCommercialActivity')}
        value={activities ? <List>{crActivities}</List> : undefined}
      />
    </CardSection>
  );
};

export default CompanyInfoCard;
