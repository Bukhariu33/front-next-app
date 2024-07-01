import { modals } from '@mantine/modals';

import DownloadIcon from '@/icons/download-icon';
import MoreIfnoIcon from '@/icons/more-info-icon';
import {
  InvestorInformationModalContent,
  InvestorInformationModalHeader,
} from '@/libs/components/funds/InvestorInformationModal';
import { axiosInternal } from '@/libs/configs/axios';
import type { FilterParams } from '@/libs/packages/tables/types';
import { initTableData } from '@/libs/packages/tables/utils';
import type { APIResponseAdminFundInvestorListItem } from '@/libs/types/admin/funds/investors';
import { createQKey, createQueryOptions } from '@/packages/queryBuilder';

import { adminFundInvestorQueryOptions } from './fund-investor-detatils';

const adminListFundInvestorsQueryOptions = createQueryOptions({
  key: createQKey('admin', 'fund-investor-list'),
  detail(queryParams?: FilterParams, activeTab?: string, ...args: any[]) {
    const fundId = args[0];
    return {
      queryFn: async () => {
        const { data } =
          await axiosInternal.get<APIResponseAdminFundInvestorListItem>(
            `/admin/funds/${fundId}/investors-list`,
            {
              params: {
                ...queryParams,
                investorType: activeTab,
                ...args,
              },
            },
          );
        const tableData = initTableData<(typeof data.data)[0], 'common'>(
          data.data,
          [
            'name',
            'nationalId',
            'dateOfBirth',
            'email',
            'phoneNumber',
            'units',
            'totalAmount',
            'unitPrice',
          ],
          data.meta,
          [
            {
              label: 'kyc',
              icon: <DownloadIcon />,
              variant: 'primary',
              onClick: () => {},
            },
            {
              label: 'more',
              icon: <MoreIfnoIcon />,
              variant: 'outlined-black',
              onClick: row => {
                modals.open({
                  size: '800px',
                  withCloseButton: false,
                  modalId: 'investorInfo',
                  title: (
                    <InvestorInformationModalHeader
                      investorId={row.id}
                      fundInvestorQueryOptions={adminFundInvestorQueryOptions}
                    />
                  ),
                  classNames: {
                    title: 'w-full',
                  },
                  children: (
                    <InvestorInformationModalContent
                      investorId={row.id}
                      fundInvestorQueryOptions={adminFundInvestorQueryOptions}
                    />
                  ),
                });
              },
            },
          ],
          undefined,
        );
        return tableData;
      },
    };
  },
});

export default adminListFundInvestorsQueryOptions;
