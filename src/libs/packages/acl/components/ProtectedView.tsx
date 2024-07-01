import { Paper } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import MainTitle from '@/libs/components/Base/typography/MainTitle';
import type { EPermission } from '@/libs/configs/appConfig';
import ErrorIcon from '@/libs/icons/error-icon';

import { permissionsGuard } from '../utils';

interface ProtectedViewProps {
  required: EPermission[];
  can: Record<EPermission, boolean>;
  children: React.ReactNode;
}

export const ProtectedView: FC<ProtectedViewProps> = ({
  required,
  can,
  children,
}) => {
  const { t } = useTranslation('admin-common');
  permissionsGuard(required, can);
  if (required.every(permission => can[permission])) {
    return children;
  }

  return (
    <Paper className="mx-auto my-4  w-1/2  space-y-4 p-8 shadow-sm">
      <MainTitle
        className="text-md w-full"
        text={t('permissionDeniedTitle')}
        order={3}
      />
      <div className=" flex items-center justify-between gap-4">
        <div className="space-y-4">
          {t('permissionDeniedMessage')}
          <MainTitle
            text={t('requiredPermissions')}
            order={5}
            className="text-md"
          />
          <ul>
            {required.map(permission => (
              <li key={permission}>{permission}</li>
            ))}
          </ul>
        </div>
        <ErrorIcon />
      </div>
    </Paper>
  );
};
