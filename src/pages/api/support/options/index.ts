import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';
import $sleep from '@/utils/sleep';

const mockHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      await $sleep(500);
      const data = LocalDB.getAll('support-categories');

      const lang = req.cookies.NEXT_LOCALE;
      const options = data.data as {
        value: string;
        labelEn: string;
        labelAr: string;
      }[];

      return res.status(200).json({
        ...data,
        data: options.map(i => ({
          value: i.value,
          label: lang === 'en' ? i.labelEn : i.labelAr,
        })),
      });
    }

    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({ message: `Method Not Allowed` });
  }
};

async function fetchSupportOptions(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<APIResponse<any>> {
  const { data } = await axiosExternal({ req, res }).get<APIResponse<any>>(
    `/console/support/categories`,
  );

  const options = data.data.map((i: any) => ({ value: i.slug, label: i.name }));

  return { ...data, data: options };
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
        const data = await fetchSupportOptions(req, res);

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
