export interface BaseInvestor {
  id: string;
  email: string;
  nationalId: string | null;
  type: 'individualInvestor' | 'corporateInvestor';
  createdAt: string;
}

export interface AdminInvestorListItem extends BaseInvestor {
  code: string;
  name: string;
  phone: number;
  status: 'pending' | 'approved';
}

export interface AdminInvestorSingleItem extends AdminInvestorListItem {
  firstName: string;
  lastName: string;
  fullName: string;
  mobile: string;
  jobTitle: string;
  crNumber: string | null;
  birthDate: string;
  gender: 'male' | 'female' | null | '';
  walletBalance: number;
  investedAmounts: number;
  isQualified: boolean;
  isKycComplete: boolean;
  corporate: CorporateInfo | null;
  unitNum: string;
  buildingNum: string;
  streetNum: string;
  zone: string;
  city: string;
  postalCode: string;

  mobileVerifiedAt: string;
  acknowledgmentSigned: boolean;
  updatedAt: string;
}

export interface BEAdminInvestorSingleItem
  extends Omit<AdminInvestorSingleItem, 'type'> {
  type: TEnum<'individualInvestor' | 'corporateInvestor'>;
}

export type APIResponseAdminInvestorsList = APIResponse<
  AdminInvestorListItem[]
>;

export type APIResponseAdminInvestorSingleItem =
  APIResponse<AdminInvestorSingleItem>;
