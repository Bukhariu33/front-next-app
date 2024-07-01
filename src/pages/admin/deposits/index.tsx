import type { GetServerSideProps } from 'next';

import { getSSRQuery } from '@/libs/packages/queryBuilder/get-ssr-query';
import Table from '@/libs/packages/tables';
import listAdminDepositsQueryOptions from '@/libs/services/admin/deposits/list';

function Index() {
  return (
    <Table
      namespace="admin-common"
      headers={[
        'id',
        'transactionId',
        'amount',
        'gateway',
        'fullName',
        'phone',
        'status',
      ]}
      cellsType={['text', 'text', 'text', 'text','text']}
      queryOptions={listAdminDepositsQueryOptions.details}
      navigationPath="ads"
    />
  );
}

export default Index;

export const getServerSideProps = (async context => {
  const activeTab = (context.query.tab as string | undefined) ?? 'approved';
  const accessToken = context.req.cookies.access_token;
  if (!accessToken)
    return {
      props: {},
      redirect: { destination: '/admin/auth/sign-in', permanent: false },
    };

  const queryOptions = listAdminDepositsQueryOptions.details({});

  const { props: ssrProps, notFound } = await getSSRQuery(
    queryOptions,
    accessToken,
  );
  return {
    props: {
      ...ssrProps,
      activeTab,
    },
    notFound,
  };
}) satisfies GetServerSideProps;
