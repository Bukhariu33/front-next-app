import type { BoxProps } from '@mantine/core';
import { Box } from '@mantine/core';

import { cn } from '@/utils/cn';

interface KycCardProps extends Omit<BoxProps, 'classNames'> {
  children: React.ReactNode;
}

const KycCard = ({ className, children, ...props }: KycCardProps) => {
  return (
    <Box
      {...props}
      className={cn(
        'mb-[var(--base-card-actions-height)] h-fit w-[min(100%,700px)] rounded-[16px] bg-white shadow-[0px_5px_16px_0px]',
        'shadow-[rgba(8,15,52,0.06)] lg:mb-0 lg:ml-[35px] lg:rounded-[30px]',
        className,
      )}
    >
      {children}
    </Box>
  );
};

export { KycCard };
