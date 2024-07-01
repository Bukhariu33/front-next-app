import type { EPermission } from '@/libs/configs/appConfig';

const isUndefined = (value: any) => typeof value === 'undefined';

export const permissionsGuard = (
  permissions: EPermission[],
  can: Record<EPermission, boolean>,
) => {
  for (const permission of permissions) {
    if (isUndefined(can[permission])) {
      throw new Error(
        `Permission ${permission} is not defined available permissions is ${Object.keys(
          can,
        )} you should add it to the list of permissions`,
      );
    }
  }
};
