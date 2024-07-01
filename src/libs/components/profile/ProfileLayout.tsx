import { Box } from '@mantine/core';
import type { FC, ReactNode } from 'react';

import { GradientBg } from '../auth/gradiant-background';

export const ProfileLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box className="my-4 rounded-[16px] bg-white p-[32px] shadow-sm xl:my-8">
      {children}
      <GradientBg />
    </Box>
  );
};
