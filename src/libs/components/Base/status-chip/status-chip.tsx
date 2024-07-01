import { Loader } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import ChevronIcon from '@/icons/chevron-icon';
import type { Status } from '@/libs/types/status';
import type { TranslationKey } from '@/libs/types/utils/withTranslation';
import { cn } from '@/utils/cn';

import SelectInput from '../inputs/select-input';
import Classes from './statuschip.module.css';

type StatusChipProps =
  | {
      status: Status;
      editable?: false;
      loading?: boolean;
    }
  | {
      status: Status;
      loading?: boolean;
      withLabel?: boolean;
      editable: true;
      options: {
        status: Partial<Status>;
        label: TranslationKey<'common'>;
      }[];
      onChange: (option: Status) => void;
    };

const StatusChip: React.FC<StatusChipProps> = props => {
  const { t } = useTranslation('common');
  const baseClasses =
    'min-w-[180px]  min-h-[40px] rounded-lg px-[10px] py-[5px] text-center text-xs font-medium leading-5 focus:ring-transparent';

  const handleChange = (option: string | null) => {
    if ('onChange' in props && option) props.onChange(option as Status);
  };

  const getStyle = (status: Status) => {
    const styles = Classes[status];
    if (styles) return styles;
    return Classes.fallback;
  };

  const statusLabel = Classes[props.status]
    ? t(props.status)
    : t('notApplicable');
  return props.editable ? (
    <SelectInput
      namespace="admin-common"
      placeholder="selectStatus"
      data-cy-input="selectStatus"
      label={props.withLabel ? 'status' : undefined}
      value={props.status}
      isLoading={props.loading}
      classNames={{
        input: cn(Classes.clean, baseClasses, getStyle(props.status)),
        section: cn('stroke-black', {
          'stroke-white': props.status === 'funded',
        }),
      }}
      onChange={handleChange}
      searchable={false}
      data={props.options.map(({ status, label }) => ({
        value: status,
        label,
        disabled: status === props.status,
      }))}
      rightSection={<ChevronIcon />}
      clearable={false}
    />
  ) : (
    <div
      className={cn(
        'flex items-center justify-center',
        Classes.clean,
        baseClasses,
        `${getStyle(props.status)}`,
      )}
      data-cy-id="status-chip"
    >
      {props.loading ? (
        <Loader
          size="xs"
          color={props.status === 'funded' ? 'white' : 'black'}
        />
      ) : (
        statusLabel
      )}
    </div>
  );
};
export default StatusChip;
