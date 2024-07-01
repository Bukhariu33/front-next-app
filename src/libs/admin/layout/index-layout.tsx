import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import FloatingHeader from '@/libs/admin/layout/floating-header';
import useIsMounted from '@/libs/hooks/use-mounted';
import useNavLinks from '@/libs/hooks/useNavLinks';

interface Props {
  children?: React.ReactNode;
}

const AdminIndexLayout: FC<Props> = ({ children }) => {
  const mounted = useIsMounted();
  const links = useNavLinks();
  const activeTab = links.find(link => link.isActive);
  const { t } = useTranslation('common');
  if (!mounted) return null;
  return (
    <div>
      <FloatingHeader
        icon={activeTab?.bigIcon}
        title={activeTab?.label ?? t('notApplicable')}
      >
        <div id="portal-floating-header-child" />
      </FloatingHeader>
      {children}
    </div>
  );
};

export default AdminIndexLayout;
