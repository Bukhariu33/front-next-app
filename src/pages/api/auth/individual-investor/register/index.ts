import { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';

import { axiosExternal } from '@/libs/configs/axios';
import { IndividualInvestorSignupSchema } from '@/libs/validations/auth-validations/individual-investor-validation';
import { addCountryCode } from '@/utils/addCountryCode';
import { isDebugMode } from '@/utils/is-debug-mode';
import { createYupAPIError } from '@/utils/yupError';

export type APIResponseRegisterIndividualInvestor = APIResponse<{
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  id: string;
}>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const data = await IndividualInvestorSignupSchema.validate({
      fullName: req.body.individualInvestorData.fullName,
      email: req.body.individualInvestorData.email,
      mobile: req.body.individualInvestorData.mobile,
      password: req.body.individualInvestorData.password,
      confirmPassword: req.body.individualInvestorData.confirmPassword,
      otp: req.body.individualInvestorData.otp,
      confirmTermsAndConditions:
        req.body.individualInvestorData.confirmTermsAndConditions,
      agreeToPrivacyPolicy:
        req.body.individualInvestorData.agreeToPrivacyPolicy,
      nationalId: req.body.individualInvestorData.nationalId,
      birthDate: req.body.individualInvestorData.birthDate,
    });
    const { method } = req;
    switch (method) {
      case 'POST': {
        if (isDebugMode()) {
          return res.status(201).json({});
        }
        const response = await axiosExternal({
          req,
          res,
        }).post(`/auth/investors/register`, {
          ...data,
          mobile: addCountryCode(req.body.individualInvestorData.mobile),
          nationalId: String(req.body.individualInvestorData.nationalId),
          type: 'individualInvestor',
        });
        return res.status(response.status).json(response.data);
      }
      default:
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<APIError>;
      if (response?.status === 422) {
        const errorInStep = 'register';
        return res.status(422).json({
          ...response?.data,
          step: errorInStep,
        });
      }
      return res.status(response?.status || 500).json(response?.data);
    }
    if (error instanceof yup.ValidationError) {
      const err = createYupAPIError(error);
      const errorInStep = 'register';
      return res.status(422).json({
        ...err,
        step: errorInStep,
      });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
