import DownloadLinkButton from '@/libs/components/Base/DownloadLinkButton';
import { axiosInternal } from '@/libs/configs/axios';
import type { FilterParams } from '@/libs/packages/tables/types';
import { initTableData } from '@/libs/packages/tables/utils';
import type {
  APIResponseUploadReport,
  UploadProps,
} from '@/libs/types/base/uploadFundReport';
import type { APIResponseFundReportList } from '@/libs/types/fund-managers/funds/fund-report';
import { createQKey, createQueryOptions } from '@/packages/queryBuilder';

const fundReportQueryOptions = createQueryOptions({
  key: createQKey('fundManager', 'fund-report'),
  detail(
    queryParams?: FilterParams,
    _activeTab?: string,
    fundId?: string,
    ..._args: any[]
  ) {
    return {
      queryFn: async () => {
        const { data } = await axiosInternal.get<APIResponseFundReportList>(
          `/fund-manager/funds/${fundId}/fund-report`,
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
          [data.meta.total, data.meta.total],
        );
        return tableData;
      },
    };
  },
});

export const uploadReport = async (payload: UploadProps) => {
  const { data } = await axiosInternal.post<APIResponseUploadReport>(
    `/fund-manager/funds/${payload.fundId}/fund-report`,
    payload.attachments,
  );

  return data;
};

export default fundReportQueryOptions;
