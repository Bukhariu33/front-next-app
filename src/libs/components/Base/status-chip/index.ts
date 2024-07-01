import type { BaseFund } from '@/libs/types/interface/fund/base';

export const FUND_STATUS: BaseFund['status'][] = [
  'pendingApproval',
  'fundRejected',
  'fundApproved',
  'contractApproved',
  'contractRejected',
  'fundSchedule',
  'live',
  'partiallyFunded',
  'funded',
  'underRepayment',
  'completed',
];
