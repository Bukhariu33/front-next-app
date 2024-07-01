import type { NextApiRequest, NextApiResponse } from 'next';

import { LocalDB } from '@/utils/local-db/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, query } = req;
  const fundId = query.id as string;
  switch (method) {
    case 'GET': {
      const fundDetails = LocalDB.getById('funds', fundId);
      if (fundDetails) return res.status(200).json(fundDetails);
      return res.status(404).json({ message: 'The resource was not found' });
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ message: `Method method Not Allowed` });
  }
}
