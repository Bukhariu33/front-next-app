import type { NextApiRequest, NextApiResponse } from 'next';

import { LocalDB } from '@/utils/local-db/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { method } = req;
    const fundId = req.query.id as string;
    switch (method) {
      case 'GET': {
        const data = LocalDB.getById('funds', fundId);
        data.data = data.data.fundReports;
        res.status(200).json(data);
        break;
      }
      case 'POST': {
        // const axios = axiosExternal({
        //   req,
        //   res,
        // });
        // axios.post(`endpoint for upload`, {
        //   report: req.body.report,
        // });
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
