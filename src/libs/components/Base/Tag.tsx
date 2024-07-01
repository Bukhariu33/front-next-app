import { Badge } from '@mantine/core';
import type { FC } from 'react';

import { cn } from '@/utils/cn';

export type TagColors = 'gray' | 'yellow' | 'cyan';
interface TagProps {
  color: TagColors;
  children: string;
  className?: string;
  fullWidth?: boolean;
}

const Tag: FC<TagProps> = ({ color, children, className, fullWidth }) => {
  return (
    <Badge
      fullWidth={fullWidth}
      className={cn(
        'w-full max-w-[90px] rounded-2xl  py-3  text-[0.6rem] text-brand-black-dark ',
        {
          'bg-brand-secondary-highlight/15': color === 'cyan',
          'bg-brand-yellow-50': color === 'yellow',
          'bg-brand-accent-highlight/10': color === 'gray',
          'min-w-fit': fullWidth,
        },
        className,
      )}
    >
      {children}
    </Badge>
  );
};

export default Tag;
