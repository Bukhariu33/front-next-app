import { openInfoModal } from '@/libs/packages/modals';

export const serverIsDown = async (error: any) => {
  if ((error?.response?.status || error.status) >= 500) {
    openInfoModal({
      body: 'serverDownUserFriendly',
      namespace: 'common',
      id: 'error',
    });
  }
};
