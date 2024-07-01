import type { UserModel } from './user';

interface User extends UserModel {}

declare module 'next-auth' {
  interface Session {
    user?: User;
  }
  // eslint-disable-next-line @typescript-eslint/no-shadow
  interface User extends UserModel {}
  interface DefaultUser extends User {}
}

declare module 'next-auth/jwt' {
  interface DefaultJWT {}
  type JWT = User;
}
