import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import type { TransactionDetails } from '@/libs/types/base/fundWalletTransactionDetails';
import { isDebugMode } from '@/utils/is-debug-mode';

const transactionDetails: TransactionDetails = {
  id: 'ODWD0000000001692596',
  code: 'ODWD0000000001692596',
  status: 'doneSuccessfully',
  message: 'Investment in the fund',
  type: 'investment',
  amount: 1000,
  createdAt: '09/04/2023 - 03:00 pm ',
  paymentMethod: 'Fund wallet',
  simplifiedType: 'deposit',
  investor: {
    id: 'INV0003764237',
    name: 'John Doe',
    classification: 'Individual',
    crNumber: '1234567890',
    email: 'investor@owais.sa',
    phoneNumber: '966500000000',
  },
  description: 'Investment in the fund',
};
const mockHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;
    switch (method) {
      case 'GET': {
        res.status(200).json(transactionDetails);
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
        }).get(
          `/console/investors/${req.query.id}/transactions/${req.query.transactionId}`,
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
