import type { FlexProps } from '@mantine/core';
import { Flex } from '@mantine/core';
import type { FC } from 'react';

import { cn } from '@/utils/cn';

const KycCardActions: FC<FlexProps> = ({ className, ...props }) => {
  return (
    <Flex
      justify={{ xs: 'space-between' }}
      direction={{ base: 'column', xs: 'row' }}
      className={cn(
        'mt-0 gap-[16px] px-[16px] pb-[24px] lg:px-[63px] lg:pb-[32px]',
        className,
      )}
      {...props}
    />
  );
};

export { KycCardActions };
