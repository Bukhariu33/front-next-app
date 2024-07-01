import type { RoleWithPermissions, TRole } from '@/libs/packages/acl';

export interface OwaisUser {
  id: string;
  code: string;
  fullName: string;
  email: string;
  mobile: string;
  role: TRole;
  roles?: RoleWithPermissions[];
  status: {
    name: string;
    value: string;
    description: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface OwaisUserForm {
  fullName: string;
  email: string;
  mobile: string;
  role?: TRole;
  status: string;
  password?: string;
}
