import { CacheManager } from './cache-manager';

interface Admin {
  id: number;
  uuid: string;
  mobile: string;
  acl: {
    roles: string[];
    permissions: string[];
  };
}

interface User {
  uuid: string;
  mobile: string;
}

interface RawToken {
  created_at: string;
  updated_at: string;
  id: number;
  uuid: string;
  user_agent: string;
  expires_at: string;
  user_type: 'admin' | 'user';
  user_id: number;
  admin?: Admin;
  user?: User;
}

export interface Token {
  roles: string[];
  permissions: string[];
}

export type TokenType = 'admin' | 'user';

export class TokenManager {
  constructor(private cacheManager: CacheManager = new CacheManager()) {}

  static keyFor(tokenId: string, tokenType: 'admin' | 'user') {
    return `${tokenType}:accessTokens:${tokenId}` as const;
  }

  private async getToken(
    tokenId: string,
    tokenType: TokenType,
  ): Promise<RawToken | undefined> {
    return this.cacheManager.get<RawToken>(
      TokenManager.keyFor(tokenId, tokenType),
    );
  }

  public async get(
    tokenId: string,
    tokenType: TokenType,
  ): Promise<Token | undefined> {
    const token = await this.getToken(tokenId, tokenType);
    if (!token) return undefined;
    if (tokenType === 'admin') {
      return {
        roles: token.admin?.acl.roles ?? [],
        permissions: token.admin?.acl.permissions ?? [],
      };
    }
    return {
      roles: [],
      permissions: [],
    };
  }
}
