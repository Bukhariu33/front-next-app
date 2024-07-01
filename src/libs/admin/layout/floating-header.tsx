import { Paper } from '@mantine/core';
import { type FC } from 'react';

import MainTitle from '@/libs/components/Base/typography/MainTitle';

interface FloatingHeaderProps {
  icon: React.ReactNode;
  title: string;

  children?: React.ReactNode;
}

const FloatingHeader: FC<FloatingHeaderProps> = ({ icon, title, children }) => {
  return (
    <Paper className="flex items-center justify-between bg-white p-7 shadow-sm">
      <div className="flex items-center gap-5 ">
        {icon}
        <MainTitle order={1} text={title} className="mt-2" />
      </div>
      {children}
    </Paper>
  );
};

export default FloatingHeader;
