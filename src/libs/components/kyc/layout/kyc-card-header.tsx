import type { TitleProps } from '@mantine/core';
import { Title } from '@mantine/core';
import type { FC } from 'react';
import React from 'react';

import { cn } from '@/utils/cn';

const KycCardHeader: FC<Omit<TitleProps, 'classNames'>> = ({
  className,
  ...props
}) => {
  return (
    <Title
      {...props}
      className={cn(
        'prose mt-0 px-[16px] pt-[24px] text-[clamp(1.25rem,1.179rem_+_0.357vw,1.5rem)] font-bold capitalize leading-[1.16667] text-brand-accent-500 lg:px-[63px] lg:pt-[32px]',
        className,
      )}
    />
  );
};

export { KycCardHeader };
