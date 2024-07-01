import { useSession } from 'next-auth/react';

function useUser(): any {
  const { data, status, update } = useSession();
  const user = data?.user;

  if (status === 'loading') {
    return {
      user: undefined,
      status,
    };
  }

  if (status === 'unauthenticated' || !user) {
    return {
      user: undefined,
      status,
    };
  }

  return {
    user: {
      ...user,
    },

    status,
    update,
  };
}

export default useUser;
