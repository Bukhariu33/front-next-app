import { ActionIcon, Switch, Table, VisuallyHidden } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { useId } from 'react';

import Button from '@/libs/components/Base/Buttons/Button';
import {
  isButtonAction,
  isComponentAction,
  isIconButtonAction,
  isSwitchAction,
} from '@/libs/packages/tables/guards';
import type {
  Namespace,
  WithTranslation,
} from '@/libs/types/utils/withTranslation';

import type { TableProps, TableQueryFunctionReturn } from '..';
import type { WithId } from '../utils';
import FormattedCell from './formatted';

interface CoreTableProps<T extends Namespace, Data> extends WithTranslation<T> {
  rows: TableQueryFunctionReturn<T, Data>['rows'];
  headers: TableProps<T, Data>['headers'];
  cellsType?: TableProps<T, Data>['cellsType'];
  actions?: TableQueryFunctionReturn<T, Data>['actions'];
  rowsData: TableQueryFunctionReturn<T, Data>['rowsData'];
  navigationPath?: string;
  footer?: React.ReactNode;
}

const CoreTable = <T extends Namespace, Data>({
  rows,
  headers,
  actions,
  namespace,
  cellsType,
  footer: PaginationManager,
  rowsData,
  navigationPath,
}: CoreTableProps<T, Data>) => {
  const { t } = useTranslation<any>([namespace, 'common']);
  const id = useId();
  return (
    <Table.ScrollContainer minWidth={600} className="rounded-2xl">
      <Table
        className="overflow-hidden rounded-2xl bg-white shadow-sm"
        striped
        stripedColor="#F9F8F5"
      >
        <Table.Thead
          className=" rounded-2xl bg-brand-primary-main text-white"
          data-cy-id="table-head"
        >
          <Table.Tr data-cy-id="table-row">
            {headers.map(header => (
              <Table.Th key={`${header.toString()}-${id}`} className="py-5">
                <div className="flex text-center">
                  <span className="w-full self-center text-sm font-bold">
                    {t(header)}
                  </span>
                </div>
              </Table.Th>
            ))}

            {actions && (
              <Table.Th>
                <div className="flex justify-center gap-6">
                  {t('tableActions', { ns: 'common' })}
                </div>
              </Table.Th>
            )}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody data-cy-id="table-body">
          {rows.length === 0 && (
            <Table.Tr data-cy-id="table-row">
              <Table.Td
                className="p-5 text-center"
                colSpan={headers.length + 1}
              >
                {t('noDataFound', { ns: 'common' })}
              </Table.Td>
            </Table.Tr>
          )}
          {rows.map((row, rowIndex) => (
            <Table.Tr data-cy-id="table-row" key={`${id}-${row[0]}`}>
              {row.slice(1).map((cell, index) => (
                <Table.Td
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${id}-${row[0]}-${cell}-${index}`}
                  className="py-5 text-center"
                >
                  <div className="flex justify-center">
                    <FormattedCell
                      namespace={namespace}
                      cell={cell}
                      row={rowsData[rowIndex]}
                      type={cellsType ? cellsType[index] : undefined} // default is text
                      navigationPath={navigationPath}
                      id={row[0] as string} // data.id
                      linkText={row[1] as string} // data.code
                    />
                  </div>
                </Table.Td>
              ))}
              {actions && (
                <Table.Td className="flex h-full items-center justify-center gap-3 py-5">
                  {actions.map((action, index) => (
                    <div
                      className="flex gap-6"
                      // eslint-disable-next-line react/no-array-index-key
                      key={`${id}-${row[0]}-${action.type}-action-${index}`}
                    >
                      {isComponentAction(action) && (
                        <action.component
                          {...action}
                          id={row[0] as string}
                          namespace={namespace}
                          row={row}
                          rowData={rowsData[rowIndex] as WithId<Data>}
                        />
                      )}
                      {isButtonAction(action) && (
                        <Button
                          namespace={namespace}
                          variant={action.variant}
                          classNames={{
                            root: 'h-fit sm:py-1.5 sm:px-3 w-fit-content',
                            label: ' p-1',
                          }}
                          text={action.label}
                          leftSection={action.icon}
                          onClick={() => {
                            if (rowsData[rowIndex]) {
                              action.onClick(
                                rowsData[rowIndex] as WithId<Data>,
                              );
                            }
                          }}
                        />
                      )}

                      {isIconButtonAction(action) && (
                        <ActionIcon
                          {...action}
                          type="button"
                          onClick={() => {
                            if (rowsData[rowIndex]) {
                              action.onClick(
                                rowsData[rowIndex] as WithId<Data>,
                              );
                            }
                          }}
                        >
                          <VisuallyHidden>{t(action.label)}</VisuallyHidden>
                          {action.icon}
                        </ActionIcon>
                      )}

                      {isSwitchAction(action) && (
                        <Switch
                          {...action}
                          label=""
                          onClick={e =>
                            action.onClick({
                              checked: e.currentTarget.checked,
                              id: row[0] as string,
                            })
                          }
                        />
                      )}
                    </div>
                  ))}
                </Table.Td>
              )}
            </Table.Tr>
          ))}
        </Table.Tbody>
        <Table.Tfoot data-cy-id="table-footer">
          {rows.length > 0 && (
            <Table.Tr data-cy-id="table-row">
              <Table.Td colSpan={headers.length + 1}>
                {PaginationManager}
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tfoot>
      </Table>
    </Table.ScrollContainer>
  );
};

export default CoreTable;
