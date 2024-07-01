import type { TransactionDetails } from '../../base/fundWalletTransactionDetails';

export interface AdminTransaction {
  id: string;
  code: string;
  transaction: string;
  transactionDate: string;
  transactionType: string;
  amount: number;
  status: TransactionDetails['status'];
  description: string;
}

export type APIResponseAdminFundWalletList = APIResponse<AdminTransaction[]>;
