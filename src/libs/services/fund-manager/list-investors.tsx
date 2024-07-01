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
import { fundInvestorQueryOptions } from '@/libs/services/fund-manager/fund-investor-detatils';
import type { APIResponseFundManagerInvestorListItem } from '@/libs/types/fund-managers/investors';
import { createQKey, createQueryOptions } from '@/packages/queryBuilder';

const listInvestorsQueryOptions = createQueryOptions({
  key: createQKey('fundManager', 'Investor-list'),
  detail(queryParams?: FilterParams, activeTab?: string, ...args: any[]) {
    const fundId = args[0];
    return {
      queryFn: async () => {
        const { data } =
          await axiosInternal.get<APIResponseFundManagerInvestorListItem>(
            `fund-manager/funds/${fundId}/investors-list`,
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
                      fundInvestorQueryOptions={fundInvestorQueryOptions}
                    />
                  ),
                  classNames: {
                    title: 'w-full',
                  },
                  children: (
                    <InvestorInformationModalContent
                      investorId={row.id}
                      fundInvestorQueryOptions={fundInvestorQueryOptions}
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

export default listInvestorsQueryOptions;
