import type { UserType } from '@/libs/types/auth/user';

import type { CorporateInfo } from './fund-managers';

interface Address {
  unitNum?: string;
  buildingNum?: string;
  streetNum?: string;
  zone?: string;
  city?: string;
  postalCode?: string;
}

interface Person {
  fullName: string;
  isKycComplete: boolean;
  type: UserType;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  nationality: string;
  nationalId: number;
  birthDate: string;
  mobile: string;
  jobTitle: string;
  maritalStatus: string;
  address: Address;
  corporate?: CorporateInfo;
}

export interface Profile extends Person {
  // Add any additional profile-specific properties here
}
