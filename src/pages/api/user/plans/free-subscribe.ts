import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { method } = req;
    switch (method) {
      case 'PUT': {
        // Handle put request
        const { data } = await axiosExternal({
          req,
          res,
        }).put(`subscribe-free-plan/${req.body.userId}`, {
          plan: req.query.planId,
        });
        res.status(200).json(data);
        break;
      }

      default:
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method method Not Allowed`);
    }
  } catch (error: any) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
