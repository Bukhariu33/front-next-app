import { NavLink } from '@mantine/core';
import Link from 'next/link';

import useSubNavLinks from '@/libs/hooks/admin/useSubNavLinks';
import { cn } from '@/utils/cn';

type MenuNavLinkProps = {
  href: string;
  label: string;
  isActive?: boolean;
};
const MenuNavLink = ({ href, label, isActive }: MenuNavLinkProps) => {
  return (
    <NavLink
      component={Link}
      href={href}
      label={label}
      data-cy-id={label}
      className="px-3 py-4"
      classNames={{
        root: cn(
          'hover:bg-brand-primary-100 hover:text-brand-primary-main rounded-2xl',
          {
            'bg-brand-primary-100 text-brand-primary-main': isActive,
          },
        ),
        label: cn('text-xl font-medium', {
          'text-brand-primary-main font-bold': isActive,
        }),
        body: 'text-start',
      }}
    />
  );
};

type SubNavProps = {
  fundManagerID?: string;
  investorID?: string;
};

const SubNav = ({ fundManagerID, investorID }: SubNavProps) => {
  const links = useSubNavLinks({ fundManagerID, investorID });

  return (
    <div className="flex min-w-[260px] flex-col gap-2 rounded-2xl bg-white p-2 shadow-sm">
      {links?.map(link => (
        <MenuNavLink
          key={link.id}
          href={link.href}
          label={link.label}
          isActive={link.isActive}
        />
      ))}
    </div>
  );
};

export default SubNav;
