import { isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  try {
    switch (method) {
      case 'POST': {
        const { data } = await axiosExternal({
          req,
          res,
        }).post('/reset-verify', req.body);
        return res.status(200).json(data);
      }
      default:
        res.setHeader('Allow', ['POST']);
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
