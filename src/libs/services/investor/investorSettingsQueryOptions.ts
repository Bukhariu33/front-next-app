import { axiosInternal } from '@/libs/configs/axios';
import { createQueryOptions } from '@/packages/queryBuilder';
import type { APIResponseKycSettings } from '@/pages/api/investor/settings';

type ArgsType = ['en' | 'ar'];

const investorSettingsQueryOptions = createQueryOptions<
  APIResponseKycSettings,
  ArgsType
>({
  key: 'GET_individualInvestor_Settings',
  detail: language => ({
    queryFn: async () => {
      const { data } = await axiosInternal.get(`/investor/settings`, {
        headers: {
          Localization: language,
        },
      });
      return data;
    },
  }),
});

export { investorSettingsQueryOptions };
