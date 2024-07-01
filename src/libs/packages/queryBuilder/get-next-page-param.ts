import type { GetNextPageParamFunction } from '@tanstack/react-query';

export const getNextPageParam: GetNextPageParamFunction<
  APIResponse<any>
> = lastPage =>
  lastPage.meta.currentPage < lastPage.meta.lastPage
    ? lastPage.meta.currentPage + 1
    : undefined;
