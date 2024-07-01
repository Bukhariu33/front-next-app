import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';

import PageHeader from '@/libs/components/Base/layout/PageHeader';
import SupportTicketCard from '@/libs/components/help-and-support/support-ticket';
import { Meta } from '@/libs/components/seo/meta';
import useSupportTicket from '@/libs/hooks/support/useSupportTicket';
import useSupportTicketMessages from '@/libs/hooks/support/useSupportTicketMessages';
import type { SupportTicket } from '@/libs/types/interface/support/support-ticket';

interface UserSupportTicketProps {
  ticketId: string;
}

export default function UserSupportTicket({
  ticketId,
}: UserSupportTicketProps) {
  const { t } = useTranslation('common');

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
    <>
      <Meta title={t('helpAndSupport')} />

      <PageHeader
        namespace="support"
        title="helpAndSupport"
        showBack
        className="py-6"
      />

      <SupportTicketCard
        ticket={ticket as SupportTicket | undefined}
        messages={messages as Message[] | undefined}
        isLoading={isLoading}
        isLoadingMessages={isLoadingMessages}
      />
    </>
  );
}
