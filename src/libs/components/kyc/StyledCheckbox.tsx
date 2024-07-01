import type { CheckboxProps } from '@mantine/core';
import { Checkbox } from '@mantine/core';
import type { FC } from 'react';

import mergeMantineClassNames from '@/utils/mergeMantineClassNames';

const StyledCheckbox: FC<CheckboxProps> = ({ classNames, ...props }) => {
  return (
    <Checkbox
      {...props}
      classNames={mergeMantineClassNames(
        {
          root: 'items-center',
          label: 'pl-[8px]',
          input:
            'text-brand-primary-main ring-brand-primary-main rounded-[4px]',
          inner: 'w-fit h-fit',
        },
        classNames,
      )}
    />
  );
};

export { StyledCheckbox };
