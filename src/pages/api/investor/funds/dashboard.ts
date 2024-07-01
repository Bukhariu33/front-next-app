import type { NextApiRequest, NextApiResponse } from 'next';

import type { InvestorFund } from '@/libs/types/interface/fund';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';

export type APIResponseInvestorFunds = APIResponse<InvestorFund[]>;

const mockHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case 'GET': {
      const fundsStats = {
        totalFundInvestmentsSize: 120000_000,
        distributedFundsCount: 12,
        investedFundsCount: 5,
      };
      const activeFund = LocalDB.getAll('funds', {
        status: 'live',
      });

      const response = {
        data: {
          fundsStats,
          activeFund: activeFund.data[0],
        },
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
