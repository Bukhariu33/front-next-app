import { Card, LoadingOverlay, Stack } from '@mantine/core';

import type { SupportTicket } from '@/libs/types/interface/support/support-ticket';

import SupportMessageForm from './support-message-form';
import SupportMessageList from './support-message-list';
import SupportTicketHeader from './support-ticket-header';
import SupportTicketStatus from './support-ticket-status';

interface SupportTicketProps {
  ticket: SupportTicket | undefined;
  messages: Message[] | undefined;

  isLoading: boolean;
  isLoadingMessages: boolean;
}

export default function SupportTicketCard({
  ticket,
  messages,
  isLoading,
  isLoadingMessages,
}: SupportTicketProps) {
  return (
    <Card className="relative flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm">
      <LoadingOverlay visible={isLoading} zIndex={1000} />
      <Stack>
        {/* HEADER */}
        <SupportTicketHeader ticket={ticket}>
          <SupportTicketStatus ticketId={ticket?.id!} status={ticket?.status} />
        </SupportTicketHeader>

        {/* MESSAGE FORM */}
        {ticket?.status !== 'closed' && (
          <SupportMessageForm ticketId={ticket?.id!} />
        )}

        {/* MESSAGES LIST */}
        <SupportMessageList messages={messages} isLoading={isLoadingMessages} />
      </Stack>
    </Card>
  );
}
