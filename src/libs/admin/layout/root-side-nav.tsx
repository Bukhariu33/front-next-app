import { NavLink, Tooltip } from '@mantine/core';
import Link from 'next/link';
import { type FC } from 'react';

import type { NavLinkListItem } from '@/libs/hooks/useNavLinks';
import useNavLinks from '@/libs/hooks/useNavLinks';
import { cn } from '@/utils/cn';

const Label: FC<{ label: string; active: boolean }> = ({ label, active }) => {
  return (
    <span
      className={cn('text-lg', {
        'font-semibold text-brand-primary-main': active,
      })}
    >
      {label}
    </span>
  );
};
interface SideItemProps extends NavLinkListItem {}
const SideItem: FC<SideItemProps> = ({ label, href, Icon, isActive }) => {
  return (
    <Tooltip
      label={label}
      position="right"
      color="primary"
      classNames={{
        tooltip: 'lg:hidden',
      }}
      withArrow
    >
      <NavLink
        component={Link}
        href={href}
        data-cy-link={href}
        label={<Label label={label} active={isActive} />}
        classNames={{
          root: cn('px-[30px] py-[20px] ', {
            'bg-white': isActive,
          }),
          section: cn('-mt-1'),
          body: 'text-start',
          label: 'mx-2 hidden lg:block',
        }}
        leftSection={Icon}
      />
    </Tooltip>
  );
};

function RootSideNav() {
  const links = useNavLinks();
  return (
    <div className="relative h-full max-w-[300px]  bg-[#F5F7F9] pt-5 ">
      <div className="sticky top-36">
        {links.map(link => (
          <SideItem key={link.id} {...link} />
        ))}
      </div>
    </div>
  );
}

export default RootSideNav;
