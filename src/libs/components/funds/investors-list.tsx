import { useRouter } from 'next/router';

import type { QueryOptionsReturnType } from '@/libs/packages/queryBuilder';
import type { TableQueryFunctionReturn } from '@/libs/packages/tables';
import Table from '@/libs/packages/tables';
import type { FilterParams } from '@/libs/packages/tables/types';
import type { AdminFundInvestorListItem } from '@/libs/types/admin/funds/investors';

type Props = {
  listInvestorsQueryOptions: QueryOptionsReturnType<
    TableQueryFunctionReturn<'common', AdminFundInvestorListItem>,
    [
      queryParams?: FilterParams | undefined,
      activeTab?: string | undefined,
      ...args: any[],
    ]
  >;
  headerButton?: React.ReactNode;
};

const InvestorsList = ({ listInvestorsQueryOptions, headerButton }: Props) => {
  const router = useRouter();
  const { fundId } = router.query;
  return (
    <div>
      <div id="portal-floating-header-child" className="flex justify-between" />
      <Table
        namespace="common"
        headers={[
          'id',
          'name',
          'nationalId',
          'dateOfBirth',
          'email',
          'PhoneNumber',
          'units',
          'totalAmount',
          'unitPrice',
        ]}
        cellsType={[
          'link',
          'text',
          'number',
          'date',
          'text',
          'text',
          'number',
          'money',
          'money',
        ]}
        queryOptions={listInvestorsQueryOptions.details}
        args={[fundId]}
        tabs={[
          {
            label: 'retailInvestors',
            value: 'retailInvestors',
          },
          {
            label: 'qualifiedInvestors',
            value: 'qualifiedInvestors',
          },
          {
            label: 'corporateInvestors',
            value: 'corporateInvestors',
          },
        ]}
        defaultTab="retailInvestors"
        headerButton={headerButton}
      />
    </div>
  );
};

export default InvestorsList;
