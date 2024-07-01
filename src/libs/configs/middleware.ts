import { authMiddleware } from '../packages/middleware/middlewares/auth/authMiddleware';
import { kycGuardMiddleware } from '../packages/middleware/middlewares/auth/kyc-guard';
import { roleGuardMiddleware } from '../packages/middleware/middlewares/auth/role-guard';
import type { TMiddlewareHandler } from '../packages/middleware/types/handler';

const middlewareOptions: IOptions = {
  paths: {
    publicPaths: [
      '/owais-financial-policies/*',
      '/funds/:id',
      '/',
      '/playground',
    ],
    authPaths: ['/auth/*', '/admin/auth/*'],
    adminPaths: ['/admin/*', '/admin/:path/:id'],
    investorPaths: ['/user/*'],
    investorKycPaths: ['/investor/kyc/*'],
    fundManagerPaths: ['/fund-manager/*', '/funds/:id/*'],
  },
};

const middlewaresConfig: TMiddlewareHandler[] = [
  authMiddleware,
  roleGuardMiddleware,
  kycGuardMiddleware,
];

export { middlewareOptions, middlewaresConfig };

