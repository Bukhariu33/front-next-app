import { Group, Progress as Base, Stack, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

interface ProgressProps {
  value: number;
}

const Progress: FC<ProgressProps> = ({ value }) => {
  const { t } = useTranslation();
  if (value > 100) {
    throw new Error('Value must be less than 100');
  }
  return (
    <Stack className="gap-2.5">
      <Group className="justify-between font-medium">
        <Text>{t('OwaisCapitalCoverage')}</Text>
        <Group className="items-center justify-center gap-2.5">
          <Text className="font-medium">{value}%</Text>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
          >
            <path
              d="M9 12.125V7.625M9 17C13.1422 17 16.5 13.6422 16.5 9.5C16.5 5.35775 13.1422 2 9 2C4.85775 2 1.5 5.35775 1.5 9.5C1.5 13.6422 4.85775 17 9 17Z"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.75 9.125L9 6.875L11.25 9.125"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Group>
      </Group>
      <Base value={value} size="md" />
    </Stack>
  );
};

export default Progress;
