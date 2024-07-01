/* eslint-disable no-underscore-dangle */
import { Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';

import PageHeader from '@/libs/components/Base/layout/PageHeader';
import useUser from '@/libs/hooks/useUser';
// Import Table with the correct path
import Table from '@/libs/packages/tables';
import listUserAdsQueryOptions from '@/libs/services/user/ads/list';
import { getUserPlanDetailsQueryOptions } from '@/libs/services/user/user-current-plan';

function Index({ userId }: { userId: string }) {
  const { user } = useUser();
  const {
    data: planDetails,
    isLoading,
    isError,
  } = useQuery(
    // Ensure that getUserPlanDetailsQueryOptions.details is correctly defined and imported
    getUserPlanDetailsQueryOptions.details(user?._id),
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error loading data</Text>;
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {planDetails?.subscription?.status === 'pending' ? (
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
          Please deposit the amount in order to view the ads
        </Text>
      ) : (
        <>
          <PageHeader namespace="admin-common" title="ads" showBack />
          <Table
            namespace="admin-common"
            headers={['id', 'amount', 'link']}
            cellsType={['text', 'text', 'text']}
            queryOptions={() => listUserAdsQueryOptions.details(userId)}
            navigationPath="ads"
          />
        </>
      )}
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const session: any = await getSession(context);
  const userId: any = session?.user?._id;

  if (!userId) {
    // Handle the case where userId is not available
    return {
      notFound: true,
    };
  }

  try {
    const { ssrProps } = (await listUserAdsQueryOptions.details(userId)) as any;

    return {
      props: {
        ...ssrProps,
        userId,
      },
    };
  } catch (error) {
    // Handle the error, for example, log it or show an error page
    console.error('Error fetching data:', error);
    return {
      notFound: true,
    };
  }
};

export default Index;
