export interface FundReportListItem {
  id: string;
  code: string;
  reportSharingDate: string;
  reportLink: string;
}

export type APIResponseFundReportList = APIResponse<FundReportListItem[]>;
