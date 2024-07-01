import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import type { APIResponseAdminFundWalletList } from '@/libs/types/admin/funds/fund-wallet-transactions';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';
import { parseFilters } from '@/utils/parse-filters';

const mockHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;
    const investorId = req.query.id as string;

    if (!investorId) {
      res.status(400).json({ error: 'Missing or invalid investor ID' });
      return;
    }

    switch (method) {
      case 'GET': {
        const {
          data: { walletId },
        } = LocalDB.getById('investors', investorId);

        if (!walletId) {
          res.status(400).json({ error: 'Missing or invalid wallet ID' });
          return;
        }

        const fundWallet = LocalDB.getById('fundsWallets', walletId);
        const { transactions } = fundWallet.data;

        const data = {
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
};
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
      case 'GET': {
        const { id } = req.query;
        const { data } = await axiosExternal({
          req,
          res,
        }).get<APIResponseAdminFundWalletList>(
          `/console/investors/transactions/${id}`,
          {
            params: {
              ...parseFilters(req.query),
            },
          },
        );
        return res.status(200).json(data);
      }
      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method method Not Allowed`);
    }
  } catch (error: any) {
    return res
      .status(error?.response?.status || 500)
      .json(error?.response?.data);
  }
}
