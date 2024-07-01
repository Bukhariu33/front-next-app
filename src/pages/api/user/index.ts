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
      case 'GET': {
        const { data } = await axiosExternal({
          req,
          res,
        }).get(`users-list`);

        data.users = data.users.reverse().map((user: any) => {
          return {
            ...user,
            // eslint-disable-next-line no-underscore-dangle
            id: user._id,
            code: Math.floor(Math.random() * 1000000000),
          };
        });

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
