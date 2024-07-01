import { Flex, Stack, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import AlertIcon from '@/icons/alert-icon';

export default function RisksClosure() {
  const { t } = useTranslation('fund');
  return (
    <Stack
      bg="white"
      className="min-h-[11.125rem] gap-[14px] rounded-lg px-[24.25px] py-[32px] shadow-sm"
    >
      <Flex className="h-[44px] items-center gap-2">
        <AlertIcon size="lg" />
        <Text className="text-2xl font-bold leading-[1.33333] text-brand-accent-500">
          {t('risksAndWarnings')}
        </Text>
      </Flex>
      <Text className="max-w-[78.44375rem] text-xl font-medium leading-[1.4]">
        {t('riskAndWarningFundDetails')}
      </Text>
    </Stack>
  );
}
