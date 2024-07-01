import type { WithRevalidateOnSettled } from '.';

const isStringArr = (
  value: WithRevalidateOnSettled['queryOptions'],
): value is string[] => {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
};
export const getQueryKey = (
  options: WithRevalidateOnSettled['queryOptions'],
): string[] => {
  if (!options) return [];
  if (isStringArr(options)) {
    return options;
  }
  if (Array.isArray(options)) {
    return options.map(option => option.queryKey);
  }
  return [options.queryKey];
};
