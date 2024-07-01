import { isAxiosError } from 'axios';
import console from 'console';
import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import type { FundMangerFund } from '@/libs/types/interface/fund';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';
import { parseEnum } from '@/utils/parse-enum';

export type APIResponseFundManagerFunds = APIResponse<FundMangerFund[]>;

const mockHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const fundId = query.fundId as string;
  switch (method) {
    case 'GET': {
      const fundDetails = LocalDB.getById('funds', fundId);
      if (fundDetails)
        return res.status(200).json({
          ...fundDetails,
        });
      return res.status(404).json({ message: 'The resource was not found' });
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ message: `Method method Not Allowed` });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (isDebugMode()) return mockHandler(req, res);
    const { method } = req;
    const fundId = req.query.fundId as string;
    switch (method) {
      case 'GET': {
        try {
          const { data } = await axiosExternal({
            req,
            res,
          }).get(`/fund-managers/funds/${fundId}`);
          console.log('🚀 ~ file: index.ts:44 ~ data:', data);
          data.data = {
            units: Number(data.data.units),
            ...data.data,
            status: parseEnum(data.data.status),
            assetsClass: data.data.assetsClass.value,
            type: data.data.type.value,
            durationInMonths: data.data.durationInMonths,
            fundManagerName: data.data.fundManager.fullName,
            takenUnits: 0,
            location: data.data.location
              ? {
                  lat: 0,
                  lng: 0,
                }
              : undefined,
          };
          return res.status(200).json(data);
        } catch (error) {
          console.error('Error fetching data from the server: ', error);
          return res.status(500).json({ error: 'Internal server error' });
        }
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
