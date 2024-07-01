import type { FundManagerFundStats } from '../../fund-managers/stats';
import type { FundMangerFund } from '../../interface/fund';

export interface AdminFundManagerFundsDashboard {
  fundStats: FundManagerFundStats;
  funds: FundMangerFund[];
}

export type APIResponseAdminFundManagerFundsDashboard =
  APIResponse<AdminFundManagerFundsDashboard>;
