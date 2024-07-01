import { useQuery } from '@tanstack/react-query';

import SupportTicketCard from '@/libs/components/help-and-support/support-ticket';
import useSupportTicket from '@/libs/hooks/support/useSupportTicket';
import useSupportTicketMessages from '@/libs/hooks/support/useSupportTicketMessages';
import type { SupportTicket } from '@/libs/types/interface/support/support-ticket';

interface AdminSupportTicketProps {
  ticketId: string;
}

export default function AdminSupportTicket({
  ticketId,
}: AdminSupportTicketProps) {
  /*  QUERY OPTIONS  */
  const { options: ticketOptions } = useSupportTicket(ticketId);
  const { options: messagesOptions } = useSupportTicketMessages(ticketId);

  /*  TICKET DETAILS QUERY  */
  const { data: ticket, isLoading } = useQuery({
    ...ticketOptions,
  });

  /*  TICKET MESSAGES QUERY  */
  const { data: messages, isLoading: isLoadingMessages } = useQuery({
    ...messagesOptions,
  });

  return (
    <SupportTicketCard
      ticket={ticket as SupportTicket}
      messages={messages as Message[]}
      isLoading={isLoading}
      isLoadingMessages={isLoadingMessages}
    />
  );
}
