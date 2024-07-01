import { AppShell, Group } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type ComponentProps } from 'react';

import Logo from '@/icons/Logo';
import useUser from '@/libs/hooks/useUser';
import { cn } from '@/utils/cn';

import Button from '../../Buttons/Button';
import UserAvatar from './userMenu';

interface Props extends ComponentProps<typeof Logo> {}

function Navbar({ variant = 'main' }: Props) {
  const { status } = useUser();
  const isUserLoggedIn = status === 'authenticated';
  const { pathname } = useRouter();
  const isAuthPage = pathname.includes('/auth');

  return (
    <AppShell.Header
      className={cn(
        'flex max-h-[90px] items-center justify-between border-b border-brand-alternative p-4 md:max-h-[120px] 2xl:max-h-[140px]',
        {
          'bg-zinc-900/10 backdrop-blur-sm': variant === 'white',
          'bg-white': variant === 'main',
          'shadow-sm': !isAuthPage,
          'border-none': isAuthPage,
        },
      )}
    >
      <Logo variant={variant} />
      {/* {env.NEXT_PUBLIC_MOCK_MODE && (
        <div className="mx-8 flex-1 rounded-md bg-red-500 p-2 text-center text-white">
          Debug Mode
        </div>
      )} */}

      <Group>
        {isUserLoggedIn ? (
          <UserAvatar />
        ) : (
          <Button
            classNames={{
              root: 'h-[2.6rem]',
            }}
            display={isAuthPage ? 'none' : 'block'}
            namespace="common"
            text="LoginRegister"
            variant="outlined"
            // @ts-ignore :https://mantine.dev/guides/polymorphic/#polymorphic-components-with-generic-components -- you can use type ComponentProps to get the props of a generic component
            component={Link}
            href="/auth/sign-in"
          />
        )}
      </Group>
    </AppShell.Header>
  );
}

export default Navbar;
