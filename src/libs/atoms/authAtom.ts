import { atom } from 'recoil';

import { sessionEffect } from '@/utils/atomSessionStorage';

import type { UserType } from '../types/auth/user';
import type { CorporateInvestorSignupSchemaType } from '../validations/auth-validations/corporate-investor-validation';
import type { FundManagerSignupSchemaType } from '../validations/auth-validations/fund-manager-validtions';
import type { IndividualInvestorSignupSchemaType } from '../validations/auth-validations/individual-investor-validation';

type Step = 'register' | 'crNumber' | 'confirm' | 'verify';
export type AuthState = {
  userType?: UserType | null;
  steps: Step;
} & (
  | {
      userType: 'corporateInvestor';
      corporateInvestorData: CorporateInvestorSignupSchemaType;
    }
  | {
      userType: 'fundManager';
      fundManagerData: FundManagerSignupSchemaType;
    }
  | {
      userType: 'individualInvestor';
      individualInvestorData: IndividualInvestorSignupSchemaType;
    }
  | {
      userType: null;
    }
);

const initialAuthState: AuthState = {
  userType: null,
  steps: 'register',
};

const authEffect = sessionEffect<AuthState>('auth_data');
export const authAtom = atom({
  key: 'auth',
  default: initialAuthState,
  effects: [authEffect],
});
