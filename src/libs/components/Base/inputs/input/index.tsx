import { TextInput, type TextInputProps } from '@mantine/core';
import { useTranslation } from 'next-i18next';

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
  extends Omit<TextInputProps, 'label' | 'placeholder'>,
    WithTranslation<T> {
  translateError?: boolean;
  label: TranslationKey<T>;
  placeholder?: TranslationKey<T>;
  'data-cy-input'?: string;
}

export type InputProps<T extends Namespace> = BaseProps<T> & TranslatableError;

const Input = <T extends Namespace>({
  namespace,
  label,
  placeholder,
  errorMessage,
  'data-cy-input': dataCyInput,
  translateError = true,
  ...props
}: InputProps<T>) => {
  const { t } = useTranslation([namespace, 'error']);

  const errMsg =
    translateError && !Array.isArray(errorMessage)
      ? t(errorMessage as TranslationKey<'error'>, { ns: 'error' })
      : errorMessage;
  return (
    <TextInput
      placeholder={placeholder ? t(placeholder as any) : undefined}
      label={t(label as any)}
      error={errMsg && <InputErrorMessage message={errMsg} />}
      errorProps={{
        component: 'div',
      }}
      data-cy-input={dataCyInput}
      {...props}
      classNames={mergeMantineClassNames(
        {
          label: 'font-medium text-sm sm:text-lg mb-2 whitespace-nowrap',
          error: 'text-sm sm:text-lg',
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

export default Input;
