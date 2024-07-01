import type { TEnum } from '@/libs/types/interface/enum';

export const parseEnum = <T extends string>(enumObj: TEnum<T>): T => {
  return enumObj.value as T;
};
