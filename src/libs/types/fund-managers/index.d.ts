export interface BaseFundManager {
  id: string;
  code: string;
  status: 'pending' | 'approved' | 'rejected';
  fullName: string;
  email: string;
  mobile: string;
  birthDate: string | null;
  gender: string | null;
  nationalId: string | null;
  type: {
    name: string;
    value: string;
    description: string;
  };
  mobileVerifiedAt: string | null;
  createdAt: string;
}

export interface AdminFundManagerListItem extends BaseFundManager {}

interface Activity {
  id: string;
  name: string;
}

export type CorporateInfo = {
  name: string;
  crNumber: string;
  issuanceDate: string;
  expiryDate: string;
  activities: Activity[] | null;
  city: string;
  createdAt: string;
  updatedAt: string;
};

export interface AdminFundManagerSingleItem extends AdminFundManagerListItem {
  code: string;
  corporate: CorporateInfo;
}

export type APIResponseAdminFundManagersList = APIResponse<
  AdminFundManagerListItem[]
>;

export type APIResponseAdminFundManagerSingleItem =
  APIResponse<AdminFundManagerSingleItem>;
