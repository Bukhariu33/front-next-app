import type { NextApiRequest, NextApiResponse } from 'next';

import $sleep from '@/utils/sleep';

import adminSettingsMock from '../../../../__mocks__/hooks/adminSettingsMock';

const keys = [
  'fundAssetsClassOptions',
  'fundMangerNameOptions',
  'fundTypeOptions',
  'fundCityOptions',
  'paymentFrequencyOptions',
  'durationOptions',
  'imageDimensionOptions',
  'currencyOptions',
  'cancelInvestmentOptions',
] as const;

type SettingRecord = {
  key: string;
  label: string;
  id: string;
};

export type AdminSettings = {
  [key in (typeof keys)[number]]?: SettingRecord[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  switch (method) {
    case 'GET': {
      await $sleep(1000);
      return res.status(200).json(adminSettingsMock);
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ message: `Method method Not Allowed` });
  }
}
