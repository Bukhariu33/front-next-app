// eslint-disable-next-line simple-import-sort/imports
import { Box, Flex, Menu, Text } from '@mantine/core';
import { signOut } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import type { FC } from 'react';
import { useState } from 'react';

import ChevronIcon from '@/icons/chevron-icon';
import useLanguage from '@/libs/hooks/useLanguage';
import type { NavLinkListItem } from '@/libs/hooks/useNavLinks';
import useNavLinks from '@/libs/hooks/useNavLinks';
import useUser from '@/libs/hooks/useUser';
import { cn } from '@/utils/cn';

const MenuItem: FC<NavLinkListItem> = ({ label, href, Icon, isActive }) => (
  <Menu.Item
    classNames={{
      itemLabel: cn('text-start mt-2', {
        'text-brand-primary-main font-bold ': isActive,
      }),
      itemSection: 'mt-1',
    }}
    leftSection={Icon}
    component={Link}
    href={href}
  >
    {label}
  </Menu.Item>
);
function UserMenu() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const { language } = useLanguage();
  const firstName = user?.name;
  const lastName = '';

  const avatarText = `
    ${firstName?.charAt(0)}${lastName?.charAt(0)}
  `;
  const { t } = useTranslation('common');
  const [dashboardLink, ...links] = useNavLinks();
  return (
    <Menu shadow="md" width={289} onChange={setIsOpen}>
      <Menu.Target data-testid="navbar-dropdown-selector">
        <Flex className="border-1 h-[56px] min-w-[289px] cursor-pointer items-center gap-4 rounded-lg border-solid border-brand-primary-main px-4">
          <Flex className="h-[32px] w-[32px] items-center justify-center rounded-lg bg-brand-primary-main">
            <Text className="font-medium uppercase text-white">
              {avatarText}
            </Text>
          </Flex>

          <Box className="capitalize  text-black">
            <Text className="text-xs">{t('welcome')}</Text>
            <Text>
              {firstName} {lastName}
            </Text>
          </Box>

          <ChevronIcon
            className={cn(
              'text-gray-800 transition-transform duration-150 ease-linear',
              {
                'rotate-180': isOpen,
                'ml-auto': language === 'en',
                'mr-auto': language === 'ar',
              },
            )}
          />
        </Flex>
      </Menu.Target>

      <Menu.Dropdown>
        {dashboardLink && <MenuItem {...dashboardLink} />}
        {user?.role !== 'admin' &&
          links.map(link => (
            <MenuItem {...link} key={`${link.href}+${link.id}`} />
          ))}
        <Menu.Item
          classNames={{
            itemLabel: cn('text-start mt-2', {
              'text-brand-primary-main font-bold ': false,
            }),
            itemSection: 'mt-1',
          }}
          leftSection={<Box className=" h-4 w-4 rounded-sm bg-brand-danger" />}
          onClick={async () => {
            await signOut();
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default UserMenu;
