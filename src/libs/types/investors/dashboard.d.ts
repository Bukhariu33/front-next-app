import type { InvestorFund } from '../interface/fund';

export type FundStats = {
  investedFundsCount: number;
  distributedFundsCount: number;
  totalFundInvestmentsSize: number;
};

export interface InvestorDashboardData {
  fundsStats: FundStats;
  activeFund: InvestorFund;
}

export type APIResponseInvestorActiveFund = APIResponse<InvestorDashboardData>;
