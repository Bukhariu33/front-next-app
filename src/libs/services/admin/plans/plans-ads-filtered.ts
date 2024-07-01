import { axiosInternal } from '@/libs/configs/axios';
import { createQKey, createQueryOptions } from '@/packages/queryBuilder';

export const getAdminPlansFilteredAdsQueryOptions = createQueryOptions({
  key: createQKey('admin', 'plans-ads-filtered'),
  detail: () => ({
    queryFn: async () => {
      const { data } = await axiosInternal.get(`/admin/Ads/ads`);
      const transformedData = data.data.map((ad: any) => ({
        // eslint-disable-next-line no-underscore-dangle
        label: ad._id,
        value: ad.link,
      }));
      return transformedData;
    },
  }),
});
