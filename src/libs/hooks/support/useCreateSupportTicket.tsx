import { axiosInternal } from '@/libs/configs/axios';
import type { SupportFormType } from '@/libs/types/interface/support/Support-Forms';
import type { SupportTicket } from '@/libs/types/interface/support/support-ticket';

type TicketCreationFn = (
  values: SupportFormType,
) => Promise<APIResponse<SupportTicket>>;

function useCreateSupportTicket(): TicketCreationFn {
  return async (values: SupportFormType) => {
    const endpoint = `/support/create-ticket`;
    const { data } = await axiosInternal.post<APIResponse<SupportTicket>>(
      endpoint,
      values,
    );
    return data;
  };
}

export default useCreateSupportTicket;
