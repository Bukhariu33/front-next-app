import type { NextApiRequest, NextApiResponse } from 'next';

import type { TransactionDetails } from '@/libs/types/base/fundWalletTransactionDetails';

const transactionDetails: TransactionDetails = {
  id: 'ODWD0000000001692596',
  code: 'ODWD0000000001692596',
  status: 'doneSuccessfully',
  message: 'Investment in the fund',
  type: 'withdrawal',
  amount: 1000,
  createdAt: '09/04/2023 - 03:00 pm ',
  paymentMethod: 'Fund wallet',
  simplifiedType: 'deposit',
  account: {
    iban: 'SA35202111090000000001234567',
    name: 'CIB',
  },
  description: 'Investment in the fund',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
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
}
