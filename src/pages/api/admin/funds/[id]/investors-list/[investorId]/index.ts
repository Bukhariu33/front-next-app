import type { NextApiRequest, NextApiResponse } from 'next';

import type {
  APIResponseFundInvestorDetails,
  FundInvestorDetails,
} from '@/libs/types/interface/fund/investor-data';

const mockInvestorData: FundInvestorDetails = {
  id: '1',
  personalInformation: {
    investorId: '1',
    investorName: 'Bader rashid salah alobaidi',
    idNumber: '123456789',
    birthDate: '30 / 10 / 1960',
    nationality: 'Saudi',
    phoneNumber: '966500000000',
    email: 'O.elkhodry@owais.sa',
    nationalAddress: 'شارع الانظوال، حي الجزيرة، الرياض',
  },
  investmentInformation: {
    dateTimeOfInvestment: '30 / 10 / 1960',
    fundName: 'مركز العالمي للتمويل الاصغر',
    numberOfUnits: 100,
    totalWithoutSubscriptionFeesAndValueAddedTax: 1000,
    valueAddedTax: 100,
    subscriptionFees: 100,
    total: 1200,
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
        const data: APIResponseFundInvestorDetails = {
          data: mockInvestorData,
          status: 200,
          meta: {
            total: 1,
            currentPage: 1,
            eachPage: 1,
            lastPage: 1,
          },
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
