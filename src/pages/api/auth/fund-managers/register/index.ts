import { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';

import { axiosExternal } from '@/libs/configs/axios';
import { FundManagerSignupSchema } from '@/libs/validations/auth-validations/fund-manager-validtions';
import { addCountryCode } from '@/utils/addCountryCode';
import { isDebugMode } from '@/utils/is-debug-mode';
import { createYupAPIError } from '@/utils/yupError';

export type APIResponseRegisterFundManager = APIResponse<{
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  crNumber: string;
  // id: string;
}>;

const checkErrorStep = (err: APIError) => {
  const STEP_ONE_ERRORS = [
    'fullName',
    'email',
    'mobile',
    'password',
    'confirmPassword',
  ];

  const errorInStep = err?.errors?.some(_err =>
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
    const data = await FundManagerSignupSchema.validate({
      fullName: req.body.fundManagerData.fullName,
      email: req.body.fundManagerData.email,
      mobile: req.body.fundManagerData.mobile,
      password: req.body.fundManagerData.password,
      confirmPassword: req.body.fundManagerData.confirmPassword,
      crNumber: req.body.fundManagerData.crNumber,
      otp: req.body.fundManagerData.otp,
      confirmTermsAndConditions:
        req.body.fundManagerData.confirmTermsAndConditions,
      agreeToPrivacyPolicy: req.body.fundManagerData.agreeToPrivacyPolicy,
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
        const response = await axios.post('/auth/fund-managers/register', {
          ...data,
          mobile: addCountryCode(req.body.fundManagerData.mobile),
          crNumber: Number(req.body.fundManagerData.crNumber),
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
