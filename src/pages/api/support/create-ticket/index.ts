import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { axiosExternal } from '@/libs/configs/axios';
import type { SupportTicket } from '@/libs/types/interface/support/support-ticket';
import { nextAuthOptions } from '@/pages/api/auth/[...nextauth]';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';
import $sleep from '@/utils/sleep';

const mockHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST': {
      await $sleep(500);
      const session = await getServerSession(req, res, nextAuthOptions);
      const { data: tickets } = LocalDB.getAll('support');
      const id = (tickets.length + 1).toString();

      const data = LocalDB.save('support', {
        id,
        code: `sp-${id}`,
        title: req.body.title,
        category: req.body.category,
        status: 'open', // default status
        messages: 1,
        userId: session?.user?.id ?? 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      LocalDB.save('support-messages', {
        id,
        messages: [
          {
            id: `${tickets.length + 1}_message${1}`,
            messages: req.body.message,
            attachments: req.body.attachments,
            sender: {
              name: 'USER',
              value: 'user',
              description: 'مستخدم',
            },
            createdAt: new Date().toISOString(),
          },
        ],
      });

      return res.status(201).json(data);
    }

    default:
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ message: `Method Not Allowed` });
  }
};

async function postNewTicket(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<APIResponse<SupportTicket>> {
  const { category, title, message } = req.body;
  const { data } = await axiosExternal({ req, res }).post<
    APIResponse<SupportTicket>
  >(`/support/tickets/${category}`, { title, message });

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
      case 'POST': {
        const data = await postNewTicket(req, res);
        return res.status(data.status).json(data);
      }

      default:
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error: any) {
    return res
      .status(error?.response?.status || 500)
      .json(error?.response?.data);
  }
}
