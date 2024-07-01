// eslint-disable-next-line simple-import-sort/imports
import { Skeleton } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';

import WithdrawFormBody from '@/libs/admin/components/Withdraw/withdraw-form';
import AdminIndexLayout from '@/libs/admin/layout/index-layout';
import PageHeader from '@/libs/components/Base/layout/PageHeader';
import { getSSRQuery } from '@/libs/packages/queryBuilder/get-ssr-query';
import { getWithdrawDetailsQueryOptions } from '@/libs/services/user/withdraw/withdraw-details';

interface EditWithdrawDetailsProps {
  withdrawId: string;
}

const EditWithdrawDetails = ({ withdrawId }: EditWithdrawDetailsProps) => {
  const { isLoading, data: withDrawDetails } = useQuery(
    getWithdrawDetailsQueryOptions.details(withdrawId),
  );
  if (isLoading)
    return (
      <AdminIndexLayout>
        <Skeleton mt="20" height="50vh" radius="xl" />
      </AdminIndexLayout>
    );

  return (
    <>
      <PageHeader namespace="admin-common" title="updateWithdraw" />
      <WithdrawFormBody type="update" data={withDrawDetails} />
    </>
  );
};

export default EditWithdrawDetails;

export const getServerSideProps: GetServerSideProps = async context => {
  const withdrawId = context.params?.withdrawId;
  const accessToken = context.req.cookies.access_token;
  const queryOptions = getWithdrawDetailsQueryOptions.details(
    withdrawId as string,
  );

  const { props: ssrProps, notFound } = await getSSRQuery(
    queryOptions,
    accessToken,
  );
  return {
    props: {
      ...ssrProps,
      withdrawId,
    },
    notFound,
  };
};
