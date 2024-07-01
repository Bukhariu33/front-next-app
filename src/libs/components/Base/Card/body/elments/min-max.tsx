import { Stack, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import useFormatToMoney from '@/libs/hooks/useFormatToMoney';
import { formatDate } from '@/utils/formatDate';

interface MinMaxCardBodyElementProps {
  min: number;
  deadline: string;
}

const MinMaxCardBodyElement: FC<MinMaxCardBodyElementProps> = ({
  deadline,
  min,
}) => {
  const { t } = useTranslation();
  const { format } = useFormatToMoney();
  return (
    <Stack className=" gap-1 text-xs  md:text-sm lg:gap-2  xl:text-lg">
      <Text className="font-medium text-brand-accent-500">
        {t('minimumInvestment')}:{' '}
        <span className="text-black">{format(min)}</span>
      </Text>
      <Text className="font-medium text-brand-accent-500">
        {t('minimumInvestment')}:{' '}
        <span className="text-black">{formatDate(deadline)}</span>
      </Text>
    </Stack>
  );
};

export default MinMaxCardBodyElement;
