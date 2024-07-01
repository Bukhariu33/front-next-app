import { useQuery } from '@tanstack/react-query';

import useUser from '@/libs/hooks/useUser';
import { getProfileQueryOptions } from '@/libs/services/profile';

import type { UserType } from '../types/auth/user';

export default function useProfile() {
  const { user } = useUser();
  const userType = user?.type;
  const userId = user?.id as string;
  const query = useQuery({
    ...getProfileQueryOptions(userType as UserType, userId).details(),
    cacheTime: Infinity,
    staleTime: Infinity,
    enabled: !!userType,
  });
  return {
    ...query,
    data: query.data,
    userType,
  };
}
