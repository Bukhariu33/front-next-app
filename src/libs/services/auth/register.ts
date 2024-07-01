import type { AuthState } from '@/libs/atoms/authAtom';
import { axiosInternal } from '@/libs/configs/axios';

type RegisterParams = {
  otp: string;
} & AuthState;
export async function register(values: RegisterParams) {
  if (values.userType === 'fundManager') {
    const { fundManagerData } = values;
    const { data } = await axiosInternal.post(`/auth/fund-managers/register`, {
      fundManagerData,
    });
    return data;
  }
  if (values.userType === 'corporateInvestor') {
    const { corporateInvestorData } = values;
    const { data } = await axiosInternal.post(
      `/auth/corporate-investor/register`,
      {
        corporateInvestorData,
        type: values.userType,
      },
    );
    return data;
  }
  if (values.userType === 'individualInvestor') {
    const { individualInvestorData } = values;
    const { data } = await axiosInternal.post(
      `/auth/individual-investor/register`,
      {
        individualInvestorData,
        type: values.userType,
      },
    );
    return data;
  }

  throw new Error('Invalid user type');
}
