import type { RoleWithPermissions } from '@/libs/packages/acl/types';

export type UserType =
  | 'fundManager'
  | 'corporateInvestor'
  | 'individualInvestor'
  | 'admin';

export interface UserModel {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  birthDate: string;
  gender: 'Male' | 'Female';
  nationalId: string;
  type: UserType;
  role: UserType;
  status: 'approved' | 'pending' | 'Rejected';
  roles?: RoleWithPermissions[];
  mobileVerifiedAt: string;
  createdAt: string;
  isQualified?: boolean;
  /** mocked */
  isKycComplete?: boolean;
  /** mocked */
  jobTitle?: string;
  /** mocked */
  nationality?: string;
  /** mocked */
  maritalStatus?: string;
  /** mocked */
  unitNum?: number;
  /** mocked */
  buildingNum?: number;
  /** mocked */
  streetNum?: number;
  /** mocked */
  zone?: string;
  /** mocked */
  city?: string;
  /** mocked */
  postalCode?: number;
  /** mocked */
  corporate?: {
    /** mocked */
    companyName: string;
    /** mocked */
    email: string;
    /** mocked */
    mobile: string;
    /** mocked */
    crNumber: string;
    /** mocked */
    crIssuanceDate: string;
    /** mocked */
    crExpiryDate: string;
    /** mocked */
    city: string;
    /** mocked */
    crActivities: string[];
  };
}
