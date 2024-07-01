import { axiosInternal } from '@/libs/configs/axios';
import type { Role } from '@/libs/packages/acl';
import { createQKey, createQueryOptions } from '@/packages/queryBuilder';

type RoleData = {
  name: string;
  slug: string;
};

export const getAdminUserRolesQueryOptions = createQueryOptions({
  key: createQKey('admin', 'acl-roles'),
  detail: () => ({
    queryFn: async () => {
      const { data } = await axiosInternal.get<APIResponse<Role[]>>(
        `admin/roles`,
        {
          params: {
            include: 'permissions',
          },
        },
      );
      const transformedData = data.data.map((role: RoleData) => ({
        label: role.name,
        value: role.slug,
      }));

      return transformedData;
    },
  }),
});
