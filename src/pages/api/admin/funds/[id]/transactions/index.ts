import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import type {
  APIResponseAdminFundsList,
  BEFund,
} from '@/libs/types/interface/fund';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';
import { parseFilters } from '@/utils/parse-filters';
import $sleep from '@/utils/sleep';

const mockHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      await $sleep(500);
      const { id } = req.query as { id: string };
      const data: APIResponseAdminFundsList = LocalDB.getById(
        'fundsWallets',
        id,
      );
      res.status(200).json(data);
      break;
    }

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method method Not Allowed`);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (isDebugMode()) {
    return mockHandler(req, res);
  }
  try {
    const { method } = req;
    const params = req.query;
    switch (method) {
      case 'GET': {
        const { data } = await axiosExternal({
          req,
          res,
        }).get<APIResponse<BEFund[]>>('/console/funds/wallet', {
          params: parseFilters(params),
        });

        return res.status(200).json({
          ...data,
        });
      }

      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method method Not Allowed`);
    }
  } catch (error: any) {
    return res.status(error?.response?.status || 500).json(error.response.data);
  }
}
