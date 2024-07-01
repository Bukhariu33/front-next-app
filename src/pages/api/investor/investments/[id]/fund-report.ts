import type { NextApiRequest, NextApiResponse } from 'next';

import { LocalDB } from '@/utils/local-db/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { method } = req;
    const { id } = req.query as { id: string };
    switch (method) {
      case 'GET': {
        const investment = LocalDB.getById('investments', id);
        const fundDetails = LocalDB.getById('funds', investment.data.fundId);
        fundDetails.data = fundDetails.data.fundReports;
        res.status(200).json(fundDetails);
        break;
      }
      case 'POST': {
        res.status(201).json({
          data: {},
          status: 200,
        });
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
