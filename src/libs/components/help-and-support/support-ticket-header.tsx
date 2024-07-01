import { Flex, Stack, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import type { PropsWithChildren } from 'react';

import type { SupportTicket } from '@/libs/types/interface/support/support-ticket';

interface SupportTicketHeaderProps extends PropsWithChildren {
  ticket: SupportTicket | undefined;
}

function SupportTicketHeader({ ticket, children }: SupportTicketHeaderProps) {
  const { t } = useTranslation('support');

  return (
    <Flex className="flex-wrap justify-between">
      <Flex className="gap-8 md:gap-16">
        {/* TITLE */}
        <Stack className="gap-2">
          <Text className="font-medium text-[#64646C]">{t('mainAddress')}</Text>
          <Text className="font-bold text-brand-primary-500">
            {ticket && ticket.title}
          </Text>
        </Stack>

        {/* CATEGORY */}
        <Stack className="gap-2">
          <Text className="font-medium text-[#64646C]">{t('category')}</Text>
          <Text className="font-bold text-brand-primary-500">
            {ticket && ticket.category}
          </Text>
        </Stack>
      </Flex>

      <div>{children}</div>
    </Flex>
  );
}

export default SupportTicketHeader;
