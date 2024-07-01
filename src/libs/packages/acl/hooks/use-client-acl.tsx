import type { EPermission } from '@/libs/configs/appConfig';

import { openErrorModal } from '../../modals';
import { permissionsGuard } from '../utils';

interface IUseClientAclProps {
  can: Record<EPermission, boolean>;
}

const checkOrThrow = (
  can: Record<EPermission, boolean>,
  action: EPermission,
  event?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>,
) => {
  permissionsGuard([action], can);

  const permission = can[action];
  if (!permission) {
    event?.preventDefault();
    event?.stopPropagation();
    openErrorModal({
      id: `acl.${action}`,
      namespace: 'admin-common',
      translate: true,
      body: 'permissionDeniedMessage',
      title: 'permissionDeniedTitle',
      onTryAgain() {},
      tryAgainProps: {
        disabled: true,
        display: 'none',
      },
      cancelProps: {
        className: 'w-full',
      },
      groupProps: {
        className: 'flex justify-center',
      },
    });
  }
  return permission;
};

function useClientAcl({ can }: IUseClientAclProps): {
  checkOrThrow: (
    action: EPermission,
    event?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>,
  ) => boolean;
} {
  return {
    checkOrThrow: (action, event) => checkOrThrow(can, action, event),
  };
}

export default useClientAcl;
