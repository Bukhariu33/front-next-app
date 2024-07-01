import { ActionIcon, rem } from '@mantine/core';
import {
  DateTimePicker as Input,
  type DateTimePickerProps,
} from '@mantine/dates';
import { useTranslation } from 'next-i18next';
import { useRef } from 'react';

import useLanguage from '@/libs/hooks/useLanguage';
import Clock from '@/libs/icons/Clock';
import type {
  Namespace,
  TranslatableError,
  TranslationKey,
  WithTranslation,
} from '@/libs/types/utils/withTranslation';
import { cn } from '@/utils/cn';
import mergeMantineClassNames from '@/utils/mergeMantineClassNames';

import InputErrorMessage from './input-error-message';

interface BaseProps<T extends Namespace>
  extends Omit<DateTimePickerProps, 'label' | 'placeholder'>,
    WithTranslation<T> {
  translateError?: boolean;
  label?: TranslationKey<T>;
  placeholder: TranslationKey<T>;
}

type Props<T extends Namespace> = BaseProps<T> & TranslatableError;

const DateTimePicker = <T extends Namespace>({
  namespace,
  label,
  placeholder,
  errorMessage,
  translateError = true,
  ...props
}: Props<T>) => {
  const { t } = useTranslation([namespace, 'error']);
  const ref = useRef<HTMLInputElement>(null);
  const { language: lang } = useLanguage();

  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      <Clock style={{ width: rem(16), height: rem(16) }} />
    </ActionIcon>
  );

  const errMsg =
    translateError && !Array.isArray(errorMessage)
      ? t(errorMessage as TranslationKey<'error'>, { ns: 'error' })
      : errorMessage;

  return (
    <Input
      {...props}
      placeholder={t(placeholder as any)}
      label={label ? t(label as any) : undefined}
      timeInputProps={{
        ...props.timeInputProps,
        [lang === 'ar' ? 'leftSection' : 'rightSection']: pickerControl,
        ref,
      }}
      error={errMsg && <InputErrorMessage message={errMsg} />}
      errorProps={{
        component: 'div',
      }}
      submitButtonProps={{
        id: `date-time-picker-submit-button-${(props as any)?.['data-cy']}`,
      }}
      popoverProps={{
        id: `date-time-picker-popover-${(props as any)?.['data-cy']}`,
      }}
      classNames={mergeMantineClassNames(
        {
          label: 'font-medium text-sm sm:text-lg mb-2 whitespace-nowrap',
          input: cn({
            'border-red-500 text-red-500 focus:ring-transparent':
              errorMessage || errorMessage === '',
          }),
          timeInput: '[&_input]:h-[36px]',
        },
        props.classNames,
      )}
    />
  );
};

export default DateTimePicker;
