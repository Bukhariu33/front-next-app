export interface AdminFundReportListItem {
  id: string;
  code: string;
  reportSharingDate: string;
  reportLink: string;
}

export type APIResponseAdminFundReportList = APIResponse<
  AdminFundReportListItem[]
>;
