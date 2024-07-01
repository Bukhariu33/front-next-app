import type { NextApiRequest, NextApiResponse } from 'next';

import type { APIResponseAdminFundWallet } from '@/libs/types/admin/funds/fund-wallet';
import type { TransactionDetails } from '@/libs/types/base/fundWalletTransactionDetails';
import type { BEAdminInvestorSingleItem } from '@/libs/types/investors';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';
import $sleep from '@/utils/sleep';

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
  switch (req.method) {
    case 'GET': {
      await $sleep(500);
      const { id: fundId, transactionId } = req.query as {
        transactionId: string;
        id: string;
      };
      const data: APIResponseAdminFundWallet = LocalDB.getById(
        'fundsWallets',
        fundId,
      );
      const transaction = data.data.transactions.find(
        item => item.id === transactionId,
      );

      if (transaction.investorId) {
        const investorData: APIResponse<BEAdminInvestorSingleItem> =
          LocalDB.getById('investors', transaction.investorId);

        // Translate investor type based on client language (hack for translation)
        const lang = req.cookies.NEXT_LOCALE;
        const typeMap = {
          individualInvestor: 'مستثمر فردي',
          corporateInvestor: 'مستثمر مؤسسي',
        };
        return res.status(200).json({
          ...data,
          data: {
            ...transaction,
            investor: {
              ...investorData?.data,
              classification:
                lang === 'en'
                  ? investorData?.data.type.value
                  : typeMap[
                      investorData?.data.type.value as keyof typeof typeMap
                    ],
              phoneNumber: investorData?.data.mobile,
              crNumber:
                investorData?.data.crNumber ?? investorData?.data.nationalId,
            },
          },
        });
      }

      return res.status(200).json({ ...data, data: transaction });
    }

    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method method Not Allowed`);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (isDebugMode()) {
      return await mockHandler(req, res);
    }

    const { method } = req;
    switch (method) {
      case 'GET': {
        return res
          .status(200)
          .json({ status: 200, data: transactionDetails, meta: {} });
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
