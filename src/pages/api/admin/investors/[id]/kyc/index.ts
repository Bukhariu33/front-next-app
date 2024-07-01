import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import type { APIResponseAdminInvestorSingleItem } from '@/libs/types/investors';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';
import $sleep from '@/utils/sleep';

const mockHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as { id: string };

  switch (req.method) {
    case 'GET': {
      await $sleep(500);
      const data = LocalDB.getById('kyc', id);

      return res.status(data.status).json(data);
    }

    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({ message: `Method Not Allowed` });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // MOCK
    if (isDebugMode()) {
      return await mockHandler(req, res);
    }

    switch (req.method) {
      case 'GET': {
        const { data } = await axiosExternal({
          req,
          res,
        }).get<APIResponseAdminInvestorSingleItem>(
          `/console/investors/${req.query.id}`,
        );
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
