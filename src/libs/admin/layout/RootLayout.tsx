import { useRouter } from 'next/router';
import type { FC } from 'react';

import useNavLinks from '@/libs/hooks/useNavLinks';

import AdminIndexLayout from './index-layout';
import RootSideNav from './root-side-nav';

interface AdminRootLayoutProps extends React.ComponentPropsWithoutRef<'div'> {}

const AdminRootLayout: FC<AdminRootLayoutProps> = ({ children, ...props }) => {
  const links = useNavLinks().map(link => link.href);
  const router = useRouter();
  const isRootPath = links.includes(router.pathname);
  return (
    <div
      {...props}
      className="-mt-4 grid h-full min-h-screen grid-cols-[minmax(auto,85px),1fr]  lg:grid-cols-[minmax(auto,300px),1fr]"
    >
      <RootSideNav />
      <div className="p-8">
        {isRootPath ? (
          <AdminIndexLayout>{children}</AdminIndexLayout>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default AdminRootLayout;
