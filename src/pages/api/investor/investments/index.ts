import console from 'console';
import type { NextApiRequest, NextApiResponse } from 'next';

import type { InvestorFund } from '@/libs/types/interface/fund';
import type { Investment } from '@/libs/types/investors/investments';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';

const mockHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  switch (method) {
    case 'GET': {
      const userId = query.userId as string;
      const investments = LocalDB.getAllPaginated(
        'investments',
        {
          currentPage: Number(query?.page) || 1,
          eachPage: Number(query?.limit) || 15,
        },
        {
          investorId: userId,
        },
      );
      const fundDetails = LocalDB.getAll('funds', {
        id: investments.data.map((investment: Investment) => investment.fundId),
      });
      const data = fundDetails.data.map((fund: InvestorFund) => {
        const investment = investments.data.find(
          (i: Investment) => i.fundId === fund.id,
        );
        return {
          ...fund,
          id: investment?.id,
          investmentAmount: investment?.investmentAmount,
          investmentDate: investment?.investmentDate,
        };
      });
      const response = {
        data,
        meta: {
          currentPage: investments.meta.currentPage,
          eachPage: investments.meta.eachPage,
          lastPage: investments.meta.lastPage,
          total: investments.meta.total,
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
