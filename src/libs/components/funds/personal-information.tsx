import { useTranslation } from 'next-i18next';

import GrayCard, { GrayCardInfo } from './gray-card';

type Props = {
  investorName: string;
  idNumber: string;
  birthDate: string;
  nationality: string;
  phoneNumber: string;
  email: string;
  nationalAddress: string;
};

const PersonalInformation = ({
  birthDate,
  email,
  idNumber,
  investorName,
  nationalAddress,
  nationality,
  phoneNumber,
}: Props) => {
  const { t } = useTranslation('common');

  return (
    <GrayCard>
      <span className="m-0 text-2xl font-bold">{t('personalInformation')}</span>
      <GrayCardInfo name={t('investorName')} value={investorName} />
      <GrayCardInfo name={t('idNumber')} value={idNumber} />
      <GrayCardInfo name={t('birthDate')} value={birthDate} />
      <GrayCardInfo name={t('nationality')} value={nationality} />
      <GrayCardInfo name={t('phoneNumber')} value={phoneNumber} />
      <GrayCardInfo name={t('email')} value={email} />
      <GrayCardInfo name={t('nationalAddress')} value={nationalAddress} />
    </GrayCard>
  );
};

export default PersonalInformation;
