import { Pagination, Text } from '@mantine/core';
import type { PaginationIcon } from '@mantine/core/lib/components/Pagination/Pagination.icons';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import ChevronIcon from '@/icons/chevron-icon';
import SelectInput from '@/libs/components/Base/inputs/select-input';
import { cn } from '@/utils/cn';

interface PaginationManagerProps extends MetaData {
  setPage: (eachPage: number) => void;
  setPageSize: (eachPage: number) => void;
}

const PrevIcon: PaginationIcon = ({ className, ...props }) => (
  <ChevronIcon
    className={cn('h-4 w-4 rotate-90 stroke-black', className)}
    {...props}
  />
);
const NextIcon: PaginationIcon = ({ className, ...props }) => (
  <ChevronIcon
    className={cn('h-4 w-4 -rotate-90 stroke-black', className)}
    {...props}
  />
);
const PaginationManager: FC<PaginationManagerProps> = ({
  currentPage: page,
  eachPage,
  lastPage,
  total,
  setPage,
  setPageSize,
}) => {
  const { t } = useTranslation('common');
  return (
    <div className="flex w-full  justify-between  py-2">
      <Text data-testid="pagination-text">
        {t('showingResults')} {eachPage * (page - 1) + 1}-
        {eachPage * page > total ? total : eachPage * page} {t('of')} {total}{' '}
        {t('results')}
      </Text>
      <Pagination
        dir="ltr"
        total={lastPage}
        boundaries={2}
        defaultValue={page}
        onChange={setPage}
        nextIcon={NextIcon}
        previousIcon={PrevIcon}
      />
      <SelectInput
        namespace="common"
        classNames={{
          input:
            'h-[var(--filter-manager-input-height-sm)]  sm:h-[var(--filter-manager-input-height)]',
        }}
        defaultValue={eachPage.toString()}
        placeholder="rowsPerTable"
        onChange={value => setPageSize(Number(value))}
        data={[
          {
            label: '15',
            value: '15',
          },
          {
            label: '30',
            value: '30',
          },
          {
            label: '50',
            value: '50',
          },
          {
            label: '100',
            value: '100',
          },
        ]}
      />
    </div>
  );
};

export default PaginationManager;
