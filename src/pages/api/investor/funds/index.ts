import type { NextApiRequest, NextApiResponse } from 'next';

import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';

const mockHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const params = req.query;
  switch (method) {
    case 'GET': {
      const funds = LocalDB.getAllPaginated(
        'funds',
        {
          currentPage: Number(params?.page) || 1,
          eachPage: Number(params?.limit) || 15,
        },
        {
          status: ['completed', 'funded'],
        },
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
  if (isDebugMode()) return mockHandler(req, res);
  const { method } = req;
  switch (method) {
    case 'GET': {
      console.warn(
        'TODO: ⚠️ ⚠️ add mock data for now until the API is Ready ⚠️ ⚠️',
      );
      return mockHandler(req, res);
    }
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method method Not Allowed`);
  }
}
