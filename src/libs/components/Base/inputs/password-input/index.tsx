import { PasswordInput as Input, type PasswordInputProps } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import type {
  Namespace,
  TranslatableError,
  TranslationKey,
  WithTranslation,
} from '@/libs/types/utils/withTranslation';
import { cn } from '@/utils/cn';

import InputErrorMessage from '../input-error-message';

interface BaseProps<T extends Namespace>
  extends Omit<PasswordInputProps, 'label' | 'placeholder'>,
    WithTranslation<T> {
  translateError?: boolean;
  label: TranslationKey<T>;
  placeholder: TranslationKey<T>;
  'data-cy-input'?: string;
}

type Props<T extends Namespace> = BaseProps<T> & TranslatableError;

const PasswordInput = <T extends Namespace>({
  namespace,
  label,
  placeholder,
  errorMessage,
  'data-cy-input': dataCyInput,
  translateError = true,
  ...props
}: Props<T>) => {
  const [focused, setFocused] = useState(false);
  const { t } = useTranslation([namespace, 'error']);
  const errMsg =
    translateError && !Array.isArray(errorMessage)
      ? t(errorMessage as TranslationKey<'error'>, { ns: 'error' })
      : errorMessage;
  return (
    <Input
      {...props}
      placeholder={t(placeholder as any)}
      label={t(label as any)}
      error={errMsg && <InputErrorMessage message={errMsg} />}
      onFocus={() => setFocused(true)}
      onBlur={e => {
        setFocused(false);
        props.onBlur?.(e);
      }}
      data-cy-input={dataCyInput}
      errorProps={{
        component: 'div',
      }}
      classNames={{
        input: cn({
          'bg-white': focused,
          'ring-1 ring-brand-primary-main': focused && !errorMessage,
          'border-red-500 text-red-500 focus:ring-transparent focus:ring-0':
            errorMessage,
        }),
        innerInput: cn(
          'bg-transparent p-4 h-12 rounded-lg text-lg border-0 focus:ring-0 text-[#64646C] placeholder-[#64646C]',
          {
            'bg-white': focused,
          },
        ),
        visibilityToggle: 'text-[#64646C] hover:bg-transparent',
        label: 'font-medium text-sm sm:text-lg mb-2',
        error: 'text-sm sm:text-lg',
      }}
    />
  );
};

export default PasswordInput;
