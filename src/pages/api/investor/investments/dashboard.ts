import type { NextApiRequest, NextApiResponse } from 'next';

import type { InvestorInvestmentsDashboardData } from '@/libs/types/investors/investments/dashboard';
import { isDebugMode } from '@/utils/is-debug-mode';

const mockStats: InvestorInvestmentsDashboardData = {
  remainingWalletBalance: 654500,
  totalAmountInvested: 300000,
  profits: 100000,
  expectedYearlyReturn: 20,
  investments: [
    {
      name: 'Real state',
      value: 300000,
      subCategories: [
        { name: 'صندوق النخيل العقاري', value: 500000 },
        { name: 'صندوق عرقة', value: 200000 },
        { name: ' صندوق المواساة', value: 100000 },
      ],
    },
    {
      name: 'Equity',
      value: 300000,
      subCategories: [
        { name: 'ABC Bank', value: 50000 },
        { name: 'CDE Project', value: 50000 },
      ],
    },
  ],
};
const mockHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case 'GET': {
      res.status(200).json(mockStats);
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
