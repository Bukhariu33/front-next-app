// eslint-disable-next-line simple-import-sort/imports
import { Skeleton } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';

import DepositFormBody from '@/libs/admin/components/Deposit/deposit-form';
import AdminIndexLayout from '@/libs/admin/layout/index-layout';
import PageHeader from '@/libs/components/Base/layout/PageHeader';
import { getSSRQuery } from '@/libs/packages/queryBuilder/get-ssr-query';
import { getDepositDetailsQueryOptions } from '@/libs/services/user/deposit/deposit-detail';

interface EditDepositDetailsProps {
  depositId: string;
}

const EditDepositDetails = ({ depositId }: EditDepositDetailsProps) => {
  const { isLoading, data: depositDetails } = useQuery(
    getDepositDetailsQueryOptions.details(depositId),
  );
  if (isLoading)
    return (
      <AdminIndexLayout>
        <Skeleton mt="20" height="50vh" radius="xl" />
      </AdminIndexLayout>
    );

  return (
    <>
      <PageHeader namespace="admin-common" title="updateDeposit" />
      <DepositFormBody type="update" data={depositDetails} />
    </>
  );
};

export default EditDepositDetails;

export const getServerSideProps: GetServerSideProps = async context => {
  const depositId = context.params?.depositId;
  const accessToken = context.req.cookies.access_token;
  const queryOptions = getDepositDetailsQueryOptions.details(
    depositId as string,
  );

  const { props: ssrProps, notFound } = await getSSRQuery(
    queryOptions,
    accessToken,
  );
  return {
    props: {
      ...ssrProps,
      depositId,
    },
    notFound,
  };
};
