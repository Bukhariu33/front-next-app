import { Skeleton } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';

import PlanFormBody from '@/libs/admin/components/plans/plans-form';
import AdminIndexLayout from '@/libs/admin/layout/index-layout';
import { getSSRQuery } from '@/libs/packages/queryBuilder/get-ssr-query';
import { getPlanDetailsQueryOptions } from '@/libs/services/admin/plans/plan-details';

interface EditPlanDetailsProps {
  planId: string;
}

const EditPlansDetails = ({ planId }: EditPlanDetailsProps) => {
  const { isLoading, data: planDetails } = useQuery(
    getPlanDetailsQueryOptions.details(planId),
  );
  if (isLoading)
    return (
      <AdminIndexLayout>
        <Skeleton mt="20" height="50vh" radius="xl" />
      </AdminIndexLayout>
    );

  return (
    <AdminIndexLayout>
      <PlanFormBody data={planDetails} type="update" />
    </AdminIndexLayout>
  );
};

export default EditPlansDetails;

export const getServerSideProps: GetServerSideProps = async context => {
  const planId = context.params?.planId;
  const accessToken = context.req.cookies.access_token;
  const queryOptions = getPlanDetailsQueryOptions.details(planId as string);

  const { props: ssrProps, notFound } = await getSSRQuery(
    queryOptions,
    accessToken,
  );
  return {
    props: {
      ...ssrProps,
      planId,
    },
    notFound,
  };
};
