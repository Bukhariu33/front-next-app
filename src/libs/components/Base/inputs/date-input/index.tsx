import { DateInput as Input, type DateInputProps } from '@mantine/dates';
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
  extends Omit<DateInputProps, 'label' | 'placeholder'>,
    WithTranslation<T> {
  translateError?: boolean;
  label?: TranslationKey<T>;
  placeholder: TranslationKey<T>;
}

type Props<T extends Namespace> = BaseProps<T> & TranslatableError;

const DateInput = <T extends Namespace>({
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

  return (
    <Input
      {...props}
      name={props.name}
      placeholder={t(placeholder as any)}
      label={label ? t(label as any) : undefined}
      error={errMsg && <InputErrorMessage message={errMsg} />}
      errorProps={{
        component: 'div',
      }}
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

export default DateInput;
