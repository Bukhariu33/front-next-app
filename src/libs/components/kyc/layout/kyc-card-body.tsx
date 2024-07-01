import type { BoxProps } from '@mantine/core';
import { Box } from '@mantine/core';

import { cn } from '@/utils/cn';

interface KycCardBodyProps extends Omit<BoxProps, 'classNames'> {
  children: React.ReactNode;
}

const KycCardBody = ({ className, children, ...props }: KycCardBodyProps) => {
  return (
    <Box
      {...props}
      className={cn(
        'mx-[8px] grid h-[472px] content-start gap-[25px] overflow-auto px-[8px] pb-[24px] max-lg:mb-[24px] lg:mx-[32px] lg:mb-[43px] lg:px-[calc(63.84px_-_32px)] lg:pb-1',
        className,
      )}
    >
      {children}
    </Box>
  );
};

export { KycCardBody };
