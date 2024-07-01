import type { JWT } from 'next-auth/jwt';
import { getToken } from 'next-auth/jwt';

import { PATH_SEGMENTS } from '@/libs/configs/appConfig';
import type { UserType } from '@/libs/types/auth/user';

import MiddlewareError from '../../core/middleware-error';
import type { TMiddlewareHandler } from '../../types/handler';

const roleGuardMiddleware: TMiddlewareHandler = async (
  request,
  { isPathMatches },
) => {
  const user = (await getToken({
    req: request,
    secret: 'b5c9ee2457c305d6a2f4a077431aedc02b1d0f3d854edc64894f30372d6cce34',
  })) as any as JWT;

  console.log(user)

  const path: Record<UserType, keyof IOptions['paths']> = {
    admin: 'adminPaths',
    corporateInvestor: 'investorPaths',
    fundManager: 'fundManagerPaths',
    individualInvestor: 'investorPaths',
  };
  const allowedPaths =
    isPathMatches(request.nextUrl, path[user?.role]) ||
    isPathMatches(request.nextUrl, 'authPaths');

  if (!allowedPaths) {
    throw new MiddlewareError(
      `http://localhost:4000/${request.nextUrl.locale}/${
        PATH_SEGMENTS[user.role]
      }`,
    );
  }

  return true;
};

export { roleGuardMiddleware };

