import { isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { axiosExternal } from '@/libs/configs/axios';
import type {
  APIResponseAdminFundsList,
  BEFund,
  FundMangerFund,
} from '@/libs/types/interface/fund';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';
import { parseEnum } from '@/utils/parse-enum';
import { parseFilters } from '@/utils/parse-filters';

import { nextAuthOptions } from '../../auth/[...nextauth]';

export type APIResponseFundManagerFunds = APIResponse<FundMangerFund[]>;

const mockHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const params = req.query;
  switch (method) {
    case 'GET': {
      const session = await getServerSession(req, res, nextAuthOptions);
      const fundManagerId = session?.user?.id;
      const filter =
        params?.type === 'fundApproved'
          ? {
              status: 'fundApproved',
              fundManagerId: fundManagerId?.toString(),
            }
          : {
              fundManagerId: fundManagerId?.toString(),
            };
      const funds = LocalDB.getAllPaginated(
        'funds',
        {
          currentPage: Number(params?.page) || 1,
          eachPage: Number(params?.limit) || 15,
        },
        filter,
      );
      res.status(200).json(funds);
      break;
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ message: `Method method Not Allowed` });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (isDebugMode()) return await mockHandler(req, res);
    const { method } = req;
    const params = req.query;
    switch (method) {
      case 'GET': {
        const { data } = await axiosExternal({
          req,
          res,
        }).get<APIResponse<BEFund[]>>(`/fund-managers/funds`, {
          params: parseFilters(params),
        });
        // TODO:  add mock data for now until the API is fixed
        console.warn(
          'TODO: ⚠️ ⚠️ add mock data for now until the API is fixed ⚠️ ⚠️',
        );
        const funds: APIResponseAdminFundsList['data'] = data.data.map(
          fund => ({
            id: fund.id,
            name: fund.name,
            code: fund.code,
            coverage: Number(fund.coverage),
            createdAt: fund.createdAt,
            fundManagerId: fund.fundManager.id,
            fundManagerName: fund.fundManager.fullName,
            status: parseEnum(fund.status),
            fundImages: [
              'https://images.unsplash.com/photo-1621961458348-f013d219b50c',
            ],
            investmentEndingDate: '2023-10-24T22:00:00.000Z',
            investmentStartingDate: '2023-10-23T22:00:00.000Z',
            durationInMonths: 1,
            expectedRoi: 20,
            city: 'city1',
            type: 'open',
            units: 10,
            takenUnits: 0,
            unitPrice: 1000,
            minInvestment: 10000,
          }),
        );

        return res.status(200).json({
          ...data,
          data: funds,
        });
      }
      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method method Not Allowed`);
    }
  } catch (error) {
    if (isAxiosError(error)) {
      return res
        .status(error.response?.status || 500)
        .json(error.response?.data);
    }

    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
