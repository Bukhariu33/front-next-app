import type { TextInputProps } from '@mantine/core';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

import type {
  Namespace,
  TranslatableError,
  TranslationKey,
  WithTranslation,
} from '@/libs/types/utils/withTranslation';
import { cn } from '@/utils/cn';
import { formatPhoneNumber } from '@/utils/format-number';

import type { InputProps } from '../input';
import Input from '../input';

interface BaseProps<T extends Namespace>
  extends Omit<TextInputProps, 'label' | 'placeholder' | 'onChange'>,
    WithTranslation<T> {
  translateError?: boolean;
  label: TranslationKey<T>;
  placeholder?: TranslationKey<T>;
  onChange: (values: string) => void;
}

export type PhoneInputProps<T extends Namespace> = BaseProps<T> &
  TranslatableError;

const PhoneNumberInput = <T extends Namespace>({
  namespace,
  label,
  placeholder,
  onChange,
  errorMessage,

  ...props
}: PhoneInputProps<T>) => {
  const [phoneNumberInput, setPhoneNumberInput] = useState<string>('');
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    if (props.value || !phoneNumberInput.includes('-')) {
      setPhoneNumberInput(
        formatPhoneNumber(props.value?.toLocaleString() || ''),
      );
    }
  }, [phoneNumberInput, props.value]);

  const highlightCountry = () => {
    setHighlighted(true);
    setTimeout(() => {
      setHighlighted(false);
    }, 1000);
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.length >= 13) return;
    const formattedValue = formatPhoneNumber(inputValue);
    setPhoneNumberInput(formattedValue);
    const value = formattedValue.replace(/-/g, '');
    onChange(value);
    if (inputValue.startsWith('966')) {
      highlightCountry();
    }
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <Input
        namespace={namespace}
        label={label}
        value="+966"
        className="w-1/4 sm:w-1/5"
        errorMessage={errorMessage as string}
        errorProps={{
          component: 'div',
        }}
        readOnly
        classNames={{
          label: 'font-medium text-sm sm:text-lg mb-2 whitespace-nowrap',
          error: 'whitespace-nowrap text-sm sm:text-lg',
          input: cn(' pointer-events-none', {
            'border-red-500 text-red-500 focus:ring-transparent': errorMessage,
            'border-brand-primary-main border-solid border-1.5 text-black transition-all duration-300 ease-in':
              highlighted,
          }),
        }}
      />
      <Input
        {...props}
        errorMessage={errorMessage && ('' as any)}
        errorProps={{
          component: 'div',
        }}
        namespace={namespace}
        label={'' as InputProps<T>['label']}
        placeholder={placeholder}
        onChange={handleInputChange}
        value={phoneNumberInput || props.value}
        type="text"
        className={cn('mt-7 grow sm:mt-9', {
          'mt-2 sm:mt-2': errorMessage,
        })}
        classNames={{
          label: 'font-medium text-sm sm:text-lg mb-2 whitespace-nowrap',
          input: cn({
            'border-red-500 text-red-500 focus:ring-transparent': errorMessage,
          }),
        }}
      />
    </div>
  );
};

export default PhoneNumberInput;
