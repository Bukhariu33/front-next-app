import { Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

function KycPageHeader() {
  const { t } = useTranslation('kyc');
  return (
    <div className="flex flex-col items-center justify-center">
      <Text className="text-2xl font-extrabold">{t('kycForm')}</Text>
      <Text className="text-xl font-medium">{t('investorSummary')}</Text>
    </div>
  );
}

export default KycPageHeader;
