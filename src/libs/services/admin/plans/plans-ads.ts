import { axiosInternal } from '@/libs/configs/axios';
import { createQKey, createQueryOptions } from '@/packages/queryBuilder';

export const getAdminPlansAdsQueryOptions = createQueryOptions({
  key: createQKey('admin', 'plans-ads'),
  detail: () => ({
    queryFn: async () => {
      const { data } = await axiosInternal.get(`/admin/Ads/ads`);

      const transformedData = data.data.map((ad: any) => {
        return {
          value: ad.id,
          label: ad.link,
        };
      });

      return transformedData;
    },
  }),
});
