import { ActionIcon, rem } from '@mantine/core';
import { TimeInput as Input, type TimeInputProps } from '@mantine/dates';
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

import InputErrorMessage from '../input-error-message';

interface BaseProps<T extends Namespace>
  extends Omit<TimeInputProps, 'label' | 'placeholder'>,
    WithTranslation<T> {
  translateError?: boolean;
  label?: TranslationKey<T>;
  placeholder: TranslationKey<T>;
}

type Props<T extends Namespace> = BaseProps<T> & TranslatableError;

const TimeInput = <T extends Namespace>({
  namespace,
  label,
  placeholder,
  errorMessage,
  translateError = true,
  ...props
}: Props<T>) => {
  const { t } = useTranslation([namespace, 'error']);
  const errMsg =
    translateError && !Array.isArray(errorMessage)
      ? t(errorMessage as TranslationKey<'error'>, { ns: 'error' })
      : errorMessage;
  const { language: lang } = useLanguage();
  const ref = useRef<HTMLInputElement>(null);

  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      <Clock style={{ width: rem(16), height: rem(16) }} />
    </ActionIcon>
  );

  return (
    <Input
      {...props}
      name={props.name}
      placeholder={t(placeholder as any)}
      label={label ? t(label as any) : undefined}
      {...(lang === 'ar'
        ? { leftSection: pickerControl }
        : { rightSection: pickerControl })}
      error={errMsg && <InputErrorMessage message={errMsg} />}
      errorProps={{
        component: 'div',
      }}
      ref={ref}
      classNames={mergeMantineClassNames(
        {
          label: 'font-medium text-sm sm:text-lg mb-2 whitespace-nowrap',
          input: cn({
            'border-red-500 text-red-500 focus:ring-transparent':
              errorMessage || errorMessage === '',
          }),
        },
        props.classNames,
      )}
    />
  );
};

export default TimeInput;
