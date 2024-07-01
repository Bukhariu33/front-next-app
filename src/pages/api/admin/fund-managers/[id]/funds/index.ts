import type { NextApiRequest, NextApiResponse } from 'next';

import type { FundManagerFundStats } from '@/libs/types/fund-managers/stats';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';

const mockHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const params = req.query;
  const fundManagerId = params.id as string;
  switch (method) {
    case 'GET': {
      const filter =
        params?.type === 'fundApproved'
          ? {
              status: 'fundApproved',
              fundManagerId,
            }
          : {
              fundManagerId,
            };
      const funds = LocalDB.getAll('funds', filter);
      const fundStats: FundManagerFundStats = {
        offeredFundsCount: 19,
        totalOfferedFundsSize: 100000000,
      };

      const response = {
        data: { fundStats, funds: funds.data },
        status: 200,
      };
      res.status(200).json(response);
      break;
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ message: `Method method Not Allowed` });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (isDebugMode()) return mockHandler(req, res);
  const { method } = req;
  switch (method) {
    case 'GET': {
      console.warn(
        'TODO: ⚠️ ⚠️ add mock data for now until the API is Ready ⚠️ ⚠️',
      );
      return mockHandler(req, res);
    }
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method method Not Allowed`);
  }
}
