import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { axiosExternal } from '@/libs/configs/axios';
import type { IndividualKyc } from '@/libs/types/kyc/individual-kyc';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';
import $sleep from '@/utils/sleep';

import { nextAuthOptions } from '../../auth/[...nextauth]';

const mockHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, nextAuthOptions);
  // If this is an SSR query, the session might be undefined, but the user's ID can be retrieved from the query parameters and used instead.
  const id = (req?.query?.id as string) ?? session?.user?.id;

  switch (req.method) {
    case 'GET': {
      await $sleep(500);
      const data = LocalDB.getById('kyc', id);

      return res.status(data.status).json(data);
    }

    case 'POST': {
      await $sleep(500);
      const { submit, ...body } = req.body;
      const newData: IndividualKyc = body;
      const oldData = LocalDB.getById('kyc', id);

      if (oldData.status === 404) {
        const data = LocalDB.save('kyc', {
          id,
          ...newData,
          createdAt: new Date().toLocaleString(),
          ipAddress: '127.0.0.1',
        });
        return res.status(201).json(data);
      }

      const data = LocalDB.update('kyc', id, {
        ...newData,
      });

      if (submit) {
        LocalDB.update('investors', id, {
          isKycComplete: true,
        });
      }

      return res.status(200).json(data);
    }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ message: `Method Not Allowed` });
  }
};

const getIndividualKyc = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await axiosExternal({
    req,
    res,
  }).get<APIResponse<any>>(`/kyc/individual`);

  return data;
};

const createIndividualKyc = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { data } = await axiosExternal({
    req,
    res,
  }).post(`/kyc/individual`, req.body);

  return data;
};

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
        const data = await getIndividualKyc(req, res);
        return res.status(data.status).json(data);
      }
      case 'POST': {
        const data = await createIndividualKyc(req, res);
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
