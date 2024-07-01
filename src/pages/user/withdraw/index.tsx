import { useQuery } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import Link from 'next/link';

import Button from '@/libs/components/Base/Buttons/Button';
import PageHeader from '@/libs/components/Base/layout/PageHeader';
import useUser from '@/libs/hooks/useUser';
import { getSSRQuery } from '@/libs/packages/queryBuilder/get-ssr-query';
import Table from '@/libs/packages/tables';
import { getUserPlanDetailsQueryOptions } from '@/libs/services/user/user-current-plan';
import listUserWithdrawQueryOptions from '@/libs/services/user/withdraw/list';

function Index() {
  const { user } = useUser();
  const { data: planDetails } = useQuery(
    // eslint-disable-next-line no-underscore-dangle
    getUserPlanDetailsQueryOptions.details(user?._id),
  );
  return (
    <>
      <div
        style={{
          marginTop: '4.5em',
          marginBottom: '-3em',
        }}
      >
        <PageHeader namespace="admin-common" title="Withdraws" showBack>
          <Link href="/user/withdraw/create-withdraw">
            <Button
              namespace="admin-common"
              text="createWithdraw"
              disabled={planDetails === undefined}
            />
          </Link>
        </PageHeader>
      </div>
      <Table
        namespace="admin-common"
        headers={['id', 'accountNumber', 'amount', 'gateway']}
        cellsType={['text', 'text', 'text']}
        queryOptions={listUserWithdrawQueryOptions.details}
        navigationPath="ads"
      />
    </>
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

  const queryOptions = listUserWithdrawQueryOptions.details({});

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
