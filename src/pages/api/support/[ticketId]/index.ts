import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import type {
  BESupportTicket,
  SupportTicket,
} from '@/libs/types/interface/support/support-ticket';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';
import $sleep from '@/utils/sleep';

const mockHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      await $sleep(500);
      const data = LocalDB.getById('support', req.query.ticketId as string);

      return res.status(200).json(data);
    }

    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({ message: `Method Not Allowed` });
  }
};

async function fetchTicketDetails(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<APIResponse<SupportTicket>> {
  const { ticketId } = req.query;
  const { data } = await axiosExternal({ req, res }).get<
    APIResponse<BESupportTicket>
  >(`/support/tickets/${ticketId}`);

  const tickets: SupportTicket = {
    ...data.data,
    status: data.data.status.value,
  };

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
        const data = await fetchTicketDetails(req, res);

        return res.status(data.status).json(data);
      }

      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error: any) {
    return res
      .status(error?.response?.status || 500)
      .json(error?.response?.data);
  }
}
