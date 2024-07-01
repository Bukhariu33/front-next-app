import { Divider } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

import ChevronIcon from '@/icons/chevron-icon';
// import Breadcrumbs from '@/libs/components/Breadcrumbs';

type HeaderProps = {
  title: string;
  backLink: string;
  children?: React.ReactNode;
};

const Header = ({ title, backLink, children }: HeaderProps) => {
  return (
    <div className=" mb-8 mt-6 flex items-center justify-between">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={backLink} className="flex items-center">
            <ChevronIcon className="-mt-2 mr-3 h-8 w-8 rotate-90 stroke-black rtl:-rotate-90" />
          </Link>
          <Divider
            size="md"
            orientation="vertical"
            className="mx-1 -mt-2 border-brand-primary-main"
          />
          <p className="m-0 mx-2 text-4xl font-bold leading-8">{title}</p>
          {/* <Breadcrumbs /> */}
        </div>
        <div id="header-button" />
      </div>
      {children}
    </div>
  );
};

export default Header;
