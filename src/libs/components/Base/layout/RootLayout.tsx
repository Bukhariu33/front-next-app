import { AppShell, type AppShellProps } from '@mantine/core';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import AdminRootLayout from '@/libs/admin/layout/RootLayout';
import Footer from '@/libs/components/Base/layout/Footer';
import { cn } from '@/utils/cn';

import { GradientBg } from '../../auth/gradiant-background';
import Navbar from './Header/Navbar';

const hideFooterPaths = ['/auth', '/investor/kyc', '/admin', '/profile/'];

interface RootLayoutProps extends AppShellProps {}

function RootLayout({ children, ...props }: RootLayoutProps) {
  const { ready, i18n } = useTranslation();
  const lang = i18n.language;
  const cookie = getCookie('NEXT_LOCALE');
  if (i18n.language !== cookie) setCookie('NEXT_LOCALE', lang);
  const { pathname } = useRouter();

  const hideFooter =
    hideFooterPaths.findIndex(path => pathname.includes(path)) !== -1;

  const isAuthPage = pathname.includes('/auth');
  const isAdmin = pathname.includes('/admin');

  if (ready)
    return (
      <AppShell
        {...props}
        header={{
          height: {
            xs: 90,
            md: 120,
            lg: 140,
          },
        }}
        classNames={{
          root: cn('min-h-screen'),
          main: cn({
            'p-0': isAuthPage,
            'px-8': !isAuthPage && !isAdmin,
          }),
        }}
      >
        <Navbar variant={isAuthPage ? 'white' : 'main'} />
        <AppShell.Main>
          <GradientBg />
          {isAdmin && !isAuthPage ? (
            <AdminRootLayout>{children}</AdminRootLayout>
          ) : (
            children
          )}
        </AppShell.Main>

        {!hideFooter && <Footer />}
      </AppShell>
    );
  return null;
}

export default RootLayout;
