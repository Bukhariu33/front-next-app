import type { Options } from '@/libs/packages/tables/filters/Builders/Status-Filter';

const getTransactionStatusOptions = (): Options[] => [
  { value: 'transactionFailed', label: 'transactionFailed' },
  { value: 'doneSuccessfully', label: 'doneSuccessfully' },
];

export default getTransactionStatusOptions;
