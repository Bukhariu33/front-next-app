export interface InvestorInvestmentsDashboardData {
  totalAmountInvested: number;
  remainingWalletBalance: number;
  investments: {
    name: string;
    value: number;
    color?: string;
    subCategories: {
      name: string;
      value: number;
    }[];
  }[];
  profits: number;
  expectedYearlyReturn: number;
}

export type APIResponseInvestorInvestmentsDashboardData =
  APIResponse<InvestorInvestmentsDashboardData>;
