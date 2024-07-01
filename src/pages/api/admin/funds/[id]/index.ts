import { isAxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';
import { parseEnum } from '@/utils/parse-enum';

const mockHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const fundId = query.id as string;
  switch (method) {
    case 'GET': {
      const fundDetails = LocalDB.getById('funds', fundId);
      if (fundDetails)
        return res.status(200).json({
          ...fundDetails,
        });
      return res.status(404).json({ message: 'The resource was not found' });
    }
    case 'PATCH': {
      // Handle PATCH request
      const fundDetails = req.body;
      const response = LocalDB.update('funds', fundId, {
        fundDetails,
      });
      return res.status(200).json(response);
    }
    default:
      res.setHeader('Allow', ['GET', 'PATCH']);
      return res.status(405).json({ message: `Method method Not Allowed` });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (isDebugMode()) {
    return mockHandler(req, res);
  }
  try {
    const { method, query } = req;
    const fundId = query.id as string;
    switch (method) {
      case 'GET': {
        const { data } = await axiosExternal({
          req,
          res,
        }).get(`/console/funds/${fundId}`);

        data.data = {
          units: Number(data.data.units),
          ...data.data,
          name: `${data.data.name} (Integrated + Partially Mocked)`,
          status: parseEnum(data.data.status),
          assetsClass: data.data.assetsClass.value,
          type: data.data.type.value,
          durationInMonths: data.data.durationInMonths,
          fundManagerId: data.data.fundManager.id,
          fundManagerName: data.data.fundManager.fullName,
          takenUnits: 0,
          paymentFrequency: parseEnum(data.data.paymentFrequency),
        };

        return res.status(200).json(data);
      }
      case 'PATCH': {
        const fundData = req.body;
        const modifiedData = {
          ...fundData,
          location: 'location',
        };
        const { data } = await axiosExternal({
          req,
          res,
        }).patch(`/console/funds/${fundId}`, modifiedData);

        return res.status(201).json(data);
      }

      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ message: `Method method Not Allowed` });
    }
  } catch (error: any) {
    if (isAxiosError(error)) {
      return res
        .status(error.response?.status || 500)
        .json(error.response?.data);
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
