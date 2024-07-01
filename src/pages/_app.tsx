import '@/styles/global.css';

import type { NextPage } from 'next';
import type { AppProps as DefaultAppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import type { FC, ReactNode } from 'react';
import { Suspense } from 'react';

import Layout from '@/libs/components/Base/layout/RootLayout';
import AppProvider from '@/libs/components/providers/AppProvider';
import { RouterTransition } from '@/libs/components/routerTransitions';
import { SeoConfig } from '@/libs/configs/appConfig';

import NextI18nextConfig from '../../next-i18next.config';

interface AppProps extends DefaultAppProps {
  Component: NextPage;
}

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const getLayout =
    Component.getLayout ?? ((page: ReactNode) => <Layout>{page}</Layout>);

  return (
    <>
      <DefaultSeo {...SeoConfig} />
      <AppProvider
        session={pageProps?.session}
        dehydratedState={pageProps?.dehydratedState}
      >
        <RouterTransition />
        {getLayout(
          <Suspense fallback={null}>
            <Component {...pageProps} />
          </Suspense>,
        )}
      </AppProvider>
    </>
  );
};

export default appWithTranslation<AppProps>(MyApp, NextI18nextConfig);
