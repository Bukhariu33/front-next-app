import type { TransactionDetails } from '../base/fundWalletTransactionDetails';
import type {
  AdminFundManagerListItem,
  BaseFundManager,
} from '../fund-managers';
import type { BaseFund } from '../interface/fund/base';
import type { SupportTicket } from '../interface/support/support-ticket';

export type Status =
  | BaseFund['status']
  | TransactionDetails['status']
  | AdminFundManagerListItem['status']
  | SupportTicket['status']
  | BaseFundManager['status'];
