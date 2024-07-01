import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { method } = req;
    switch (method) {
      case 'PATCH': {
        // Handle patch request
        const { data } = await axiosExternal({
          req,
          res,
        }).patch(`/console/admins/${req.query.userId}`, req.body);
        res.status(200).json(data);
        break;
      }

      default:
        res.setHeader('Allow', ['PATCH']);
        res.status(405).end(`Method method Not Allowed`);
    }
  } catch (error: any) {
    res.status(error?.response?.status || 500).json(error.response.data);
  }
}
