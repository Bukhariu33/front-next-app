import { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import { isDebugMode } from '@/utils/is-debug-mode';

export type APIResponseCompanyDetails = APIResponse<{
  crNumber: string;
  name: string;
  issuanceDate: string;
  activities: {
    id: string;
    name: string;
  }[];
  expiryDate: string;
  city: string;
  createdAt: string;
  updatedAt: string;
}>;

const mockedResponse = {
  status: 200,
  data: {
    crNumber: 1223423435,
    name: 'Hirthe, Emard and Grady',
    issuanceDate: '2023-08-24T01:54:15.858Z',
    expiryDate: '2023-08-24T01:54:15.858Z',
    city: 'الرياض',
    createdAt: '2023-10-22T06:11:04.494Z',
    updatedAt: '2023-10-22T06:11:04.494Z',
  },
  message: 'Ok',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method, query } = req;
  try {
    switch (method) {
      case 'GET': {
        if (isDebugMode()) {
          return res.status(mockedResponse.status).json(mockedResponse);
        }
        const axios = axiosExternal({
          req,
          res,
        });
        const response = await axios.get(`/corporates/${query.crNumber}`);
        return res.status(response.status).json(response.data);
      }
      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method method Not Allowed`);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<APIError>;
      return res.status(response?.status || 500).json(response?.data);
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
