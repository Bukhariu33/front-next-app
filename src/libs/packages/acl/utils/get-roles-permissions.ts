import type { TRole } from '../roles-with-permission';
import type { RoleWithPermissions } from '../types';

export const createRolesToPermissionsMap = (
  rolesWithPermissions: RoleWithPermissions[],
): RolesToPermissions => {
  const rolesToPermissions = rolesWithPermissions.reduce(
    (acc, role) => {
      acc[role.slug as TRole] = role.permissions.map(
        permission => permission.slug,
      );
      return acc;
    },
    {} as Record<TRole, string[]>,
  );

  return rolesToPermissions;
};

export type RolesToPermissions = Record<TRole, string[]>;
