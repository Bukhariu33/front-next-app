import type { NextApiRequest, NextApiResponse } from 'next';

import type { APIResponseAdminFundWallet } from '@/libs/types/admin/funds/fund-wallet';
import type { APIResponseFundWalletList } from '@/libs/types/fund-managers/funds/fund-wallet-transactions';
import { LocalDB } from '@/utils/local-db/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { method } = req;
    switch (method) {
      case 'GET': {
        const { fundId } = req.query as { fundId: string };
        const {
          data: { transactions },
        }: APIResponseAdminFundWallet = LocalDB.getById('fundsWallets', fundId);
        const data: APIResponseFundWalletList = {
          data: transactions,
          meta: {
            total: transactions.length,
            currentPage: 1,
            eachPage: 15,
            lastPage: transactions.length / 15,
          },
          status: 200,
        };

        res.status(200).json(data);
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
