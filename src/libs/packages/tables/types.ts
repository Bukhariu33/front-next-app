import type { ActionIconProps, SwitchProps } from '@mantine/core';

import type { Variants } from '@/libs/components/Base/Buttons/Button';
import type {
  Namespace,
  TranslationKey,
} from '@/libs/types/utils/withTranslation';

import type { WithId } from './utils';

export type OnClick<Data> = (row: WithId<Data>) => void;

/** this to render the cell with the right formatting the type position in the `cellsType` array will be mapped to the column position
 * if the first column is a date and the second is a number the array will be like this ['date', 'number']
 * if the last column is a status it will be `[here the number of columns - 1] = 'status'`
 *
 * if the cell type is  typeof function the function will be called with the `id` of the data row
 */
export type CellType<Data> =
  | 'text'
  | 'money'
  | 'number'
  | 'status'
  | 'date'
  | 'link'
  | OnClick<Data>;

export type TableCell = string | number | null | undefined;

export type ButtonAction<T extends Namespace> = {
  type?: 'button';
  icon: React.ReactNode;
  label: TranslationKey<T>;
  variant?: Variants;
};

export type SwitchAction<T extends Namespace> = Omit<SwitchProps, 'onClick'> & {
  type: 'switch';
  label: TranslationKey<T>;
};

export type IconButtonAction<T extends Namespace> = {
  type: 'iconButton';
  label: TranslationKey<T>;
  icon: React.ReactNode;
  classNames?: ActionIconProps['classNames'];
};

export type ComponentAction<T extends Namespace, Data> = {
  type: 'component';
  component: (props: {
    row: TableCell[];
    id: string;
    namespace: T;
    rowData: Data;
  }) => React.ReactNode;
};

export type SwitchOnCheck = ({
  id,
  checked,
}: {
  id: string;
  checked: boolean;
}) => void;
export type Action<T extends Namespace, Data> =
  | ({ onClick: OnClick<Data> } & ButtonAction<T>)
  | ({ onClick: SwitchOnCheck } & SwitchAction<T>)
  | ({ onClick: OnClick<Data> } & IconButtonAction<T>)
  | ComponentAction<T, Data>;

export * from './filters/Builders/BaseFilter';
