import { useQuery } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import Link from 'next/link';

import Button from '@/libs/components/Base/Buttons/Button';
import PageHeader from '@/libs/components/Base/layout/PageHeader';
import useUser from '@/libs/hooks/useUser';
import { getSSRQuery } from '@/libs/packages/queryBuilder/get-ssr-query';
import Table from '@/libs/packages/tables';
import listUserDepositQueryOptions from '@/libs/services/user/deposit/list';
import listUserPublicPlansQueryOptions from '@/libs/services/user/list-public-plans';
import { getUserPlanDetailsQueryOptions } from '@/libs/services/user/user-current-plan';

function Index() {
  const { user } = useUser();
  const { data: planDetails } = useQuery(
    // eslint-disable-next-line no-underscore-dangle
    getUserPlanDetailsQueryOptions.details(user?._id),
  );
  console.log('Here is my plan details: ', planDetails);
  return (
    <>
      <div
        style={{
          marginTop: '4.5em',
          marginBottom: '-3em',
        }}
      >
        <PageHeader namespace="admin-common" title="Deposits" showBack>
          <Link href="/user/deposit/create-deposit">
            <Button
              namespace="admin-common"
              text="createdeposit"
              disabled={planDetails === undefined}
            />
          </Link>
        </PageHeader>
      </div>

      <Table
        namespace="admin-common"
        headers={['id', 'transactionId', 'amount', 'gateway']}
        cellsType={['text', 'text', 'text']}
        queryOptions={listUserDepositQueryOptions.details}
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

  const queryOptions = listUserPublicPlansQueryOptions.details({});

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
