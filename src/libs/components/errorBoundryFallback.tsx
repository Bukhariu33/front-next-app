import { Button, Flex, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import type { FallbackProps } from 'react-error-boundary';

function ErrorBoundaryFallback({
  error,
  resetErrorBoundary,
}: FallbackProps): React.ReactElement<
  unknown,
  string | typeof React.Component | React.FunctionComponent<{}>
> | null {
  const message =
    typeof error.message === 'string'
      ? error.message
      : JSON.stringify(error.message);
  return (
    <Stack gap={4} w="fit-content" p={4}>
      <Flex justify="center" gap={16} p={4}>
        <Stack>
          <Title size="lg" className="text-red-500">
            Oops!
          </Title>
          <Text fs="xl" fw="bold">
            {message}
          </Text>
        </Stack>
      </Flex>
      <Button variant="outline" onClick={resetErrorBoundary}>
        reset
      </Button>
    </Stack>
  );
}

export default ErrorBoundaryFallback;
