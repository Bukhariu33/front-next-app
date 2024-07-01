import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import DownloadIcon from '@/libs/icons/download-icon';

const DownloadLinkButton = ({ href }: { href: string }) => {
  const { t } = useTranslation('fund');
  return (
    <Link
      href={href}
      target="_blank"
      className="flex items-center gap-3 rounded-lg bg-brand-primary-main px-6 py-2 font-bold text-white"
    >
      <span>
        <DownloadIcon />
      </span>
      <span>{t('download')}</span>
    </Link>
  );
};

export default DownloadLinkButton;
