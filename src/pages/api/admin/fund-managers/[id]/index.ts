import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';
import { parseEnum } from '@/utils/parse-enum';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { method } = req;
    switch (method) {
      case 'GET': {
        // Handle GET request
        if (isDebugMode()) {
          const fundManagersRes = LocalDB.getById(
            'fundManagers',
            req.query.id as string,
          );
          return res.status(200).json(fundManagersRes);
        }
        const { data } = await axiosExternal({
          req,
          res,
        }).get(`/console/fund-managers/${req.query.id}`);
        data.data = {
          ...data.data,
          status: parseEnum(data.data.status),
        };
        return res.status(200).json(data);
      }

      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method method Not Allowed`);
    }
  } catch (error: any) {
    return res.status(error?.response?.status || 500).json(error.response.data);
  }
}
