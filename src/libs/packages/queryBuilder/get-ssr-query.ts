import type { QueryFunctionContext } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { QueryOptionsResult } from './query-factory';

const cleanObject = (obj: any): any => {
  const cleaned = JSON.parse(
    JSON.stringify(obj, (_, value) => {
      if (value === undefined) {
        return null; // replace undefined with null
      }
      return value;
    }),
  );
  return cleaned;
};

export const getSSRQuery = async (
  queryOptions: QueryOptionsResult<any>,
  accessToken?: string,
) => {
  try {
    const queryClient = new QueryClient();
    const data = await queryClient.fetchQuery({
      ...queryOptions,
      queryFn: queryOptions.ssrQueryFn?.(accessToken),
    });

    return {
      props: {
        data: cleanObject(data),
      },
    };
  } catch (error: any) {
    if (
      (error as AxiosError<APIError>).response?.status === 404 ||
      (error as AxiosError<APIError>).response?.data.status === 404
    ) {
      return {
        notFound: true,
      };
    }
    return {
      // this will be handled by the client global error boundary
      props: {},
    };
  }
};

type QueryFn<T> = (
  _context: QueryFunctionContext,
  token?: string,
) => Promise<T>;

export const createSSRQueryFn = <T>(queryFn: QueryFn<T>) => {
  return (token?: string) => {
    return async (_context: QueryFunctionContext) => {
      return queryFn(_context, token);
    };
  };
};

export const setSafeAccessToken = (token?: string) => {
  if (typeof window === 'undefined') {
    return {
      Cookie: `access_token=${token}`,
    };
  }
  return undefined;
};
