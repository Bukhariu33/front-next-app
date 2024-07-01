export interface AdminFundInvestorListItem {
  id: string;
  code: string;
  name: string;
  nationalId: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  units: number;
  totalAmount: number;
  unitPrice: number;
}

export type APIResponseAdminFundInvestorListItem = APIResponse<
  AdminFundInvestorListItem[]
>;
