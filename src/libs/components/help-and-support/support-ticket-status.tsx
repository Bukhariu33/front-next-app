import { axiosInternal } from '@/libs/configs/axios';
import useSupportTicket from '@/libs/hooks/support/useSupportTicket';
import { useMutation } from '@/libs/hooks/use-mutation';
import useUser from '@/libs/hooks/useUser';
import { openSuccessModal } from '@/libs/packages/modals';
import AdminSupportListQueryOptions from '@/libs/services/admin/support/support-list';
import type { SupportTicket } from '@/libs/types/interface/support/support-ticket';
import type { Status } from '@/libs/types/status';

import StatusChip from '../Base/status-chip/status-chip';

interface SupportTicketStatusProps {
  ticketId: string | undefined;
  status: SupportTicket['status'] | undefined;
}

const options: Record<'status' | 'label', Partial<Status>>[] = [
  {
    status: 'open',
    label: 'open',
  },
  {
    status: 'inProgress',
    label: 'inProgress',
  },
  {
    status: 'resolved',
    label: 'resolved',
  },
  {
    status: 'closed',
    label: 'closed',
  },
];

function SupportTicketAdminStatus({
  ticketId,
  status: currentStatus,
}: SupportTicketStatusProps) {
  const ticketQueryOptions = useSupportTicket(ticketId!);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (status: Status) => {
      const { data } = await axiosInternal.patch(`/admin/support/${ticketId}`, {
        status,
      });
      return data.data;
    },
    onSuccess: () => {
      openSuccessModal({
        namespace: 'support',
        id: 'updateTicketStatus',
        body: 'ticketStatusUpdatedSuccessfully',
      });
    },
    revalidateOnSettled: true,
    queryOptions: [ticketQueryOptions, AdminSupportListQueryOptions],
  });

  return (
    <StatusChip
      loading={!currentStatus || isLoading}
      status={currentStatus as Status}
      editable={currentStatus !== 'closed'}
      options={options as any}
      onChange={mutateAsync}
    />
  );
}

function SupportTicketStatus({ ticketId, status }: SupportTicketStatusProps) {
  const { user } = useUser();
  if (user?.type === 'admin')
    return <SupportTicketAdminStatus ticketId={ticketId} status={status} />;

  return <StatusChip loading={!status} status={status || 'pending'} />;
}

export default SupportTicketStatus;
