import { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';

import { axiosExternal } from '@/libs/configs/axios';
import { CorporateInvestorSignupSchema } from '@/libs/validations/auth-validations/corporate-investor-validation';
import { addCountryCode } from '@/utils/addCountryCode';
import { isDebugMode } from '@/utils/is-debug-mode';
import { createYupAPIError } from '@/utils/yupError';

export type APIResponseRegisterCorporateInvestor = APIResponse<{
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  crNumber: string;
  id: string;
}>;

const checkErrorStep = (err: APIError) => {
  const STEP_ONE_ERRORS = [
    'fullName',
    'email',
    'mobile',
    'password',
    'confirmPassword',
  ];

  const errorInStep = err?.errors.some(_err =>
    STEP_ONE_ERRORS.includes(_err.property),
  )
    ? 'register'
    : 'crNumber';

  return errorInStep;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const data = await CorporateInvestorSignupSchema.validate({
      fullName: req.body.corporateInvestorData.fullName,
      email: req.body.corporateInvestorData.email,
      mobile: req.body.corporateInvestorData.mobile,
      password: req.body.corporateInvestorData.password,
      confirmPassword: req.body.corporateInvestorData.confirmPassword,
      nationalId: req.body.corporateInvestorData.nationalId,
      birthDate: req.body.corporateInvestorData.birthDate,
      crNumber: req.body.corporateInvestorData.crNumber,
      otp: req.body.corporateInvestorData.otp,
      confirmTermsAndConditions:
        req.body.corporateInvestorData.confirmTermsAndConditions,
      agreeToPrivacyPolicy: req.body.corporateInvestorData.agreeToPrivacyPolicy,
    });

    const { method } = req;
    switch (method) {
      case 'POST': {
        if (isDebugMode()) {
          return res.status(201).json({});
        }
        const axios = axiosExternal({
          req,
          res,
        });

        const response = await axios.post(`/auth/investors/register`, {
          ...data,
          mobile: addCountryCode(req.body.corporateInvestorData.mobile),
          nationalId: String(req.body.corporateInvestorData.nationalId),
          crNumber: Number(req.body.corporateInvestorData.crNumber),
          type: 'corporateInvestor',
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
        const errorInStep = checkErrorStep(response?.data);
        return res.status(422).json({
          ...response?.data,
          step: errorInStep,
        });
      }
      return res.status(response?.status || 500).json(response?.data);
    }
    if (error instanceof yup.ValidationError) {
      const err = createYupAPIError(error);
      const errorInStep = checkErrorStep(err);
      return res.status(422).json({
        ...err,
        step: errorInStep,
      });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
