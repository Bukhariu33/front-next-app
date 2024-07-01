export type TransactionType =
  | 'deposit'
  | 'withdrawal'
  | 'profit'
  | 'cancelInvestment'
  | 'fees'
  | 'investment';
export interface Transaction {
  id: string;
  code: string;
  type: TransactionType;
  status: 'doneSuccessfully' | 'transactionFailed';
  simplifiedType: 'withdrawal' | 'deposit';
  paymentMethod: string;
  message: string;
  createdAt: string;
  amount: number;
  description: string;
}

export interface BankAccount {
  name: string;
  iban: string;
}

export interface Investor {
  id: string;
  name: string;
  classification: string;
  crNumber: string;
  email: string;
  phoneNumber: string;
}

export interface TransactionWithAccount extends Transaction {
  account: BankAccount;
  type: Extract<TransactionType, 'withdrawal'>;
}

export interface TransactionWithInvestor extends Transaction {
  investor: Investor;
  type: Exclude<TransactionType, 'withdrawal'>;
}

export type TransactionDetails =
  | TransactionWithAccount
  | TransactionWithInvestor;
