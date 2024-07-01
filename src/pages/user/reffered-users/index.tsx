import { CopyButton, Input } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useQuery } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';

import Button from '@/libs/components/Base/Buttons/Button';
import PageHeader from '@/libs/components/Base/layout/PageHeader';
import useUser from '@/libs/hooks/useUser';
import { getSSRQuery } from '@/libs/packages/queryBuilder/get-ssr-query';
import Table from '@/libs/packages/tables';
import listRefferedUserQueryOptions from '@/libs/services/user/reffered-user';
import { getUserPlanDetailsQueryOptions } from '@/libs/services/user/user-current-plan';

function Index() {
  const { user } = useUser();
  const refferalURL = `https://network-buxx-webapp.vercel.app/auth/register/user?refferalCode=${user?.referralCode}`;
  const { data: planDetails } = useQuery(
    // eslint-disable-next-line no-underscore-dangle
    getUserPlanDetailsQueryOptions.details(user?._id),
  );
  return (
    <>
      <PageHeader namespace="admin-common" title="refferedUser" showBack />
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input value={`${refferalURL}`} className="w-full" />
        <CopyButton value={`${refferalURL}`}>
          {({ copy }) => (
            <Button
              onClick={() => {
                copy();
                notifications.show({
                  title: 'Copied',
                  message: 'Copied to clipboard',
                });
              }}
              text="CopyToClipboard"
              namespace="admin-common"
              disabled={
                planDetails === undefined
                  ? true
                  : planDetails?.subscription?.status === 'pending'
              }
            />
          )}
        </CopyButton>
      </div>
      <Table
        namespace="admin-common"
        headers={['id', 'name', 'email']}
        cellsType={['text', 'text', 'text']}
        queryOptions={listRefferedUserQueryOptions.details}
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

  const queryOptions = listRefferedUserQueryOptions.details({});

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
