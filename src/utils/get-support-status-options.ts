import type { TFunction } from 'i18next';

import type { Options } from '@/libs/packages/tables/filters/Builders/Status-Filter';

const getSupportStatusOptions = (t: TFunction): Options[] => [
  { value: 'open', label: t('open') },
  { value: 'closed', label: t('closed') },
];

export default getSupportStatusOptions;
