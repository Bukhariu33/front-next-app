import type { QueryFunctionContext } from '@tanstack/react-query';
import Router from 'next/router';

import { axiosInternal } from '@/libs/configs/axios';
import EditIcon from '@/libs/icons/EditIcon';
import type { FilterParams } from '@/libs/packages/tables/types';
import { initTableData } from '@/libs/packages/tables/utils';
import {
  createQKey,
  createQueryOptions,
  createSSRQueryFn,
  setSafeAccessToken,
} from '@/packages/queryBuilder';
import type { APIResponseAdminOwaisUsersList } from '@/pages/api/admin/owais-users';

import DeleteOwaisUser from './DeleteOwaisUser';
import UpdateOwaisUserStatus from './UpdateOwaisUserStatus';

const queryKey = createQKey('admin', 'OwaisUser-list');
const listOwaisUsersQueryOptions = createQueryOptions({
  key: queryKey,
  detail(queryParams: FilterParams, ...args: any[]) {
    const queryFn = async (_context: QueryFunctionContext, token?: string) => {
      const { data } = await axiosInternal.get<APIResponseAdminOwaisUsersList>(
        `admin/owais-users`,
        {
          params: {
            ...queryParams,
            include: 'roles',
            ...args,
          },
          headers: setSafeAccessToken(token),
        },
      );
      const modifiedData = data.data.map(({ roles, ...rest }) => {
        return {
          ...rest,
          roles: roles && roles.map(({ name }) => name),
        };
      });
      const tableData = initTableData<(typeof modifiedData)[0], 'admin-common'>(
        modifiedData,
        ['fullName', 'email', 'mobile', 'roles', 'status'],
        data.meta,
        [
          {
            type: 'component',
            component: props => (
              <UpdateOwaisUserStatus
                row={props.row}
                queryKey={queryKey}
                id={props.id}
              />
            ),
          },
          {
            type: 'iconButton',
            onClick: row => {
              Router.push(`/admin/owais-users/${row.id}`);
            },
            icon: <EditIcon />,
            label: 'edit',
            classNames: {
              root: 'w-[2.152rem] h-[2.152rem] rounded-full shadow-sm',
            },
          },
          {
            type: 'component',
            component: props => (
              <DeleteOwaisUser id={props.id} queryKey={queryKey} />
            ),
          },
        ],
      );
      return tableData;
    };
    return {
      queryFn,
      ssrQueryFn: createSSRQueryFn(queryFn),
    };
  },
});

export default listOwaisUsersQueryOptions;
