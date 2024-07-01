import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { method } = req;
    switch (method) {
      case 'DELETE': {
        // Handle delete request
        const { data } = await axiosExternal({
          req,
          res,
        }).delete(`ad/${req.query.adId}`);
        res.status(200).json(data);
        break;
      }

      default:
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method method Not Allowed`);
    }
  } catch (error: any) {
    res.status(error?.response?.status || 500).json(error.response.data);
  }
}
