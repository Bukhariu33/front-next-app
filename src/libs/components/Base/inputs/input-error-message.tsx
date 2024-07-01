import { Group, Text } from '@mantine/core';
import type { FC } from 'react';

import AlertIcon from '../../../icons/alert-icon';

interface InputErrorMessageProps {
  message?: string | string[];
}

const ErrorMessage = ({ message }: { message: string }) => (
  <Group className="flex w-fit flex-row flex-nowrap items-center gap-2 text-sm text-red-500 sm:text-lg">
    <AlertIcon size="xs" />
    <Text component="span" data-cy-id="input-error-message">
      {message}
    </Text>
  </Group>
);

const InputErrorMessage: FC<InputErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="mt-1" data-error>
      {Array.isArray(message) ? (
        message.map(msg => <ErrorMessage key={msg} message={msg} />)
      ) : (
        <ErrorMessage message={message} />
      )}
    </div>
  );
};

export default InputErrorMessage;
