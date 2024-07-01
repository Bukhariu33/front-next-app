import type { DateRangeFilter } from './DateRange';
import type { SearchFilter } from './Search-Filter';
import type { SortFilter } from './SortFilter';
import type { StatusFilter } from './Status-Filter';
import type { TypeFilter } from './Type-Filter';

type Filters = {
  dateRange?: DateRangeFilter;
  statusFilter?: StatusFilter;
  typeFilter?: TypeFilter;
  searchFilter?: SearchFilter;
  sortFilter?: SortFilter;
};

export type { Filters };
