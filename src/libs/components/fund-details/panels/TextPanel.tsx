import { Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import type { TranslationKey } from '@/libs/types/utils/withTranslation';

import BasePanel from './BasePanel';

const TextPanel: FC<{ label: TranslationKey<'common'>; text: string }> = ({
  label,
  text,
}) => {
  const { t } = useTranslation('common');
  return (
    <BasePanel>
      <Text className="text-2xl font-bold leading-[1]">{t(label)}</Text>
      <Text className="text-xl font-medium leading-[1.4]">{text}</Text>
    </BasePanel>
  );
};

export default TextPanel;
