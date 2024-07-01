import { Center, Skeleton, Stack } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorBoundaryFallback from '../errorBoundryFallback';
import SupportMessage from './support-message';

interface SupportMessageListProps {
  messages: Message[] | undefined;
  isLoading: boolean;
}

function SupportMessageList({ messages, isLoading }: SupportMessageListProps) {
  const { t } = useTranslation('support');

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <Stack className="gap-2">
        {isLoading && (
          <>
            <Skeleton height={115} />
            <Skeleton height={115} />
            <Skeleton height={115} />
          </>
        )}
        {Array.isArray(messages) && messages.length > 0 && (
          <ul
            className="m-0 flex w-full list-none flex-col gap-2 p-0"
            data-cy-id="support-message-list"
          >
            {messages?.map((message: Message) => (
              <li
                key={message?.id}
                className="w-full list-none"
                data-cy-id="support-message"
              >
                <SupportMessage message={message} />
              </li>
            ))}
          </ul>
        )}

        {!isLoading && (!Array.isArray(messages) || messages.length === 0) && (
          <Center className="mb-4 mt-8 text-center text-xl font-bold">
            {t('noMessagesFound')}
          </Center>
        )}
      </Stack>
    </ErrorBoundary>
  );
}

export default SupportMessageList;
