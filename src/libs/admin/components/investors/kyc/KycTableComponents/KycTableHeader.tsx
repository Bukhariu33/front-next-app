import { Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

export default function KycTableHeader({ title }: { title: any }) {
  const { t } = useTranslation('kyc');
  return (
    <div className="bg-brand-primary-main px-8 py-1 text-xl text-white">
      <Text className="text-xl font-bold">{t(title) as React.ReactNode}</Text>
    </div>
  );
}
