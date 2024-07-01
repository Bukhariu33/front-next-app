import { Checkbox, type CheckboxProps } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import type {
  Namespace,
  TranslatableError,
  TranslationKey,
} from '@/libs/types/utils/withTranslation';
import { cn } from '@/utils/cn';

import InputErrorMessage from '../input-error-message';

interface BaseProps extends CheckboxProps {
  translateError?: boolean;
  namespace?: Namespace;
  'data-cy-input'?: string;
}
type Props = BaseProps & TranslatableError;
const CheckboxInput = ({
  namespace,
  errorMessage,
  translateError = true,
  'data-cy-input': dataCyInput,
  ...props
}: Props) => {
  const { t } = useTranslation([namespace, 'error']);
  const errMsg =
    translateError && !Array.isArray(errorMessage)
      ? t(errorMessage as TranslationKey<'error'>, { ns: 'error' })
      : errorMessage;
  return (
    <div>
      <Checkbox
        {...props}
        data-cy-input={dataCyInput}
        radius="sm"
        classNames={{
          label: 'font-medium text-sm sm:text-lg mb-2 ',
          input: cn({
            'border-red-500 text-red-500 focus:ring-transparent': errMsg,
          }),
        }}
      />
      <div>{errMsg && <InputErrorMessage message={errMsg} />}</div>
    </div>
  );
};
export default CheckboxInput;
