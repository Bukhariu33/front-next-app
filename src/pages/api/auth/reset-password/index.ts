import { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';

import { axiosExternal } from '@/libs/configs/axios';
import { ForgetPasswordSchema } from '@/libs/validations/auth-validations/forget-password-validation';
import { addCountryCode } from '@/utils/addCountryCode';
import { isDebugMode } from '@/utils/is-debug-mode';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await ForgetPasswordSchema.validate({
      mobile: req.body.mobile,
      password: req.body.newPassword,
      otp: req.body.otp,
      confirmPassword: req.body.confirmPassword,
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
        const response = await axios.post('/auth/password-reset', {
          username: addCountryCode(req.body.mobile),
          newPassword: req.body.newPassword,
          otp: req.body.otp,
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
        return res.status(422).json(response.data);
      }
      return res.status(response?.status || 500).json(response?.data);
    }
    if (error instanceof yup.ValidationError) {
      return res.status(422).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
