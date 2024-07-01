import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import Profile from '@/libs/components/profile/Profile';
import useProfile from '@/libs/hooks/useProfile';
import { getSSRQuery } from '@/libs/packages/queryBuilder';
import { getProfileQueryOptions } from '@/libs/services/profile';
import type { UserType } from '@/libs/types/auth';

export default function ProfileEdit() {
  const { data: profile, isLoading, userType } = useProfile();

  return (
    <Profile
      profile={profile}
      userType={userType}
      isLoading={isLoading}
      isEditable
    />
  );
}

export const getServerSideProps = (async context => {
  const session = await getSession(context);
  const accessToken = context.req.cookies.access_token;
  const userType = session?.user?.type as UserType;
  const userId = session?.user?.id as string;
  const queryOptions = getProfileQueryOptions(userType, userId).details();
  const { props: ssrProps, notFound } = await getSSRQuery(
    queryOptions,
    accessToken,
  );
  return {
    props: {
      ...ssrProps,
    },
    notFound,
  };
}) satisfies GetServerSideProps;
