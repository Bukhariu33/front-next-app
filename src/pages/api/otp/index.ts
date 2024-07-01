import { isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import type { OTPPayload } from '@/libs/services/otp';
import { addCountryCode } from '@/utils/addCountryCode';
import { isDebugMode } from '@/utils/is-debug-mode';

export type APIResponseOTP = APIResponse<{
  otp: string;
}>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  try {
    const mockOTP =
      isDebugMode() ||
      !['login', 'register', 'reset-password'].includes(req.body?.action);
    switch (method) {
      case 'POST': {
        const payload: OTPPayload = req.body;
        if (mockOTP) {
          res.status(201).json({
            otp: '1111',
          });
          break;
        }
        const { data } = await axiosExternal({
          req,
          res,
        }).post('/otp', {
          ...payload,
          contactType: 'mobile',
          contact:
            payload.contactType === 'mobile'
              ? addCountryCode(payload.contact)
              : payload.contact,
        });
        console.log('🚀 ~ file: index.ts:40 ~ data:', data);
        res.status(201).json(data);
        break;
      }
      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method method Not Allowed`);
    }
  } catch (error) {
    if (isAxiosError(error)) {
      res.status(error.response?.status || 500).json(error.response?.data);
    }
  }
}
