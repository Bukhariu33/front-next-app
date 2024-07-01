import { isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import type { Profile } from '@/libs/types/profile';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';
import { parseEnum } from '@/utils/parse-enum';

export type APIResponseProfile = APIResponse<Profile>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  try {
    switch (method) {
      case 'GET': {
        if (isDebugMode()) {
          const { userId } = req.query as { userId: string };
          const fundManager = LocalDB.getById('fundManagers', userId);
          fundManager.data = {
            ...fundManager.data,
            type: parseEnum(fundManager.data.type),
          };

          return res.status(200).json(fundManager);
        }

        const { data } = await axiosExternal({
          req,
          res,
        }).get(`/profile`);
        return res.status(200).json(data);
      }
      case 'PUT': {
        return res.status(200).json({});
      }
      default:
        res.setHeader('Allow', ['GET', 'PUT']);
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
