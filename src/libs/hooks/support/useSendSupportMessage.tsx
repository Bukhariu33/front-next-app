import { axiosInternal } from '@/libs/configs/axios';
import type { SupportMessageFormType } from '@/libs/types/interface/support/Support-Forms';

import useUser from '../useUser';

interface HookProps {
  ticketId: string;
}

type MessageSenderFn = (
  values: SupportMessageFormType,
) => Promise<APIResponse<Message>>;

function useSendSupportMessage({ ticketId }: HookProps): MessageSenderFn {
  const { user } = useUser();

  return async (values: SupportMessageFormType) => {
    const endpoint =
      user?.type === 'admin'
        ? `/admin/support/${ticketId}/messages`
        : `/support/${ticketId}/messages`;
    const { data } = await axiosInternal.post<APIResponse<Message>>(
      endpoint,
      values,
    );
    return data;
  };
}

export default useSendSupportMessage;
