import { ThemeIcon } from '@mantine/core';
import type { FC } from 'react';

export const Addon: FC<{ Icon: FC }> = ({ Icon }) => {
  return (
    <ThemeIcon
      classNames={{
        root: 'bg-[#F0F0F1] min-w-[6.75rem] mt-[35px] max-sm:mt-[30px] h-[57px] max-sm:h-[50px]',
      }}
    >
      <Icon />
    </ThemeIcon>
  );
};
