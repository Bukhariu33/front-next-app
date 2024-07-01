import type { NextApiRequest, NextApiResponse } from 'next';

import type { FundPublic } from '@/libs/types/interface/fund';
import { LocalDB } from '@/utils/local-db/db';

export type APIResponsePublicFunds = APIResponse<FundPublic[]>;

// const ITEMS_PER_PAGE = 3;

// const filteredFunds = funds.filter(fund => fund.status === 'live');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  switch (method) {
    case 'GET': {
      const funds = LocalDB.getAll('funds');
      funds.data = funds.data.filter((fund: any) => fund.status === 'live');
      res.status(200).json(funds);

      break;
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ message: `Method method Not Allowed` });
  }
}
