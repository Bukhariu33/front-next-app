import type { QueryFunctionContext } from '@tanstack/react-query';

import type { UserType } from '@/libs/types/auth/user';

/**
 * Represents a query key type.
 */
type QKey = `GET_${UserType | 'Global'}_${string}`;

/**
 * Options for a query.
 * @template TData Type of data returned by the query.
 * @template TArgs Type of arguments passed to the query function.
 */
interface TQueryOptions<TData = unknown> {
  /** Function responsible for fetching data. */
  queryFn: (
    args: QueryFunctionContext & {
      token?: string;
    },
  ) => Promise<TData>;

  /** Whether the query is enabled or not. */
  enabled?: boolean;

  ssrQueryFn?: (
    token?: string,
  ) => (args: QueryFunctionContext) => Promise<TData>;
}

/**
 * Parameters to initialize the query store.
 * @template TData Type of data returned by the query.
 * @template TArgs Type of arguments passed to the query function.
 */
interface QueryStoreParams<
  TData = unknown,
  TArgs extends unknown[] = unknown[],
> {
  /** Unique identifier for the query. */
  key: QKey;

  /** Function that produces query options for a specific query detail. */
  detail: (...args: TArgs) => TQueryOptions<TData>;
}

type QueryOptionsResult<TData = unknown> = TQueryOptions<TData> & {
  queryKey: [QKey, ...unknown[]];
};

export type QueryOptionsReturnType<
  TData = unknown,
  TArgs extends unknown[] = unknown[],
> = {
  /**
   * Generates query options for a particular detail.
   * @param {...TArgs} args Arguments to pass to the details Factory.
   * @returns Query options for the specific query detail.
   */
  details: (...args: TArgs) => QueryOptionsResult<TData>;

  /** Unique identifier for the query. */
  queryKey: QKey;
};
/**
 * Creates query options based on the configuration provided.
 * @template TData Type of data returned by the query.
 * @template TArgs Type of arguments passed to the query function.
 * @param {QueryStoreParams<TData, TArgs>} params Parameters to initialize the query store.
 * @returns Object containing a function for generating query options.
 */
const createQueryOptions = <
  TData = unknown,
  TArgs extends unknown[] = unknown[],
>({
  key,
  detail,
}: QueryStoreParams<TData, TArgs>): QueryOptionsReturnType<TData, TArgs> => {
  /** this is for better understanding to differ the details from params and the details returned  */
  function detailsFactory(...args: TArgs): QueryOptionsResult<TData> {
    const { queryFn, enabled, ssrQueryFn } = detail(...args);

    return {
      queryFn,
      enabled,
      queryKey: [key, ...args],
      ssrQueryFn,
    };
  }
  return {
    details: detailsFactory,
    get queryKey() {
      return key;
    },
  };
};

const createQKey = (userType: UserType | 'Global', key: string): QKey =>
  `GET_${userType}_${key}`;
export { createQKey, createQueryOptions };
export type { QKey, QueryOptionsResult, QueryStoreParams, TQueryOptions };
