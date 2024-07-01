import { Text, Tooltip } from '@mantine/core';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import StatusChip from '@/libs/components/Base/status-chip/status-chip';
import Tag from '@/libs/components/Base/Tag';
import ClippedText from '@/libs/components/cliped-text';
import useLanguage from '@/libs/hooks/useLanguage';
import type { Status } from '@/libs/types/status';
import type { Namespace } from '@/libs/types/utils/withTranslation';

import type { CellType, TableCell } from '../types';
import { formatCell } from '../utils';

interface FormattedCellProps<Data> {
  cell: TableCell;
  type?: CellType<Data>;
  row: any;
  navigationPath?: string;
  id: string;
  linkText?: string;
  namespace: Namespace;
}

const FormattedCell = <Data,>({
  cell,
  type = 'text',
  navigationPath,
  row,
  linkText,
  id,
  namespace,
}: FormattedCellProps<Data>) => {
  const tooTipProps = {
    withArrow: true,
    fontWeight: 'medium',
    'aria-label': 'A tooltip',
  };
  const { t } = useTranslation([namespace, 'common']);
  const { language } = useLanguage();
  if (type === 'status' && typeof cell === 'string') {
    return <StatusChip status={cell as Status} />;
  }
  if (type === 'link' && navigationPath) {
    return (
      <Tooltip
        {...tooTipProps}
        position={language === 'en' ? 'left' : 'right'}
        label={t('clickToViewDetails', { ns: 'common' })}
      >
        <Link
          href={`${navigationPath}/${id}`}
          className="w-full  cursor-pointer font-bold text-brand-primary-500 hover:to-brand-primary-700"
        >
          {linkText}
        </Link>
      </Tooltip>
    );
  }
  if (typeof type === 'function') {
    return (
      <Tooltip
        {...tooTipProps}
        position={language === 'en' ? 'left' : 'right'}
        label={t('clickToViewDetails', { ns: 'common' })}
      >
        <Text
          className="w-full cursor-pointer text-center font-bold text-brand-primary-500 hover:to-brand-primary-700"
          onClick={() => type(row)}
        >
          {cell}
        </Text>
      </Tooltip>
    );
  }
  const formatted = formatCell(type, cell);
  if (Array.isArray(formatted)) {
    return (
      <div className="flex  gap-2">
        {formatted.map((item, index) =>
          typeof item === 'string' ? (
            <Tag
              color="gray"
              // eslint-disable-next-line react/no-array-index-key
              key={`${item}-${index}`}
              className=" text-center"
              fullWidth
            >
              {item}
            </Tag>
          ) : (
            'N/A'
          ),
        )}
      </div>
    );
  }
  return typeof formatted === 'string' ? (
    <ClippedText text={formatted} />
  ) : (
    <Text className="w-full text-center">{formatted}</Text>
  );
};

export default FormattedCell;
