import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import type { BankAccount } from '@/libs/types/base/fundWalletTransactionDetails';
import { isDebugMode } from '@/utils/is-debug-mode';

const bankDetails: BankAccount = {
  iban: 'SA35202111090000000001234567',
  name: 'CIB',
};

const mockHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;
    switch (method) {
      case 'GET': {
        res.status(200).json(bankDetails);
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
        const { data } = await axiosExternal({
          req,
          res,
        }).get(`/console/investors/bank-accounts/${req.query.id}`);
        return res.status(200).json(data);
      }

      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method method Not Allowed`);
    }
  } catch (error: any) {
    return res.status(error?.response?.status || 500).json(error.response.data);
  }
}
