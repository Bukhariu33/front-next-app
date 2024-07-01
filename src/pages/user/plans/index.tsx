import { Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import Link from 'next/link';

import Button from '@/libs/components/Base/Buttons/Button';
import useUser from '@/libs/hooks/useUser';
import { getSSRQuery } from '@/libs/packages/queryBuilder/get-ssr-query';
import Table from '@/libs/packages/tables';
import listUserPublicPlansQueryOptions from '@/libs/services/user/list-public-plans';
import { getUserPlanDetailsQueryOptions } from '@/libs/services/user/user-current-plan';

function Index() {
  const { user } = useUser();
  const { data: planDetails } = useQuery(
    // eslint-disable-next-line no-underscore-dangle
    getUserPlanDetailsQueryOptions.details(user?._id),
  );

  return (
    <>
      <div className="flex justify-between flex-wrap mt-[6em] sm:mt-0">
        <Text
          style={{
            fontSize: '37px',
            fontWeight: '900',
            marginTop: '10px',
            marginBottom: '-0.8em',
            marginLeft: '11px',
            fontFamily: "'circular'",
          }}
        >
          Plans
        </Text>
        <Text
          style={{
            fontSize: '20px',
            background: '#e85858',
            color: '#fff',
            borderRadius: '8px',
            padding: '19px',
            marginTop: '19px',
            cursor: 'pointer',
          }}
        >
          {planDetails?.subscription?.status === 'pending'
            ? 'Please deposit the amount in order to view the ads'
            : ''}
        </Text>
      </div>
      <Table
        namespace="admin-common"
        headers={[
          'id',
          'name',
          'planPrice',
          'dailyLimit',
          'validity',
          'referralBonus',
        ]}
        cellsType={['text', 'text', 'text', 'text']}
        queryOptions={listUserPublicPlansQueryOptions.details}
        navigationPath="ads"
        headerButton={
          <Link href="ads/create-ad">
            <Button namespace="admin-common" text="addNewads" />
          </Link>
        }
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
