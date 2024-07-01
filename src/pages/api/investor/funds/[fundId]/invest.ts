import console from 'console';
import type { NextApiRequest, NextApiResponse } from 'next';

import { env } from '@/libs/Env.mjs';
import type { BaseFund } from '@/libs/types/interface/fund/base';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';
// Utility functions
const calculateVat = (
  units: number,
  unitPrice: number,
  subscriptionFee: number,
): number => {
  return env.NEXT_PUBLIC_VAT_PERCENTAGE * units * unitPrice * subscriptionFee;
};

const calculateTotal = (
  units: number,
  unitPrice: number,
  vat: number,
  subscriptionFee: number,
): number => {
  return units * unitPrice * subscriptionFee + vat + units * unitPrice;
};
const createInvestorInvestmentInfo = (
  id: string,
  units: number,
  unitPrice: number,
  fees: any,
) => {
  const vat = calculateVat(units, unitPrice, fees.subscription);
  const total = calculateTotal(units, unitPrice, vat, fees.subscription);

  return {
    investmentDocsAndInvoice: [],
    suitabilityAssessment: 'suitable',
    purchases: [
      {
        id: `MOCK${id}`,
        invoice:
          'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        units,
        subscriptionFees: units * unitPrice * fees.subscription,
        vat,
        total,
        dateTime: new Date().toISOString(),
      },
    ],
  };
};
const updateInvestorData = (userId: string, id: string) => {
  const oldUser = LocalDB.getById('investors', userId);
  LocalDB.update('investors', userId, {
    investments: [...oldUser.data.investments, id],
  });
};

const saveInvestmentRecord = (
  id: string,
  fundId: string,
  userId: string,
  units: number,
  unitPrice: number,
  fees: any,
) => {
  return LocalDB.save('investments', {
    id,
    fundId,
    investorId: userId,
    investmentAmount: units * unitPrice,
    investmentDate: new Date().toISOString(),
    investorInvestmentInfo: createInvestorInvestmentInfo(
      id,
      units,
      unitPrice,
      fees,
    ),
  });
};

const mockHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const fundId = query.fundId as string;
  const { units, userId } = req.body as { units: number; userId: string };
  const { data: fundDetails } = LocalDB.getById('funds', fundId);
  const { unitPrice, fees } = fundDetails as BaseFund;
  const id = Date.now().toString();
  try {
    if (!fundId || !userId)
      return res.status(400).json({ message: 'Bad request' });
    switch (method) {
      case 'POST': {
        updateInvestorData(userId, id);
        saveInvestmentRecord(id, fundId, userId, units, unitPrice, fees);

        const vat = calculateVat(units, unitPrice, fees.subscription);
        const total = calculateTotal(units, unitPrice, vat, fees.subscription);
        return res.status(200).json({
          data: {
            id: `MOCK${id}`,
            invoice:
              'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            units,
            subscriptionFees: units * unitPrice * fees.subscription,
            vat,
            total,
            dateTime: new Date().toISOString(),
          },
          meta: null,
          status: 200,
        });
      }
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ message: `Method method Not Allowed` });
    }
  } catch (error) {
    console.log('🚀 ~ file: invest.ts:64 ~ mockHandler ~ error:', error);
    return res.status(500).json({ message: 'Internal server error' });
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
      try {
        console.warn(
          'TODO: ⚠️ ⚠️ add mock data for now until the API is Ready ⚠️ ⚠️',
        );
        return await mockHandler(req, res);
      } catch (error) {
        console.error('Error fetching data from the server: ', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }

    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method method Not Allowed`);
  }
}
