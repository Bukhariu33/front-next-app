import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';
import $sleep from '@/utils/sleep';

const mockHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      await $sleep(500);
      const data = LocalDB.getById(
        'support-messages',
        req.query.ticketId as string,
      );

      return res
        .status(200)
        .json({ ...data, data: data.data.messages.slice().reverse() });
    }

    case 'POST': {
      await $sleep(500);
      const ticketId = req.query.ticketId as string;
      const prevMessages = LocalDB.getById('support-messages', ticketId).data
        .messages;

      const data = LocalDB.update('support-messages', ticketId, {
        id: req.query.ticketId,
        messages: [
          ...prevMessages,
          {
            id: `${ticketId}_message${1}`,
            messages: req.body.message,
            attachments: req.body.attachments,
            sender: {
              name: 'ADMIN',
              value: 'admin',
              description: 'مدير النظام',
            },
            createdAt: new Date().toISOString(),
          },
        ],
      });

      return res.status(201).json(data);
    }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ message: `Method Not Allowed` });
  }
};

async function fetchTicketMessages(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<APIResponse<Message[]>> {
  const { ticketId } = req.query;
  const { data } = await axiosExternal({ req, res }).get<
    APIResponse<Message[]>
  >(`/console/support/tickets/${ticketId}/messages`);

  const messages = data.data.slice().reverse();

  return { ...data, data: messages };
}

async function postMessage(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<APIResponse<Message[]>> {
  const { ticketId } = req.query;
  const { data } = await axiosExternal({ req, res }).post<
    APIResponse<Message[]>
  >(`/console/support/tickets/${ticketId}/messages`, req.body);

  return data;
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
        const data = await fetchTicketMessages(req, res);
        return res.status(data.status).json(data);
      }

      case 'POST': {
        const data = await postMessage(req, res);
        return res.status(data.status).json(data);
      }

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error: any) {
    return res
      .status(error?.response?.status || 500)
      .json(error?.response?.data);
  }
}
