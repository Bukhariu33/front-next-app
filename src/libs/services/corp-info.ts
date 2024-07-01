import { createQKey, createQueryOptions } from '@/packages/queryBuilder';
import type { APIResponseCompanyDetails } from '@/pages/api/corp/[crNumber]';

import { axiosInternal } from '../configs/axios';

const getCorpInfo = async (corpId: string) => {
  const { data } = await axiosInternal.get<APIResponseCompanyDetails>(
    `/corp/${corpId}`,
  );
  return data.data;
};

const corpInfoQueryOptions = createQueryOptions({
  key: createQKey('Global', 'corpInfo'),
  detail: (corpId: string) => ({
    queryFn: () => getCorpInfo(corpId),
    enabled: !!corpId,
  }),
});

export { corpInfoQueryOptions };
