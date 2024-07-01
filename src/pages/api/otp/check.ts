import { isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import { addCountryCode } from '@/utils/addCountryCode';
import { isDebugMode } from '@/utils/is-debug-mode';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  try {
    switch (method) {
      case 'POST': {
        // Handle POST request
        if (isDebugMode()) {
          return res.status(201).json({});
        }
        req.body.contact = addCountryCode(req.body.contact);
        const { data } = await axiosExternal({
          req,
          res,
        }).post('/otp/check', req.body);
        return res.status(200).json(data);
      }
      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method method Not Allowed`);
    }
  } catch (error) {
    if (isAxiosError(error)) {
      return res
        .status(error.response?.status || 500)
        .json(error.response?.data);
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
