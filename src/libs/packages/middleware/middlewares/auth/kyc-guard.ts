import type { JWT } from 'next-auth/jwt';
import { getToken } from 'next-auth/jwt';

import { PATH_SEGMENTS } from '@/libs/configs/appConfig';
import { env } from '@/libs/Env.mjs';

import MiddlewareError from '../../core/middleware-error';
import type { TMiddlewareHandler } from '../../types/handler';

const kycGuardMiddleware: TMiddlewareHandler = async (
  request,
  { isPathMatches },
) => {
  const user = (await getToken({
    req: request,
    secret: 'b5c9ee2457c305d6a2f4a077431aedc02b1d0f3d854edc64894f30372d6cce34',
  })) as any as JWT;

  const allowedPaths = isPathMatches(request.nextUrl, 'investorKycPaths');

  if (user?.isKycComplete && allowedPaths) {
    throw new MiddlewareError(
      `${env.NEXT_PUBLIC_FRONTEND_URL}/${request.nextUrl.locale}/${
        PATH_SEGMENTS[user.type]
      }`,
    );
  }

  return true;
};

export { kycGuardMiddleware };

