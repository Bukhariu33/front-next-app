import { Portal, Skeleton, Stack, VisuallyHidden } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import TabToggle from '@/libs/components/Base/tab-toggle';
import ErrorBoundaryFallback from '@/libs/components/errorBoundryFallback';
import type {
  Namespace,
  TranslationKey,
  WithTranslation,
} from '@/libs/types/utils/withTranslation';
import type { QueryOptionsResult } from '@/packages/queryBuilder';

import CoreTable from './core/table';
import type { Filters } from './filters/Builders';
import type { FilterParams } from './filters/Builders/BaseFilter';
import FiltersManager from './filters/ui/FiltersManager';
import PaginationManager from './pagination';
import type { Action, CellType, TableCell } from './types';
import type { WithId } from './utils';

export type TableQueryFunctionReturn<T extends Namespace, Data> = {
  rows: TableCell[][];
  /** meta data to be used in pagination */
  meta: MetaData;
  /** actions to be rendered in the last column */
  actions?: Action<T, Data>[];
  // tabs
  tabsItemsPerRow?: [number, number, ...number[]];
  // all row data
  rowsData: WithId<Data>[];
};
export type THeader<T extends Namespace> = TranslationKey<T>;
export interface TableProps<T extends Namespace, Data>
  extends WithTranslation<T> {
  /** query function to be called to fetch the data */
  /** rows to be rendered
   * the `id` property will be used in linking and navigation the
   * `id` should be the first element in the array at position 0
   * `Code` should be the second element in the array at position 1
   *  */
  queryOptions: <NS extends T>(
    filters: FilterParams,
    activeTab?: string,
    ...args: any[]
  ) => QueryOptionsResult<TableQueryFunctionReturn<NS, Data>>;
  /** headers as keys to be translated with t(header) */
  headers: THeader<T>[];
  cellsType?: CellType<Data>[];
  args?: any[];
  /** filters to be rendered */
  filters?: Filters;
  /** navigation path to be used in linking  ex:`/admin/programs` will be added to the `id` from the api response  */
  navigationPath?: string;
  /** hide the footer */
  hideFooter?: boolean;
  tabs?: {
    label: TranslationKey<T>;
    value: string;
  }[];
  defaultTab?: string;
  headerButton?: React.ReactNode;
}
const Table = <T extends Namespace, Data>({
  filters,
  queryOptions,
  args,
  cellsType,
  namespace,
  hideFooter,
  navigationPath,
  headers,
  defaultTab,
  tabs,
  headerButton,
}: TableProps<T, Data>) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [filterState, setFiltersState] = useState<FilterParams>({});
  const { t } = useTranslation(namespace);
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    axis: 'y',
  });
  const setPage = (page: number) => {
    console.log('Selected Page: ', page);
    setFiltersState({
      ...filterState,
      page,
    } as FilterParams);
    scrollIntoView({
      alignment: 'end',
    });
  };
  const setPageSize = (pageSize: number) => {
    setFiltersState({
      ...filterState,
      paginate: pageSize,
    } as FilterParams);
  };
  const { data, isLoading } = useQuery(
    queryOptions(filterState, activeTab, ...(args ?? [])),
  );
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      {tabs && tabs?.at(0)?.value && (
        <Portal target="#portal-floating-header-child">
          <TabToggle
            onChange={setActiveTab}
            value={activeTab ?? tabs?.at(0)?.value ?? ''}
            withCount={!!data?.tabsItemsPerRow}
            data-cy-id="table-tabs"
            options={
              data?.tabsItemsPerRow
                ? tabs.map((tab, i) => ({
                    label: t(tab.label as any) as string,
                    value: tab.value,
                    itemsPerRow: data.tabsItemsPerRow?.at(i),
                  }))
                : tabs.map(tab => ({
                    label: t(tab.label as any) as string,
                    value: tab.value,
                  }))
            }
            loading={isLoading}
          />
        </Portal>
      )}
      {/* render the button in the portal */}
      {headerButton && (
        <Portal target="#portal-floating-header-child">{headerButton}</Portal>
      )}
      <Stack className="my-6 gap-[20px]">
        <VisuallyHidden ref={targetRef} w="20px" h="20px" bg="red" />
        <div
          className="flex w-full flex-wrap items-center justify-between gap-4"
          style={{
            display: 'hidden',
          }}
        >
          {filters ? (
            <FiltersManager
              filters={filters}
              onFilterChange={isLoading ? () => {} : setFiltersState}
            />
          ) : null}
          <div id="portal-custom-button-in-filter" />
        </div>
        {isLoading ? (
          <Skeleton height="50vh" radius="xl" />
        ) : (
          <CoreTable
            namespace={namespace}
            headers={headers}
            rows={data?.rows ?? []}
            actions={data?.actions}
            rowsData={data?.rowsData ?? []}
            cellsType={cellsType}
            navigationPath={navigationPath}
            footer={
              !hideFooter &&
              data?.meta && (
                <PaginationManager
                  {...data.meta}
                  setPage={setPage}
                  setPageSize={setPageSize}
                />
              )
            }
          />
        )}
      </Stack>
    </ErrorBoundary>
  );
};
export default Table;
