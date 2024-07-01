import type { NextApiRequest, NextApiResponse } from 'next';

import { axiosExternal } from '@/libs/configs/axios';
import type {
  APIResponseAdminFundsList,
  BEFund,
} from '@/libs/types/interface/fund';
import type { FrequentPayoutFundsValidationType } from '@/libs/validations/admin/fund-form-validation';
import { isDebugMode } from '@/utils/is-debug-mode';
import { LocalDB } from '@/utils/local-db/db';
import { parseEnum } from '@/utils/parse-enum';
import { parseFilters } from '@/utils/parse-filters';

const createNewFund = (
  fund: FrequentPayoutFundsValidationType,
  length: number,
) => {
  return {
    assetsClass: fund.assetsClass,
    attachments: (fund?.attachments || []).map(attachment => ({
      key: attachment.key || 'key',
      name: attachment.name || 'name',
      size: attachment.size || 100,
      type: (attachment.type as 'pdf') || 'pdf',
    })),
    code: `F${length}`,
    coverage: Number(fund.coverage),
    createdAt: new Date().toISOString(),
    durationInMonths: Number(fund.durationInMonths),
    expectedRoi: Number(fund.expectedRoi),
    fees: {
      distribution: Number(fund.distributionFees),
      subscription: Number(fund.subscriptionFeesPercentage),
    },
    financialInformation: fund.financialInformationEn,
    fundImages: fund.fundImages || [],
    fundManagerId: fund.fundManagerId,
    fundManagerName: 'Mock Fund Manager',
    fundTeam: fund.fundTeam || [],
    generalInformation: fund.generalInformationAr,
    id: `${length + 1}`,
    investmentEndingDate: fund.investmentEndingDate,
    investmentStartingDate: fund.investmentStartingDate,
    minCoverage: Number(fund.minCoverage),
    minInvestment: Number(fund.minInvestment),
    name: fund.nameEn,
    units: Number(fund.units),
    status: 'pendingApproval',
    takenUnits: 0,
    type: fund.type,
    unitPrice: Number(fund.unitPrice),
    updatedAt: new Date().toISOString(),
    updates: fund.updatesEn,
    city: fund.city,
    location: fund.location,
    riskMessage: fund.riskMessageEn,
  };
};

const mockHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const params = req.query;
  switch (method) {
    case 'GET': {
      const funds = LocalDB.getAllPaginated('funds', {
        currentPage: Number(params?.page) || 1,
        eachPage: Number(params?.limit) || 15,
      });
      res.status(200).json(funds);
      break;
    }
    case 'POST': {
      const data = req.body;
      const funds = LocalDB.getAll('funds');

      const response = LocalDB.save(
        'funds',
        createNewFund(data, funds.data.length),
      );

      res.status(201).json(response);
      break;
    }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method method Not Allowed`);
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
    const { method } = req;
    const params = req.query;
    switch (method) {
      case 'GET': {
        const { data } = await axiosExternal({
          req,
          res,
        }).get<APIResponse<BEFund[]>>('/console/funds', {
          params: parseFilters(params),
        });
        console.log('🚀 ~ file: index.ts:108 ~ data:', data);

        const funds: APIResponseAdminFundsList['data'] = data.data.map(
          fund => ({
            id: fund.id,
            code: fund.code,
            coverage: Number(fund.coverage),
            createdAt: fund.createdAt,
            fundManagerId: fund.fundManager.id,
            fundManagerName: fund.fundManager.fullName,
            name: fund.name,
            status: parseEnum(fund.status),
            location: {},
          }),
        );

        return res.status(200).json({
          ...data,
          data: funds,
        });
      }
      case 'POST': {
        const fundData = req.body;
        const modifiedData = {
          ...fundData,
          location: 'location',
        };

        const { data } = await axiosExternal({
          req,
          res,
        }).post('/console/funds', modifiedData);

        return res.status(201).json(data);
      }

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method method Not Allowed`);
    }
  } catch (error: any) {
    return res.status(error?.response?.status || 500).json(error.response.data);
  }
}
