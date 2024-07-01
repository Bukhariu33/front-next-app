import type { NextApiRequest, NextApiResponse } from 'next';

import type { FundManagerFundAnalysis } from '@/libs/types/fund-managers/funds/fund-analysis';

const fundAnalysis: FundManagerFundAnalysis = {
  investors: {
    total: 11917,
    femaleInvestors: 2384,
    maleInvestors: 9533,
  },
  averageInvestments: 1000,
  highestAmountInvested: 50000,
  mostFrequentlyInvestedAmount: 1000,
  investedAmountByNationality: {
    nonSaudi: 1000,
    saudi: 1000,
  },
  investorsAgeRange: {
    '18-24': 12038,
    '25-34': 17145,
    '35-44': 25890,
    '45-54': 37491,
    '55+': 55854,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { method } = req;
    switch (method) {
      case 'GET': {
        res.status(200).json(fundAnalysis);
        break;
      }

      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method method Not Allowed`);
    }
  } catch (error: any) {
    res.status(error?.response?.status || 500).json(error.response.data);
  }
}
