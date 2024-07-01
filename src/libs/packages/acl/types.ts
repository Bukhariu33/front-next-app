import type { TRole } from './roles-with-permission';

export type Role = {
  slug: TRole;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type RoleWithPermissions = {
  permissions: {
    slug: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }[];
} & Role;
