export interface FundManagerInvestorListItem {
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

export type APIResponseFundManagerInvestorListItem = APIResponse<
  FundManagerInvestorListItem[]
>;
