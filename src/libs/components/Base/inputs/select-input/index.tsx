import type { ComboboxItem, SelectProps } from '@mantine/core';
import { Loader, Select } from '@mantine/core';
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
  extends Omit<SelectProps, 'label' | 'placeholder'>,
    WithTranslation<T> {
  translateError?: boolean;
  label?: TranslationKey<T>;
  placeholder?: TranslationKey<T>;
  isLoading?: boolean;
  'data-cy-input'?: string;
}

type Props<T extends Namespace> = BaseProps<T> & TranslatableError;

export type SelectInputOptions = SelectProps['data'];

const isComboboxItem = (item: any): item is ComboboxItem => {
  return item && typeof item === 'object' && 'value' in item && 'label' in item;
};
const SelectInput = <T extends Namespace>({
  namespace,
  label,
  placeholder,
  errorMessage,
  translateError = true,
  isLoading,
  'data-cy-input': dataCyInput,
  searchable = true,
  ...props
}: Props<T>) => {
  const { t } = useTranslation([namespace, 'error']);
  const errMsg =
    translateError && !Array.isArray(errorMessage)
      ? t(errorMessage as TranslationKey<'error'>, { ns: 'error' })
      : errorMessage;

  const handleOptions = (data: Props<any>['data']) => {
    if (!data) return [];
    return data.map(item => {
      if (typeof item === 'string') {
        return {
          value: item,
          label: t(item as any) as string,
        };
      }
      if (isComboboxItem(item)) {
        return {
          ...item,
          label: t(item.label as any) as string,
        };
      }
      return item;
    });
  };

  return (
    <Select
      {...props}
      placeholder={placeholder ? t(placeholder as any) : undefined}
      label={label && t(label as any)}
      error={errMsg && <InputErrorMessage message={errMsg} />}
      data={handleOptions(props.data)}
      rightSection={isLoading ? <Loader size="xs" /> : props.rightSection}
      searchable={searchable}
      errorProps={{
        component: 'div',
      }}
      {...(isLoading && {
        disabled: true,
      })}
      nothingFoundMessage="Nothing found..."
      clearable
      data-cy-input={dataCyInput}
      classNames={mergeMantineClassNames(
        {
          label: 'font-medium text-sm sm:text-lg  mb-2',
          error: 'text-sm sm:text-lg',

          input: cn({
            'border-red-500 text-red-500 focus:ring-transparent': errorMessage,
          }),
        },
        props.classNames,
      )}
    />
  );
};

export default SelectInput;
