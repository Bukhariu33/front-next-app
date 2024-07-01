import { axiosInternal } from '@/libs/configs/axios';
import type { APIResponseFundInvestorDetails } from '@/libs/types/interface/fund/investor-data';
import { createQKey, createQueryOptions } from '@/packages/queryBuilder';

const getInvestorInfo = async (investorId: string, fundId: string) => {
  const { data } = await axiosInternal.get<APIResponseFundInvestorDetails>(
    `admin/funds/${fundId}/investors-list/${investorId}`,
  );
  return data.data;
};

const adminFundInvestorQueryOptions = createQueryOptions({
  key: createQKey('admin', 'investor-data'),
  detail: (investorId: string, fundId: string) => ({
    queryFn: () => getInvestorInfo(investorId, fundId),
    enabled: !!investorId,
  }),
});

export { adminFundInvestorQueryOptions };
