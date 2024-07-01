import { isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import { env } from '@/libs/Env.mjs';
import { isDebugMode } from '@/utils/is-debug-mode';

export interface SignedUrlResponse {
  url: string;
  fields: {
    'content-type': string;
    bucket: string;
    'X-Amz-Algorithm': string;
    'X-Amz-Credential': string;
    'X-Amz-Date': string;
    key: string;
    Policy: string;
    'X-Amz-Signature': string;
  };
}

const mockSignedUrlResponse: SignedUrlResponse = {
  url: `${env.NEXT_PUBLIC_FRONTEND_URL}/api/media/s3`,
  fields: {
    'content-type': 'image/png',
    bucket: Math.random().toString(),
    'X-Amz-Algorithm': Math.random().toString(),
    'X-Amz-Credential': Math.random().toString(),
    'X-Amz-Date': Math.random().toString(),
    key: Math.random().toString(),
    Policy: Math.random().toString(),
    'X-Amz-Signature': Math.random().toString(),
  },
};
export type APIResponseSignedUrl = APIResponse<SignedUrlResponse>;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  try {
    switch (method) {
      case 'POST': {
        const { modelType, fileName, mimeType, sizeInBytes } = req.body as {
          modelType: string;
          fileName: string;
          mimeType: string;
          sizeInBytes: string;
        };
        if (isDebugMode()) {
          res.status(200).json({
            data: mockSignedUrlResponse,
          });
          return;
        }
        // Handle Post request
        const { data } = await axiosExternal({
          req,
          res,
        }).post<APIResponseSignedUrl>('/media/pre-signed-url', {
          modelType,
          fileName,
          mimeType,
          sizeInBytes: parseInt(sizeInBytes, 10),
        });
        res.status(200).json(data);
        break;
      }

      default:
        res.setHeader('Allow', ['Post']);
        res.status(405).end(`Method method Not Allowed`);
    }
  } catch (error) {
    if (isAxiosError(error)) {
      res.status(error.response?.status || 500).json(error.response?.data);
      return;
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
