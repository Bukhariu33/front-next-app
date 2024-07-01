import type { TextareaProps } from '@mantine/core';
import { Flex, Text, Textarea as DefaultTextarea } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import type {
  Namespace,
  TranslatableError,
  TranslationKey,
} from '@/libs/types/utils/withTranslation';
import { cn } from '@/utils/cn';
import mergeMantineClassNames from '@/utils/mergeMantineClassNames';

import InputErrorMessage from './input-error-message';

interface BaseProps<T extends Namespace>
  extends Omit<TextareaProps, 'label' | 'placeholder' | 'description'> {
  namespace?: T;
  translateError?: boolean;
  label?: TranslationKey<T>;
  placeholder?: TranslationKey<T>;
  charsLimit?: number;
  'data-cy-input'?: string;
}

export type InputProps<T extends Namespace> = BaseProps<T> & TranslatableError;

const Textarea = <T extends Namespace>({
  namespace,
  label,
  placeholder,
  charsLimit,
  errorMessage,
  'data-cy-input': dataCyInput,
  translateError = true,
  ...props
}: InputProps<T>) => {
  const { t } = useTranslation([namespace, 'error']);
  const [count, setCount] = useState(0);

  const errMsg =
    translateError && !Array.isArray(errorMessage)
      ? t(errorMessage as TranslationKey<'error'>, { ns: 'error' })
      : errorMessage;
  return (
    <DefaultTextarea
      data-cy-input={dataCyInput}
      placeholder={placeholder && (t(placeholder as any) as string)}
      label={
        label && (
          <Flex className="mb-2 w-full items-center justify-between gap-[16px]">
            <Text
              className={cn(
                'flex-1 whitespace-nowrap text-sm font-medium sm:text-lg',
                (props.classNames as any)?.label,
              )}
            >
              <>{t(label as any)}</>
            </Text>
            {charsLimit && (
              <Text className="text-brand-accent-500">
                {count}/{charsLimit}
              </Text>
            )}
          </Flex>
        )
      }
      error={errMsg && <InputErrorMessage message={errMsg} />}
      errorProps={{
        component: 'div',
      }}
      classNames={mergeMantineClassNames(
        {
          label: 'w-full',
          error: 'text-sm sm:text-lg',
          input: cn({
            'border-red-500 text-red-500 focus:ring-transparent':
              errorMessage || errorMessage === '',
          }),
        },
        {
          ...props.classNames,
          label: '',
        },
      )}
      autosize
      minRows={4}
      maxRows={4}
      {...props}
      onChange={event => {
        setCount(event.target.value.length);
        if (props.onChange) props.onChange(event);
      }}
      maxLength={charsLimit}
    />
  );
};

export default Textarea;
