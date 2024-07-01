import type { FC } from 'react';
import { useEffect, useRef } from 'react';

import Button from '@/libs/components/Base/Buttons/Button';

import type { Filters } from '../Builders';
import type { FilterParams } from '../Builders/BaseFilter';
import FiltersDirector from '../director';

interface FiltersManagerProps {
  filters: Filters;
  onFilterChange: (filters: FilterParams) => void;
}

const FiltersManager: FC<FiltersManagerProps> = ({
  filters,
  onFilterChange,
}) => {
  const directorRef = useRef<FiltersDirector | null>(null);

  if (!directorRef.current) {
    directorRef.current = new FiltersDirector(filters);
  }

  const UI = directorRef.current.getUIFilters();

  const applyFiltersHandler = () => {
    if (directorRef.current) {
      onFilterChange(directorRef.current.applyFilters());
    }
  };
  useEffect(() => {
    if (directorRef.current?.hasDefaultFilter) {
      applyFiltersHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center  gap-4 sm:flex-row  ">
      {UI}
      <Button
        key="apply-filter"
        onClick={applyFiltersHandler}
        namespace="common"
        data-cy-button="apply-filters"
        text="applyFilters"
        classNames={{
          root: 'h-[var(--filter-manager-input-height-sm)]  sm:h-[var(--filter-manager-input-height)] ',
        }}
      />
      <Button
        key="cancel-filter"
        onClick={() => {
          if (directorRef.current) {
            directorRef.current.clearFilters();
            // to fetch data with no filters this data is cached already
            applyFiltersHandler();
          }
        }}
        namespace="common"
        text="cancel"
        variant="outlined-black"
        classNames={{
          root: 'h-[var(--filter-manager-input-height-sm)]  sm:h-[var(--filter-manager-input-height)] bg-white/30',
        }}
      />
    </div>
  );
};
FiltersManager.displayName = 'FiltersManager';
export default FiltersManager;
