import type { JWT } from 'next-auth/jwt';
import { getToken } from 'next-auth/jwt';

import { PATH_SEGMENTS } from '@/libs/configs/appConfig';

import MiddlewareError from '../../core/middleware-error';
import type { TMiddlewareHandler } from '../../types/handler';

const authMiddleware: TMiddlewareHandler = async (
  request,
  { isPathMatches },
) => {
  const user = (await getToken({ req: request })) as any as JWT;

  const allowedPaths =
    isPathMatches(request.nextUrl, 'publicPaths') ||
    isPathMatches(request.nextUrl, 'authPaths');

  if (user && allowedPaths) {
    throw new MiddlewareError(
      `http://localhost:4000/${PATH_SEGMENTS[user.role]}`,
    );
  }
  if (!user && !allowedPaths) {
    throw new MiddlewareError(`http://localhost:4000/auth/sign-in`);
  }
  return true;
};

export { authMiddleware };

