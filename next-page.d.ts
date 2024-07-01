import type { ReactElement, ReactNode } from 'react';
import type { NextComponentType, NextPageContext } from 'next';

declare module 'next' {
  export declare type NextPage<P = {}, IP = P> = NextComponentType<
    NextPageContext,
    IP,
    P
  > & {
    // eslint-disable-next-line no-unused-vars
    getLayout?: (page: ReactElement) => ReactNode;
  };
}
