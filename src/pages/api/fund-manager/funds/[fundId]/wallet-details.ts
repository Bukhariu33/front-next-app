import type { NextApiRequest, NextApiResponse } from 'next';

import type { FundWalletDetails } from '@/libs/types/fund-managers/funds/fund-wallet-details';

const walletDetails: FundWalletDetails = {
  id: 'ODWD0000000001692596',
  balance: 13000000,
  depositInfo: {
    fundName: 'Hayat Real Estate fund',
    name: 'Anb Bank',
    iban: 'AL35202111090000000001234567',

    otherBanksIban: 'SA35202111090000000001234567',
  },
  withdrawInfo: {
    name: 'Life Real Estate Fund',
    iban: 'SA35202111090000000001234567',
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
        res.status(200).json(walletDetails);
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
