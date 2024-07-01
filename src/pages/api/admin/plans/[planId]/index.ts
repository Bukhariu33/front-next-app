import { isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  const params = req.query;
  try {
    switch (method) {
      case 'GET': {
        const { data } = await axiosExternal({ req, res }).get(
          `plan/${params.planId}`,
        );
        return res.status(200).json(data);
      }
      case 'PUT': {
        const { data } = await axiosExternal({
          req,
          res,
        }).put(`plan/${params.planId}`, req.body);

        return res.status(200).json(data);
      }
      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        return res.status(405).json({ message: `Method method Not Allowed` });
    }
  } catch (error) {
    if (isAxiosError(error)) {
      return res
        .status(error.response?.status ?? 500)
        .json(error.response?.data ?? error.message);
    }
    return res.status(500).json({
      message: 'Something went wrong',
    });
  }
}
