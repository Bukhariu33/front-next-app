import { Skeleton } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';

import AdsFormBody from '@/libs/admin/components/Ads/ads-form';
import AdminIndexLayout from '@/libs/admin/layout/index-layout';
import { getSSRQuery } from '@/libs/packages/queryBuilder/get-ssr-query';
import { getAdsDetailsQueryOptions } from '@/libs/services/admin/fund-managers/ads-details';

interface EditAdsDetailsProps {
  adsId: string;
}

const EditAdsDetails = ({ adsId }: EditAdsDetailsProps) => {
  const { isLoading, data: userDetails } = useQuery(
    getAdsDetailsQueryOptions.details(adsId),
  );

  if (isLoading)
    return (
      <AdminIndexLayout>
        <Skeleton mt="20" height="50vh" radius="xl" />
      </AdminIndexLayout>
    );

  return (
    <AdminIndexLayout>
      <AdsFormBody data={userDetails} type="update" />
    </AdminIndexLayout>
  );
};

export default EditAdsDetails;

export const getServerSideProps: GetServerSideProps = async context => {
  const adsId = context.params?.adId;
  const accessToken = context.req.cookies.access_token;
  const queryOptions = getAdsDetailsQueryOptions.details(adsId as string);

  const { props: ssrProps, notFound } = await getSSRQuery(
    queryOptions,
    accessToken,
  );
  return {
    props: {
      ...ssrProps,
      adsId,
    },
    notFound,
  };
};
