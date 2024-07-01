import type { Namespace } from '@/libs/types/utils/withTranslation';

import type { TableQueryFunctionReturn } from '..';
import type { TableCell } from '../types';

export type WithId<Data> = {
  id: string;
  code: string;
} & Data;

/**
 * This function is used to initialize the data for the table
 *
 * @param data  Array of data to be displayed in the table -- must have an id property in the object -- the Table will use the ID for linking and the code or element at position 1 for displaying
 * @param meta
 * @param actions
 *
 */
const initTableData = <Data, NS extends Namespace>(
  data: WithId<Data>[],
  /**
   * The id and code is required for the table to work no need to include it in the selected
   */
  selected: (keyof Omit<WithId<Data>, 'id' | 'code'>)[],
  meta: MetaData,
  actions?: TableQueryFunctionReturn<NS, Data>['actions'],
  tabsItemsPerRow?: [number, number, ...number[]],
): TableQueryFunctionReturn<NS, Data> => {
  const rows = data.map(({ id, code, ...rest }) => [
    id,
    code,
    ...selected.map(key => rest[key]),
  ]) as TableCell[][];
  return {
    rows,
    meta,
    actions,
    rowsData: data,
    tabsItemsPerRow,
  };
};
export { initTableData };
