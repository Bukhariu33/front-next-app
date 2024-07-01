import type { NextURL } from 'next/dist/server/web/next-url';
import type { NextRequest } from 'next/server';

import type MiddlewareError from '../core/middleware-error';

interface IMiddlewareError {
  redirectUrl: string;
}

type IsPathMatches = (
  url: NextURL,
  pathsType: keyof IOptions['paths'],
) => boolean;

export type TMiddlewareHandler = (
  request: NextRequest,
  helpers: {
    isPathMatches: IsPathMatches;
  },
) => Promise<true | MiddlewareError>;
