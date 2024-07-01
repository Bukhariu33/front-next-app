import type { InvestorFund } from '../../interface/fund';
import type { InvestorInvestmentInfo } from './investment-fund-data';

export type Investment = InvestorFund & {
  id: string;
  investmentAmount: number;
  investmentDate: string;
  fundId: string;
  investorId: string;
  investorInvestmentInfo?: InvestorInvestmentInfo;
};

export type InvestorInvestments = Investment[];

export type APIResponseInvestorInvestments = APIResponse<InvestorInvestments>;
