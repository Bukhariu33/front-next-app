import { isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import type { OwaisUser } from '@/libs/types/owais-users/owais-user';

export type APIResponseAdminOwaisUsersList = APIResponse<OwaisUser>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  try {
    switch (method) {
      case 'PUT': {
        const { data } = await axiosExternal({
          req,
          res,
        }).put(`change-password/${req.body.userId}`, {
          password: req.body.password,
        });

        return res.status(200).json(data);
      }
      default:
        res.setHeader('Allow', ['PUT']);
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
