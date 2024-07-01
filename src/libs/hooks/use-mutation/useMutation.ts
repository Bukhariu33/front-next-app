/* eslint-disable no-restricted-imports */
import { notifications } from '@mantine/notifications';
import type { UseMutationResult } from '@tanstack/react-query';
import {
  useMutation as _useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useTranslation } from 'next-i18next';
import { useRef } from 'react';

import { env } from '@/libs/Env.mjs';
import { openErrorModal, openSuccessModal } from '@/libs/packages/modals';
import type { Namespace } from '@/libs/types/utils/withTranslation';

import type { RestrictedMutationOptions } from '.';
import { getQueryKey } from './utils';

/**
 * A custom hook that wraps the `useMutation` hook from `react-query` library and provides additional error handling and revalidation functionality.
 * @template TData The expected response data type.
 * @template TVariables The expected request variables type.
 * @template TContext The expected context type.
 * @param {RestrictedMutationOptions<TData, AxiosError<APIError>, TVariables, TContext>} options The mutation options object.
 * @returns {UseMutationResult<TData, AxiosError<APIError>, TVariables, TContext>} The result object of the mutation hook.
 *
 */
function useMutation<
  TData = unknown,
  TVariables = void,
  TContext = unknown,
  TNamespace extends Namespace = any,
>(
  options: RestrictedMutationOptions<
    TData,
    AxiosError<APIError>,
    TVariables,
    TContext,
    TNamespace
  >,
): UseMutationResult<TData, AxiosError<APIError>, TVariables, TContext> {
  const queryClient = useQueryClient();
  const failureCount = useRef(0);
  const { t } = useTranslation();

  const mutation = _useMutation({
    ...options,

    onError(error, variables, context) {
      /**
       * All validation(422) errors are handled by the useForms hook. it will show the error inline with the input
       */
      if (error.response?.status !== 422) {
        /**
         * If the error is not a validation error, the BE error message will be shown in a modal; if there is no onError callback the error will be shown in a modal without actions buttons
         */
        const params = options.onError?.(
          error,
          variables,
          context,
          options.namespace,
        ) || {
          id: `Mutations.Error${error.response?.config.url?.toString()}`,
          title: failureCount.current > 3 ? 'tooManyRequestsTitle' : undefined,
          namespace: options.namespace,
          body:
            failureCount.current > 3
              ? t('tooManyRequests', {
                  time: env.NEXT_PUBLIC_RATE_LIMITER_IN_MS / 1000,
                })
              : error.response?.data?.message || error.message,
          translate: false,
          tryAgainProps: {
            disabled: failureCount.current > 3,
          },
          labels: {
            tryAgain: `tryAgain`,
          },
          onTryAgain() {
            notifications.show({
              message: t('processingYourRequest'),
              loading: true,
              withCloseButton: false,
              color: 'primary',
              h: '45px',
              id: 'Mutations.Loading',
            });
            failureCount.current += 1;
            if (failureCount.current <= 3) {
              mutation.mutate(variables);
            } else {
              setTimeout(() => {
                failureCount.current = 0;
              }, env.NEXT_PUBLIC_RATE_LIMITER_IN_MS);
            }
          },
        };
        params.namespace = options.namespace;
        openErrorModal(params);
      }

      return options.onError?.(error, variables, context, options.namespace);
    },
    onSuccess(data, variables, context) {
      /**
       * If the request is successful, the onSuccess callback will be called or modal will be shown based on the onSuccess Return type
       */
      const params = options.onSuccess?.(
        data,
        variables,
        context,
        options.namespace,
      );
      if (params) {
        params.namespace = options.namespace;
        openSuccessModal(params);
      }
    },
    onSettled(data, error, variables, context) {
      if (options.revalidateOnSettled) {
        const keys = getQueryKey(options.queryOptions);
        keys.forEach(key => {
          queryClient.invalidateQueries({
            exact: false,
            queryKey: [key],
            type: 'all',
          });
        });
      }
      notifications.hide('Mutations.Loading');
      return options.onSettled?.(data, error, variables, context);
    },
  });

  return mutation;
}

export { useMutation };
