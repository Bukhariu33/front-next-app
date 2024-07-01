import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import type { FundWallet } from '@/libs/types/admin/funds/fund-wallet';
import type { APIResponseAdminFundWalletList } from '@/libs/types/admin/funds/fund-wallet-transactions';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';

const mockHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;
    const investorId = req.query.id as string;

    switch (method) {
      case 'POST': {
        const {
          data: { walletId },
        } = LocalDB.getById('investors', investorId);

        if (!walletId) {
          res.status(400).json({ error: 'Missing or invalid wallet ID' });
          return;
        }

        const { transactionType, amount, description } = req.body;
        const fundWalletResponse: APIResponse<FundWallet> = LocalDB.getById(
          'fundsWallets',
          walletId,
        );

        if (fundWalletResponse.data) {
          const { transactions, ...otherProperties } = fundWalletResponse.data;

          const newTransaction = {
            id: Math.random().toString(36).substring(2),
            code: `ODWD${Math.random().toString(10).substr(2, 10)}`,
            type: transactionType,
            status: 'doneSuccessfully',
            simplifiedType: transactionType,
            paymentMethod:
              transactionType === 'credit' ? 'Credit Card' : 'Debit Card',
            message: 'Transaction Successful',
            createdAt: new Date().toISOString(),
            amount,
            description,
            investorId,
          };

          transactions.push(newTransaction);

          const updatedFundWallet: FundWallet = {
            ...otherProperties,
            transactions,
          };

          LocalDB.update('fundsWallets', walletId, updatedFundWallet);

          res.status(201).json(transactions);
        } else {
          res.status(404).json({ error: 'FundWallet not found' });
        }
        break;
      }
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method Not Allowed`);
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
      case 'POST': {
        const { id } = req.query;
        const { data } = await axiosExternal({
          req,
          res,
        }).post<APIResponseAdminFundWalletList>(
          `/api/v1/admin/investors/${id}/wallet`,
          req.body,
        );
        return res.status(200).json(data);
      }
      default:
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method method Not Allowed`);
    }
  } catch (error: any) {
    return res
      .status(error?.response?.status || 500)
      .json(error?.response?.data);
  }
}
