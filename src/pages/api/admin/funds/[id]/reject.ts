import { isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';

// Mock handler for reject flow
const mockRejectHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case 'PUT': {
      // Handle PUT request
      const fundId = req.query.id as string;
      const status = req.body.status as string;
      const response = LocalDB.update('funds', fundId, {
        status,
      });
      res.status(200).json(response);
      break;
    }
    default:
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method method Not Allowed`);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Check if the application is in debug mode
    if (isDebugMode()) return mockRejectHandler(req, res);

    const { method } = req;
    switch (method) {
      case 'PUT': {
        // Handle PUT request
        const fundId = req.query.id as string;

        // Make an external API call to reject the fund
        const { data } = await axiosExternal({
          req,
          res,
        }).patch(`/console/funds/${fundId}/reject`);
        return res.status(200).json(data);
      }
      default:
        res.setHeader('Allow', ['PUT']);
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
