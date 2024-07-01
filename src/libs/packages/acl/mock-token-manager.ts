import { EPermission } from '@/libs/configs/appConfig';

import type { Token, TokenManager, TokenType } from './token-manager';

const adminPermissionsMock: EPermission[] = [
  EPermission.ReadPermissions,
  EPermission.CreateRoles,
  EPermission.CreatePermissions,
  EPermission.CreateAdmins,
  EPermission.ManageRoles,
  EPermission.UpdatePermissions,
  EPermission.UpdateRoles,
  EPermission.ReadRoles,
  EPermission.DeleteRoles,
  EPermission.DeletePermissions,
  EPermission.ReadAdmins,
  EPermission.UpdateAdmins,
  EPermission.DeleteAdmins,
  EPermission.ManageAdmins,
  EPermission.ReadInvestors,
  EPermission.ReadFundManagers,
  EPermission.ManageFundManagers,
  EPermission.ManageInvestors,
  EPermission.ReadFund,
  EPermission.CreateFund,
  EPermission.UpdateFund,
  EPermission.DeleteFund,
  EPermission.ManageFund,
];

const rolesMock = ['superAdmin', 'creditManager'];

class MockTokenManager implements Pick<TokenManager, 'get'> {
  // eslint-disable-next-line class-methods-use-this
  public async get(
    tokenId: string,
    tokenType: TokenType,
  ): Promise<Token | undefined> {
    if (tokenId && tokenType === 'admin') {
      return {
        roles: rolesMock,
        permissions: adminPermissionsMock,
      };
    }
    return {
      roles: [],
      permissions: [],
    };
  }
}

export default MockTokenManager;
