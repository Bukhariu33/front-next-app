import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';

import { DirectionProvider, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import {
  Hydrate,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosError } from 'axios';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { RecoilRoot } from 'recoil';

import unAuthoredHandler from '@/libs/Error-Handlers/RQ/unauthed';
import useLanguage from '@/libs/hooks/useLanguage';
import { modals } from '@/libs/packages/modals';
import theme from '@/libs/theme';

import ErrorBoundaryFallback from '../errorBoundryFallback';

function AppProvider({
  children,
  session,
  dehydratedState,
}: {
  children: React.ReactNode;
  session: Session | null | undefined;
  dehydratedState: unknown;
}) {
  const { language } = useLanguage();
  const queryCache = new QueryCache({
    onError: err => {
      console.log('Fetch Error: ', err);
      if (err instanceof AxiosError) {
        // serverIsDown(err);
        unAuthoredHandler(err);
      }
    },
  });

  const notificationPosition = language === 'en' ? 'top-left' : 'top-right';
  const [queryClient] = useState<QueryClient>(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnMount: false,
            staleTime: 4 * 60 * 1000,
          },
        },
        queryCache,
      }),
  );
  return (
    <DirectionProvider>
      <MantineProvider theme={theme}>
        <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
          <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false} />
              <ModalsProvider
                modals={modals}
                modalProps={{
                  centered: true,
                }}
              >
                <Notifications
                  position={notificationPosition}
                  autoClose={5000}
                  classNames={{
                    notification: 'min-h-[45px]',
                  }}
                  color="primary"
                />
                <Hydrate state={dehydratedState}>
                  <RecoilRoot>{children}</RecoilRoot>
                </Hydrate>
              </ModalsProvider>
            </QueryClientProvider>
          </SessionProvider>
        </ErrorBoundary>
      </MantineProvider>
    </DirectionProvider>
  );
}

export default AppProvider;
