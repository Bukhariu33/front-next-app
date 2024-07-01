import { Alert } from '@mantine/core';
import type { FC } from 'react';

import AlertIcon from '@/icons/alert-icon';

const FormErrorAlert: FC<{ message: string }> = ({ message }) => {
  return (
    <Alert
      classNames={{
        root: 'mt-[16px] bg-[#FEF2F2]',
        message: 'text-brand-danger flex items-center gap-[8px]',
      }}
    >
      <AlertIcon className="h-[20px] min-h-[20px] w-[20px] min-w-[20px]" />
      {message}
    </Alert>
  );
};

export { FormErrorAlert };
