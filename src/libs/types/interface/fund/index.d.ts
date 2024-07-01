import type { BaseFund } from './base';

interface FundPublic extends BaseFund {}

export interface AdminFund extends BaseFund {}

export interface FundMangerFund extends BaseFund {
  invoiceLink?: string;
}
/**
 * this is the raw response from the Backend API we need to transform it to our needs
 */

export interface InvestorFund extends BaseFund {
  invoiceLink?: string;
}

export interface BEFund {
  id: string;
  code: string;
  fundManager: {
    id: string;
    fullName: string;
  };
  name: string;
  coverage: string;
  createdAt: string;
  status: TEnum<BaseFund['status']>;
}
type ListAdminFundsItem = Pick<
  AdminFund,
  | 'id'
  | 'code'
  | 'fundManagerId'
  | 'fundManagerName'
  | 'name'
  | 'coverage'
  | 'createdAt'
  | 'status'
>;
export type APIResponseAdminFundsList = APIResponse<ListAdminFundsItem[]>;

export type APIResponseInvestorFunds = APIResponse<InvestorFund[]>;
