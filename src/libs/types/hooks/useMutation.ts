import type { MutationFunction, MutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type {
  ConfirmModalProps,
  ErrorModalProps,
  Translatable,
} from '@/libs/packages/modals/types';
import type { createQueryOptions } from '@/packages/queryBuilder';

import type { Namespace } from '../utils/withTranslation';

interface BaseRestrictedMutationOptions<
  TData = unknown,
  TError = AxiosError<APIError>,
  TVariables = void,
  TContext = unknown,
  TNamespace extends Namespace = Namespace,
> extends Omit<
    MutationOptions<TData, TError, TVariables, TContext>,
    'onError' | 'onSuccess' | 'mutationFn'
  > {
  namespace?: TNamespace;
  mutationFn: MutationFunction<TData, TVariables>;
  onError?: (
    error: TError,
    variables: TVariables,
    context: TContext | undefined,
    namespace: TNamespace | undefined,
  ) => (ErrorModalProps<any> & Translatable<any>) | void;
  onSuccess?: (
    data: TData,
    variables: TVariables,
    context: TContext | undefined,
    namespace: TNamespace | undefined,
  ) => ConfirmModalProps<TNamespace> | void;
  revalidateOnSettled?: boolean;
}

export type QueryOptions = {
  readonly queryKey: ReturnType<typeof createQueryOptions>['queryKey'];
};

export type WithRevalidateOnSettled = {
  revalidateOnSettled: true;
  /**
   * Query options Factory from /libs/services/my-service.ts
   */
  queryOptions: QueryOptions | QueryOptions[] | string[];
};

type WithoutRevalidateOnSettled = {
  revalidateOnSettled?: false;
};

export type RestrictedMutationOptions<
  TData = unknown,
  TError = AxiosError<APIError>,
  TVariables = void,
  TContext = unknown,
  TNamespace extends Namespace = 'common',
> = BaseRestrictedMutationOptions<
  TData,
  TError,
  TVariables,
  TContext,
  TNamespace
> &
  (WithRevalidateOnSettled | WithoutRevalidateOnSettled);
