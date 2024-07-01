import type { GetServerSideProps } from 'next';
import { useRef } from 'react';

import { EPermission } from '@/libs/configs/appConfig';
import useLanguage from '@/libs/hooks/useLanguage';
import { acl } from '@/libs/packages/acl';
import { ProtectedView } from '@/libs/packages/acl/components/ProtectedView';
import { getSSRQuery } from '@/libs/packages/queryBuilder/get-ssr-query';
import Table from '@/libs/packages/tables';
import { SortFilter } from '@/libs/packages/tables/filters/Builders/SortFilter';
import listInvestorsQueryOptions from '@/libs/services/admin/investors/list-investors';
import { SORT_FILTER_OPTIONS } from '@/utils/sort-filter-options';

const REQUIRE_PERMISSION: EPermission[] = [EPermission.ReadInvestors];

function Index({
  activeTab,
  can,
}: {
  activeTab: string;
  can: Record<string, boolean>;
}) {
  const { language } = useLanguage();

  const filters = useRef({
    sortFilter: new SortFilter(SORT_FILTER_OPTIONS, 'sort', 'common'),
  }).current;

  return (
    <ProtectedView can={can} required={[EPermission.ReadInvestors]}>
      <Table
        namespace="admin-common"
        headers={[
          'id',
          'name',
          'idCr',
          'email',
          'phone',
          'registrationDate',
          'type',
        ]}
        cellsType={['link', 'text', 'text', 'text', 'text', 'date', 'text']}
        args={[language]}
        queryOptions={listInvestorsQueryOptions.details}
        tabs={[
          {
            label: 'all',
            value: 'all',
          },
          {
            label: 'retail',
            value: 'individual',
          },
          {
            label: 'qualified',
            value: 'qualified',
          },
          {
            label: 'institutional',
            value: 'corporate',
          },
        ]}
        defaultTab={activeTab}
        filters={filters}
        navigationPath="investors"
      />
    </ProtectedView>
  );
}

export default Index;

export const getServerSideProps = (async context => {
  const activeTab = (context.query.tab as string | undefined) ?? 'all';
  const accessToken = context.req.cookies.access_token;

  if (!accessToken)
    return {
      props: {},
      redirect: { destination: '/admin/auth/sign-in', permanent: false },
    };
  const can = await acl.canAccessAll(accessToken, REQUIRE_PERMISSION);
  const queryOptions = listInvestorsQueryOptions.details({}, 'all');

  const { props: ssrProps, notFound } = await getSSRQuery(
    queryOptions,
    accessToken,
  );

  return {
    props: {
      ...ssrProps,
      activeTab,
      can,
    },
    notFound,
  };
}) satisfies GetServerSideProps;
