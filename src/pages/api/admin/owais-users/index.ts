import { isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import type { OwaisUser } from '@/libs/types/owais-users/owais-user';
import { parseFilters } from '@/utils/parse-filters';

export type APIResponseAdminOwaisUsersList = APIResponse<OwaisUser[]>;

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
          '/console/admins',
          {
            params: parseFilters(params),
          },
        );
        const addCodePrefix = (owaisUsers: OwaisUser[]) => {
          return owaisUsers.map((user, i) => {
            return {
              ...user,
              code: `OW${i}`,
              status: user.status.value,
            };
          });
        };

        data.data = addCodePrefix(data.data);
        return res.status(200).json(data);
      }
      default:
        res.setHeader('Allow', ['GET']);
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