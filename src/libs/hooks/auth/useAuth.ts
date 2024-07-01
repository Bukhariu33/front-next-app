import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import type { AuthState } from '@/libs/atoms/authAtom';
import { authAtom } from '@/libs/atoms/authAtom';
import type { CorporateInvestorSignupSchemaType } from '@/libs/validations/auth-validations/corporate-investor-validation';
import type { FundManagerSignupSchemaType } from '@/libs/validations/auth-validations/fund-manager-validtions';
import type { IndividualInvestorSignupSchemaType } from '@/libs/validations/auth-validations/individual-investor-validation';

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authAtom);

  const { pathname } = useRouter();

  const currentPath = pathname.split('/')[3] as
    | 'fund-manager'
    | 'corporate-investor'
    | 'individual-investor';

  const resetAuth = () => {
    setAuth({
      userType: null,
      steps: 'register',
    });
  };

  const setAuthStep = (step: AuthState['steps']) => {
    if (!auth.userType) {
      return resetAuth();
    }
    if (auth.steps === step) return undefined;
    const state = { ...auth, steps: step } as AuthState;
    return setAuth(state);
  };

  const setUserType = (userType: AuthState['userType']) => {
    if (!userType) {
      return resetAuth();
    }
    if (auth.userType === userType) return undefined;
    const state = { ...auth, userType } as AuthState;
    return setAuth(state);
  };

  const setCorporateInvestorData = (
    corporateInvestorData: CorporateInvestorSignupSchemaType,
    next: AuthState['steps'],
  ) => {
    if (auth.userType !== 'corporateInvestor') {
      throw new Error('Invalid user type');
    }
    setAuth({
      userType: auth.userType,
      corporateInvestorData,
      steps: next,
    });
  };
  const setIndividualInvestorData = (
    individualInvestorData: IndividualInvestorSignupSchemaType,
    next: AuthState['steps'],
  ) => {
    if (auth.userType !== 'individualInvestor') {
      throw new Error('Invalid user type');
    }
    setAuth({
      userType: auth.userType,
      individualInvestorData,
      steps: next,
    });
  };
  const setFundManagerData = (
    fundManagerData: FundManagerSignupSchemaType,
    next: AuthState['steps'],
  ) => {
    if (auth.userType !== 'fundManager') {
      throw new Error('Invalid user type');
    }

    setAuth({
      ...auth,
      fundManagerData,
      steps: next,
    });
  };

  const setCrNumberData = (
    CrNumberData:
      | FundManagerSignupSchemaType
      | CorporateInvestorSignupSchemaType,
    next: AuthState['steps'],
  ) => {
    if (
      auth.userType !== 'fundManager' &&
      auth.userType !== 'corporateInvestor'
    ) {
      throw new Error('Invalid user type');
    }

    switch (auth.userType) {
      case 'fundManager':
        setAuth({
          ...auth,
          fundManagerData: {
            ...auth.fundManagerData,
            crNumber: CrNumberData.crNumber,
            agreeToPrivacyPolicy: CrNumberData.agreeToPrivacyPolicy,
            confirmTermsAndConditions: CrNumberData.confirmTermsAndConditions,
          },
          steps: next,
        });
        break;
      case 'corporateInvestor':
        setAuth({
          ...auth,
          corporateInvestorData: {
            ...auth.corporateInvestorData,
            crNumber: CrNumberData.crNumber,
            agreeToPrivacyPolicy: CrNumberData.agreeToPrivacyPolicy,
            confirmTermsAndConditions: CrNumberData.confirmTermsAndConditions,
          },
          steps: next,
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (currentPath) {
      case 'fund-manager':
        setUserType('fundManager');
        break;
      case 'corporate-investor':
        setUserType('corporateInvestor');
        break;
      case 'individual-investor':
        setUserType('individualInvestor');
        break;
      default:
        setUserType(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath]);

  return {
    auth,
    setUserType,
    setCorporateInvestorData,
    setFundManagerData,
    setCrNumberData,
    resetAuth,
    setAuthStep,
    setIndividualInvestorData,
  };
};
