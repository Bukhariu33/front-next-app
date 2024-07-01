import { t as T } from 'i18next';

import type { Options } from '@/libs/packages/tables/filters/Builders/Status-Filter';

const getIssuanceStatusOptions = (t = T): Options[] => [
  { value: 'pendingApproval', label: t('pendingApproval') },
  { value: 'fundRejected', label: t('fundRejected') },
  { value: 'fundApproved', label: t('fundApproved') },
  { value: 'contractApproved', label: t('contractApproved') },
  { value: 'contractRejected', label: t('contractRejected') },
  { value: 'fundSchedule', label: t('fundSchedule') },
  { value: 'live', label: t('live') },
  { value: 'partiallyFunded', label: t('partiallyFunded') },
  { value: 'funded', label: t('funded') },
  { value: 'underRepayment', label: t('underRepayment') },
  { value: 'completed', label: t('completed') },
];

export default getIssuanceStatusOptions;
