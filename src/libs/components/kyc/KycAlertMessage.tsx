import { Title } from '@mantine/core';
import type { FC } from 'react';

import AlertIcon from '@/icons/alert-icon';

const KycAlertMessage: FC<{ message: string }> = ({ message }) => {
  return (
    <Title className="mt-[8px] flex items-center gap-[8px] text-sm font-normal text-[#1A1A1D]">
      <AlertIcon className="h-[15px] min-h-[15px] w-[15px] min-w-[15px]" />
      {message}
    </Title>
  );
};

export { KycAlertMessage };
