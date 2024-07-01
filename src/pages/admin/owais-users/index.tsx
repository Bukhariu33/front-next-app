import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRef } from 'react';

import Button from '@/libs/components/Base/Buttons/Button';
import { getSSRQuery } from '@/libs/packages/queryBuilder';
import Table from '@/libs/packages/tables';
import { DateRangeFilter } from '@/libs/packages/tables/filters/Builders/DateRange';
import { SearchFilter } from '@/libs/packages/tables/filters/Builders/Search-Filter';
import { SortFilter } from '@/libs/packages/tables/filters/Builders/SortFilter';
import listOwaisUsersQueryOptions from '@/libs/services/admin/owais-users/list-owais-users';

function OwaisUsers() {
  const filters = useRef({
    searchFilter: new SearchFilter('email'),
    DateFilter: new DateRangeFilter(),
    sortFilter: new SortFilter(
      [
        {
          label: 'id',
          value: 'id',
        },
        {
          label: 'createdAt',
          value: 'created_at',
        },
        {
          label: 'email',
          value: 'email',
        },
        {
          label: 'id (DESC)',
          value: '-id',
        },
        {
          label: 'createdAt (DESC)',
          value: '-created_at',
        },
        {
          label: 'email (DESC)',
          value: '-email',
        },
      ],
      'sort',
      'admin-common',
    ),
  }).current;

  return (
    <Table
      namespace="admin-common"
      headers={['id', 'name', 'email', 'phone', 'role', 'status']}
      cellsType={['link', 'text', 'text', 'text', 'text', 'status']}
      queryOptions={listOwaisUsersQueryOptions.details}
      filters={filters}
      navigationPath="admin"
      headerButton={
        <Link href="owais-users/create-owais-user">
          <Button namespace="admin-common" text="addNewOwaisUser" />
        </Link>
      }
    />
  );
}

export default OwaisUsers;

export const getServerSideProps = (async context => {
  const accessToken = context.req.cookies.access_token;

  const queryOptions = listOwaisUsersQueryOptions.details({});

  const { props: ssrProps, notFound } = await getSSRQuery(
    queryOptions,
    accessToken,
  );
  return {
    props: {
      ...ssrProps,
    },
    notFound,
  };
}) satisfies GetServerSideProps;
