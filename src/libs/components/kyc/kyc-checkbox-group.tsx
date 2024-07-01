import type { CheckboxGroupProps } from '@mantine/core';
import { Checkbox, SimpleGrid } from '@mantine/core';
import type { Resources } from 'i18next';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import { StyledCheckbox } from '@/libs/components/kyc/StyledCheckbox';
import mergeMantineClassNames from '@/utils/mergeMantineClassNames';

interface FormFieldCheckBoxProps extends Omit<CheckboxGroupProps, 'children'> {
  options?: { label: string; key: string | number }[];
  errorMessage?: keyof Resources['error'];
}

const KycCheckboxGroup: FC<FormFieldCheckBoxProps> = ({
  label,
  options,
  errorMessage,
  classNames,
  ...props
}) => {
  const { t } = useTranslation('error');
  return (
    <Checkbox.Group
      {...props}
      label={label}
      classNames={mergeMantineClassNames(
        {
          root: 'grid ',
          label:
            'w-fit text-xs leading-[1.42857] text-[#64646C] sm:text-sm col-start-1',
          description: 'col-start-2 leading-[1.42857] text-sm w-full text-end',
          error: 'mt-[8px]',
        },
        classNames as Record<string, string>,
      )}
      error={errorMessage ? t(errorMessage) : undefined}
    >
      <SimpleGrid
        verticalSpacing={8.73}
        cols={2}
        className="col-span-2 mt-[6px] "
      >
        {options?.map(option => (
          <StyledCheckbox
            key={option.key}
            label={option.label}
            value={option.key}
          />
        ))}
      </SimpleGrid>
    </Checkbox.Group>
  );
};

export default KycCheckboxGroup;
