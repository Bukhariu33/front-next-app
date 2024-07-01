import type { PaperProps } from '@mantine/core';
import { Paper } from '@mantine/core';
import type { FC } from 'react';

import { cn } from '@/utils/cn';

interface BasePanelProps extends PaperProps {
  children: React.ReactNode;
}

const BasePanel: FC<BasePanelProps> = ({ classNames, ...props }) => {
  return (
    <Paper
      className={cn(classNames, ' h-full  rounded-lg p-8 shadow-sm')}
      {...props}
    />
  );
};

export default BasePanel;
