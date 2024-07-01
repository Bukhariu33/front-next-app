import { isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import type {
  APIResponseSupportList,
  BESupportTicket,
  SupportTicket,
} from '@/libs/types/interface/support/support-ticket';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';

export type APIResponseProfile = APIResponseSupportList;

const mockHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      const data = LocalDB.getAll('support', { userId: '1' });

      return res.status(200).json(data);
    }

    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({ message: `Method Not Allowed` });
  }
};

async function fetchTickets(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<APIResponse<BESupportTicket[]>> {
  const { data } = await axiosExternal({ req, res }).get<
    APIResponse<BESupportTicket[]>
  >(`/support/tickets?include=category&include=messages`, {
    params: req.query,
  });

  const tickets: SupportTicket[] = data.data.map(t => ({
    ...t,
    status: t.status.value,
  }));

  return { ...data, data: tickets };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // MOCK
    if (isDebugMode()) {
      return await mockHandler(req, res);
    }

    switch (req.method) {
      case 'GET': {
        const data = await fetchTickets(req, res);
        return res.status(data.status).json(data);
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
