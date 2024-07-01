import console from 'console';
import type { NextApiRequest, NextApiResponse } from 'next';

import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';

const mockHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const fundId = query.fundId as string;
  const userId = query.userId as string;
  switch (method) {
    case 'GET': {
      let fundDetails = LocalDB.getById('funds', fundId);
      const user = LocalDB.getById('investors', userId);
      if (user.data) {
        fundDetails = {
          ...fundDetails,
          data: {
            ...fundDetails.data,
            isInvested: user.data.investments.includes(fundId),
          },
        };
      }
      if (fundDetails) return res.status(200).json(fundDetails.data);
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
