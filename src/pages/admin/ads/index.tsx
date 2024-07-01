import type { GetServerSideProps } from 'next';
import Link from 'next/link';

import Button from '@/libs/components/Base/Buttons/Button';
import { getSSRQuery } from '@/libs/packages/queryBuilder/get-ssr-query';
import Table from '@/libs/packages/tables';
import listAdminAdsQueryOptions from '@/libs/services/admin/fund-managers/list-managers';

function Index() {
  return (
    <Table
      namespace="admin-common"
      headers={['id', 'link', 'amount', 'duration']}
      cellsType={['text', 'text', 'text', 'text']}
      queryOptions={listAdminAdsQueryOptions.details}
      navigationPath="ads"
      headerButton={
        <Link href="ads/create-ad">
          <Button namespace="admin-common" text="addNewads" />
        </Link>
      }
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

  const queryOptions = listAdminAdsQueryOptions.details({});

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
