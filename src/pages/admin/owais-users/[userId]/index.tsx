import { Skeleton } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';

import OwaisUserFormBody from '@/libs/admin/components/owais-users/OwaisUserForm';
import AdminIndexLayout from '@/libs/admin/layout/index-layout';
import { getSSRQuery } from '@/libs/packages/queryBuilder/get-ssr-query';
import { getOwaisUserDetailsQueryOptions } from '@/libs/services/admin/owais-users/owais-user-details';

interface EditOwaisUserProps {
  userId: string;
}

const EditOwaisUser = ({ userId }: EditOwaisUserProps) => {
  const { isLoading, data: userDetails } = useQuery(
    getOwaisUserDetailsQueryOptions.details(userId),
  );

  if (isLoading)
    return (
      <AdminIndexLayout>
        <Skeleton mt="20" height="50vh" radius="xl" />
      </AdminIndexLayout>
    );

  return (
    <AdminIndexLayout>
      <OwaisUserFormBody data={userDetails} type="update" />
    </AdminIndexLayout>
  );
};

export default EditOwaisUser;

export const getServerSideProps: GetServerSideProps = async context => {
  const userId = context.params?.userId;
  const accessToken = context.req.cookies.access_token;
  const queryOptions = getOwaisUserDetailsQueryOptions.details(
    userId as string,
  );

  const { props: ssrProps, notFound } = await getSSRQuery(
    queryOptions,
    accessToken,
  );
  return {
    props: {
      ...ssrProps,
      userId,
    },
    notFound,
  };
};
