import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import type {
  APIResponseAdminFundsList,
  BEFund,
} from '@/libs/types/interface/fund';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';
import { parseFilters } from '@/utils/parse-filters';

const mockHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      const filters: Record<string, any> = {};
      const { fundManagerId } = req.query;
      if (fundManagerId) filters.fundManagerId = fundManagerId;
      const data: APIResponseAdminFundsList = LocalDB.getAll('funds', filters);
      const options = data.data.map(item => ({
        value: item.id,
        label: `${item.code} - ${item.name}`,
      }));

      res.status(200).json({ ...data, data: options });
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
        }).get<APIResponse<BEFund[]>>('/console/funds/options', {
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
