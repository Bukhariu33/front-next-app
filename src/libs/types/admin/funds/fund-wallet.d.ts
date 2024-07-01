import type { BankAccount } from '../../base/fundWalletTransactionDetails';

type FundWallet = {
  walletBalance: number;

  bankAccount: BankAccount;
  transactions: Transaction[];
};

export type APIResponseAdminFundWallet = APIResponse<FundWallet>;
