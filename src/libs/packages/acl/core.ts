import jwtDecode from 'jwt-decode';

import type { EPermission } from '@/libs/configs/appConfig';
import { env } from '@/libs/Env.mjs';

import MockTokenManager from './mock-token-manager';
import type { TRole } from './roles-with-permission';
import type { TokenType } from './token-manager';
import { TokenManager } from './token-manager';
import type { RoleWithPermissions } from './types';
import { createPermissionsTypes } from './utils/create-types';
import { createRolesToPermissionsMap } from './utils/get-roles-permissions';

type DecodedToken = {
  id: string; // user id
  type: TokenType;
  tokenId: string;
  iat: number;
  exp: number;
};

const shouldMockTokenManager =
  env.MOCK_CACHE_MANAGER && env.APP_ENV !== 'production';
class ACL {
  constructor(
    private tokenManager = shouldMockTokenManager
      ? new MockTokenManager()
      : new TokenManager(),
  ) {}

  static decodeToken(token?: string): DecodedToken {
    if (!token) throw new Error('Token is required');
    return jwtDecode(token);
  }

  private async getUserPermissions(token: string): Promise<Set<string>> {
    const { tokenId, type } = ACL.decodeToken(token);
    const userPermissions = new Set<string>(
      (await this.tokenManager.get(tokenId, type))?.permissions ?? [],
    );

    return userPermissions;
  }

  private async getUserRoles(token: string): Promise<Set<string>> {
    const { tokenId, type } = ACL.decodeToken(token);

    const userRoles = new Set<string>(
      (await this.tokenManager.get(tokenId, type))?.roles,
    );
    return userRoles;
  }

  static init(rolesWithPermissions: RoleWithPermissions[]) {
    if (rolesWithPermissions) {
      const data = createRolesToPermissionsMap(rolesWithPermissions);
      createPermissionsTypes(data);
    }
  }

  public async canAccess(token: string, permission: EPermission) {
    const userPermissions = await this.getUserPermissions(token);
    return userPermissions.has(permission);
  }

  public async canAccessAll(
    token: string,
    permissions: EPermission[],
  ): Promise<Record<EPermission, boolean>> {
    const userPermissions = await this.getUserPermissions(token);
    return permissions.reduce(
      (acc, permission) => {
        acc[permission] = userPermissions.has(permission);
        return acc;
      },
      {} as Record<EPermission, boolean>,
    );
  }

  public async hasRole(token: string, role: TRole) {
    const userRoles = await this.getUserRoles(token);
    return userRoles.has(role);
  }

  public async hasAllRoles(token: string, roles: TRole[]) {
    const userRoles = await this.getUserRoles(token);
    return roles.every(role => userRoles.has(role));
  }

  public async hasAnyRole(token: string, roles: TRole[]) {
    const userRoles = await this.getUserRoles(token);
    return roles.some(role => userRoles.has(role));
  }
}
/*
 * This is a singleton instance of the ACL class
 * Next.js serverless functions are stateless and it created multiple node process so each thread will have instance and we don't want that, so we need to cache the ACL instance in a global variable
 */

const acl = new ACL();
export { ACL, acl };
