import type { RadioGroupProps } from '@mantine/core';
import { Flex, Radio } from '@mantine/core';
import type { Resources } from 'i18next';
import { useTranslation } from 'next-i18next';
import type { ComponentPropsWithoutRef, FC } from 'react';

import { KycAlertMessage } from '@/libs/components/kyc/KycAlertMessage';
import { cn } from '@/utils/cn';
import mergeMantineClassNames from '@/utils/mergeMantineClassNames';

import InputErrorMessage from '../Base/inputs/input-error-message';

const RadioIcon: FC<ComponentPropsWithoutRef<'svg'>> = props => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    className={cn(
      props.className,
      'top-[calc(50%_-_10px)] h-[20px] w-[21px] ltr:left-[calc(50%_-_21px/2)] rtl:right-[calc(50%_-_21px/2)]',
    )}
  >
    <circle cx="10.5703" cy="10" r="9" stroke="#DCAC00" strokeWidth="2" />
    <circle cx="10.5703" cy="10" r="6" fill="#DCAC00" />
  </svg>
);

interface FormFieldRadioProps
  extends Omit<RadioGroupProps, 'children' | 'error'> {
  data?: {
    label: string;
    key: string;
  }[];
  errorMessage?: keyof Resources['error'];
  alert?: {
    message: string;
    show: boolean;
  };
}

const KycRadioGroup: FC<FormFieldRadioProps> = ({
  label,
  data,
  errorMessage,
  alert,
  classNames,
  ...props
}) => {
  const { t } = useTranslation('error');

  const error = errorMessage ? t(errorMessage) : undefined;

  return (
    <Radio.Group
      label={label}
      {...props}
      classNames={mergeMantineClassNames(
        {
          root: 'flex flex-col gap-1',
          error: 'mt-[8px]',
          label:
            'my-0 max-w-[65ch] text-xs leading-[1.42857] text-[#64646C] sm:text-sm',
        },
        classNames,
      )}
      error={<InputErrorMessage message={error} />}
    >
      <Flex wrap="wrap" columnGap={52} className="mt-[8px] max-w-[500]">
        {Array.isArray(data) &&
          data?.map(x => {
            return (
              <Radio
                key={x.label}
                label={x.label}
                value={x.key}
                icon={RadioIcon}
                classNames={{
                  root: 'w-[25%] gap-6',
                  radio:
                    'bg-white text-brand-primary-main ring-transparent leading-[1.42857] text-sm w-[20px] h-[20px] border-[2px]',
                  label: 'pl-[8px]',
                }}
              />
            );
          })}
      </Flex>
      {alert?.show && <KycAlertMessage message={alert.message} />}
    </Radio.Group>
  );
};

export default KycRadioGroup;
