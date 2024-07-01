/* eslint-disable no-plusplus */
import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import type { BaseFundManager } from '@/libs/types/fund-managers';
import type { TEnum } from '@/libs/types/interface/enum';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';
import { parseEnum } from '@/utils/parse-enum';
import { parseFilters } from '@/utils/parse-filters';

interface BEFundManager extends Omit<BaseFundManager, 'status'> {
  status: TEnum<'pending' | 'approved'>;
}

const mockHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const params = req.query;
  const filterDate = params['filter[date]'] as string;
  const sortFilter = params?.sort as string;
  const status = params?.status as 'pending' | 'approved';
  const fundManagers = LocalDB.getAllPaginated(
    'fundManagers',
    {
      currentPage: Number(params?.page) || 1,
      eachPage: Number(params?.limit) || 15,
    },
    {
      status,
      date: filterDate,
    },
    sortFilter,
  );

  switch (method) {
    case 'GET': {
      res.status(200).json(fundManagers);
      break;
    }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { method } = req;
    const params = req.query;
    if (isDebugMode()) {
      return await mockHandler(req, res);
    }

    switch (method) {
      case 'GET': {
        const { data } = await axiosExternal({
          req,
          res,
        }).get('/console/fund-managers', {
          params: {
            ...parseFilters(params),
            'filter[status]': params?.status,
          },
        });

        data.data = data.data.map((item: BEFundManager) => ({
          ...item,
          status: parseEnum(item.status),
        }));
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
