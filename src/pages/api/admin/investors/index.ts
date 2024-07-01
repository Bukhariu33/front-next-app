/* eslint-disable no-plusplus */
import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import type {
  AdminInvestorSingleItem,
  APIResponseAdminInvestorsList,
  BEAdminInvestorSingleItem,
} from '@/libs/types/investors';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';
import { parseFilters } from '@/utils/parse-filters';
import $sleep from '@/utils/sleep';

const mockHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      await $sleep(500);
      const filters: Record<string, any> = {};
      const { type, status } = req.query;
      if (status === 'qualified') filters.isQualified = true;
      // To filter type objects in the mock BE
      if (type === 'corporate') {
        filters.type = {
          name: 'CORPORATE_INVESTOR',
          value: 'corporateInvestor',
          description: 'مستثمر مؤسسي',
        };
      }
      if (type === 'individual') {
        filters.type = {
          name: 'INDIVIDUAL_INVESTOR',
          value: 'individualInvestor',
          description: 'مستثمر فردي',
        };
      }

      const data = LocalDB.getAll('investors', filters);

      // Translate investor type based on client language (hack for translation)
      const lang = req.cookies.NEXT_LOCALE;
      const typeMap = {
        individualInvestor: 'مستثمر فردي',
        corporateInvestor: 'مستثمر مؤسسي',
      };

      const updatedData: (AdminInvestorSingleItem & { idCr: string })[] = (
        data.data as BEAdminInvestorSingleItem[]
      ).map(item => ({
        ...item,
        idCr: item.nationalId ?? item.crNumber ?? '',
        type:
          lang === 'en'
            ? item.type.value
            : typeMap[item.type.value as keyof typeof typeMap],
      }));

      return res.status(200).json({ ...data, data: updatedData });
    }

    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({ message: `Method Not Allowed` });
  }
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
        const { data } = await axiosExternal({
          req,
          res,
        }).get<APIResponseAdminInvestorsList>('/console/investors', {
          params: {
            ...parseFilters(req.query),
          },
        });

        return res.status(200).json(data);
      }

      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method method Not Allowed`);
    }
  } catch (error: any) {
    return res
      .status(error?.response?.status || 500)
      .json(error?.response?.data);
  }
}
