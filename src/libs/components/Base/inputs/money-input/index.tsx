import { type ChangeEvent, useEffect, useState } from 'react';

import type { Namespace } from '@/libs/types/utils/withTranslation';

import type { InputProps } from '../input';
import Input from '../input';

type MoneyInputProps<T extends Namespace> = Omit<InputProps<T>, 'onChange'> & {
  onChange?: (value: number) => void;
};

const MoneyInput = <T extends Namespace>({
  onChange,
  ...props
}: MoneyInputProps<T>) => {
  const isNumber = (value: string) => {
    return !Number.isNaN(Number(value));
  };

  const clearFormatting = (value: string): number => {
    return Number(value.replace(/,/g, ''));
  };

  const [value, setValue] = useState<string>('');
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const v = clearFormatting(event.target.value);
    if (!isNumber(v.toString())) return;
    const formattedValueToMoney = new Intl.NumberFormat().format(v);
    onChange?.(v);
    setValue(formattedValueToMoney);
  };
  useEffect(() => {
    const v = props?.value || 0;
    const formattedValueToMoney = new Intl.NumberFormat().format(
      clearFormatting(v.toString()),
    );
    setValue(formattedValueToMoney);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value !== undefined]);
  return (
    <Input
      {...(props as InputProps<T>)}
      type="currency"
      aria-label="money-input"
      value={value}
      onChange={handleOnChange}
    />
  );
};
export default MoneyInput;
