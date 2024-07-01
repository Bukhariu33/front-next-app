import { isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios'; // Import your axios configuration
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';

const mockFundHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const fundId = req.query.fundId as string;
  const status = req.body.status as 'contractApproved' | 'contractRejected';
  if (['contractApproved', 'contractRejected'].indexOf(status) === -1)
    return res.status(400).json({ message: 'Invalid status' });

  const updated = LocalDB.update('funds', fundId, {
    status,
  });

  if (updated.status > 200) return res.status(updated.status).json(updated);
  return res.status(200).json(updated);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  try {
    if (isDebugMode()) {
      return mockFundHandler(req, res);
    }
    switch (method) {
      case 'PATCH': {
        const fundId = req.query.fundId as string;
        const status = req.query.action as 'approve' | 'reject';
        if (['approve', 'reject'].indexOf(status) === -1)
          return res.status(400).json({ message: 'Invalid status' });

        const { data } = await axiosExternal({
          req,
          res,
        }).patch(`/fund-managers/funds/${fundId}/${status}`);

        return res.status(200).json(data);
      }
      default:
        res.setHeader('Allow', ['PATCH']);
        return res.status(405).end(`Method Not Allowed`);
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