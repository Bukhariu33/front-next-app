import DownloadLinkButton from '@/libs/components/Base/DownloadLinkButton';
import { axiosInternal } from '@/libs/configs/axios';
import type { FilterParams } from '@/libs/packages/tables/types';
import { initTableData } from '@/libs/packages/tables/utils';
import type { APIResponseFundReportList } from '@/libs/types/fund-managers/funds/fund-report';
import { createQKey, createQueryOptions } from '@/packages/queryBuilder';

const InvestorFundReportQueryOptions = createQueryOptions({
  key: createQKey('individualInvestor', 'investor-fund-report'),
  detail(
    queryParams?: FilterParams,
    _activeTab?: string,
    id?: string,
    ..._args: any[]
  ) {
    return {
      queryFn: async () => {
        const { data } = await axiosInternal.get<APIResponseFundReportList>(
          `/investor/investments/${id}/fund-report`,
          {
            params: {
              ...queryParams,
            },
          },
        );
        const tableData = initTableData<(typeof data.data)[0], 'fund'>(
          data.data,
          ['reportSharingDate'],
          data.meta,
          [
            {
              type: 'component',
              component: props => (
                <DownloadLinkButton href={props.rowData.reportLink} />
              ),
            },
          ],
          undefined,
        );
        return tableData;
      },
    };
  },
});

export default InvestorFundReportQueryOptions;
