import DownloadLinkButton from '@/libs/components/Base/DownloadLinkButton';
import { axiosInternal } from '@/libs/configs/axios';
import type { FilterParams } from '@/libs/packages/tables/types';
import { initTableData } from '@/libs/packages/tables/utils';
import type { APIResponseAdminFundReportList } from '@/libs/types/admin/funds/fund-report';
import type {
  APIResponseUploadReport,
  UploadProps,
} from '@/libs/types/base/uploadFundReport';
import { createQKey, createQueryOptions } from '@/packages/queryBuilder';

const adminFundReportQueryOptions = createQueryOptions({
  key: createQKey('admin', 'fund-report'),
  detail(
    queryParams?: FilterParams,
    _activeTab?: string,
    fundId?: string,
    ..._args: any[]
  ) {
    return {
      queryFn: async () => {
        const { data } =
          await axiosInternal.get<APIResponseAdminFundReportList>(
            `/admin/funds/${fundId}/fund-report`,
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

export const uploadReport = async (payload: UploadProps) => {
  const { data } = await axiosInternal.post<APIResponseUploadReport>(
    `/admin/funds/${payload.fundId}/fund-report`,
    payload.attachments,
  );

  return data;
};

export default adminFundReportQueryOptions;
