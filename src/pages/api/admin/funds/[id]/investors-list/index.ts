import type { NextApiRequest, NextApiResponse } from 'next';

import type {
  AdminFundInvestorListItem,
  APIResponseAdminFundInvestorListItem,
} from '@/libs/types/admin/funds/investors';

const mockInvestors: AdminFundInvestorListItem[] = [
  {
    id: '1',
    code: 'A001',
    dateOfBirth: '1990-01-01',
    email: 'investor@test.com',
    name: 'Investor 1',
    nationalId: '123456789',
    phoneNumber: '123456789',
    totalAmount: 100000,
    unitPrice: 100,
    units: 1000,
  },
];

// eslint-disable-next-line no-plusplus
for (let i = 2; i <= 24; i++) {
  const newItem: AdminFundInvestorListItem = {
    id: `${i}`,
    code: `CODE${i}`,
    dateOfBirth: '1990-01-01',
    email: `investor${i}@test.com`,
    name: `Investor ${i}`,
    nationalId: '123456789',
    phoneNumber: '123456789',
    totalAmount: 100000,
    unitPrice: 100,
    units: 1000,
  };
  mockInvestors.push(newItem);
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { method } = req;
    switch (method) {
      case 'GET': {
        const data: APIResponseAdminFundInvestorListItem = {
          data: mockInvestors,
          meta: {
            total: mockInvestors.length,
            currentPage: 1,
            eachPage: 15,
            lastPage: mockInvestors.length / 15,
          },
          status: 200,
        };

        const addCodePrefix = (item: AdminFundInvestorListItem[]) => {
          return item.map((v, i) => {
            return {
              ...v,
              id: `${i}`,
              code: `FM${i}`,
            };
          });
        };

        data.data = addCodePrefix(data.data);

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
