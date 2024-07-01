import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import type {
  AdminInvestorSingleItem,
  APIResponseAdminInvestorSingleItem,
  BEAdminInvestorSingleItem,
} from '@/libs/types/investors';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';
import $sleep from '@/utils/sleep';

const mockHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as { id: string };

  const updateTypeEnum = (
    data: BEAdminInvestorSingleItem,
  ): AdminInvestorSingleItem => ({
    ...data,
    type: data.type.value,
  });

  switch (req.method) {
    case 'GET': {
      await $sleep(500);
      const data = LocalDB.getById('investors', id);

      const updatedData = updateTypeEnum(data.data);
      return res.status(200).json({ ...data, data: updatedData });
    }
    case 'PATCH': {
      await $sleep(500);
      const data = LocalDB.update('investors', id, req.body);

      const updatedData = updateTypeEnum(data.data);
      return res.status(200).json({ ...data, data: updatedData });
    }

    default:
      res.setHeader('Allow', ['GET', 'PATCH']);
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
