import type { BankAccount } from '../../base/fundWalletTransactionDetails';

export interface FundWalletDetails {
  id: string;
  balance: number;
  depositInfo: BankAccount & {
    otherBanksIban: string;
    fundName: string;
  };

  withdrawInfo: BankAccount;
}

export type APIResponseFundWalletDetails = APIResponse<FundWalletDetails>;
