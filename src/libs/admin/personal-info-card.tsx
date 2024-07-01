import { useTranslation } from 'next-i18next';

import InfoCard from '../components/Base/Card/info-card';
import { CardSection } from './section-card';

type Props = {
  fullName: string;
  jobTitle: string;
  gender: string;
  phoneNumber: string;
  email: string;
};

const PersonalInfoCard = ({
  email,
  fullName,
  gender,
  jobTitle,
  phoneNumber,
}: Props) => {
  const { t } = useTranslation('profile');
  return (
    <CardSection title={t('PersonalInformation')}>
      <div className="grid grid-cols-3 gap-y-7">
        <InfoCard title={t('Fullname')} value={fullName} />
        <InfoCard title={t('JobTitle')} value={jobTitle} withDivider />
        <InfoCard title={t('Gender')} value={gender} withDivider />
        <InfoCard title={t('phoneNumber')} value={phoneNumber} />
        <InfoCard title={t('Email')} value={email} withDivider />
      </div>
    </CardSection>
  );
};

export default PersonalInfoCard;
