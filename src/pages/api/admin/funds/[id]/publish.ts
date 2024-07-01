import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import type { BaseFund } from '@/libs/types/interface/fund/base';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';
import $sleep from '@/utils/sleep';

const mockHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const fundId = req.query.id as string;

  switch (req.method) {
    case 'PATCH': {
      await $sleep(500);
      const { startDate } = req.body;

      const selectedDate = new Date(startDate);
      const currentDate = new Date();

      selectedDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);

      let status = 'fundSchedule';

      if (selectedDate <= currentDate) {
        status = 'live';
      }

      const data = LocalDB.update('funds', fundId, {
        status,
      });
      return res.status(200).json(data);
    }

    default:
      res.setHeader('Allow', ['PATCH']);
      return res.status(405).json({ message: `Method Not Allowed` });
  }
};

async function patchPublishFund(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<APIResponse<BaseFund>> {
  const { id } = req.query;
  const { data } = await axiosExternal({ req, res }).patch<
    APIResponse<BaseFund>
  >(`/console/funds/${id}/publish`);

  return data;
}

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
      case 'PATCH': {
        const data = await patchPublishFund(req, res);
        return res.status(data.status).json(data);
      }

      default:
        res.setHeader('Allow', ['PATCH']);
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error: any) {
    return res
      .status(error?.response?.status || 500)
      .json(error?.response?.data);
  }
}
