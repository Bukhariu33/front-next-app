import Link from 'next/link';

import ChevronIcon from '@/icons/chevron-icon';

const BackLink = ({ to, label }: { to: string; label: string }) => {
  return (
    <Link href={to} className="flex flex-row items-center gap-5">
      <ChevronIcon className="rotate-90 stroke-black rtl:-rotate-90" />
      <span className="text-2xl font-bold leading-8">{label}</span>
    </Link>
  );
};

export default BackLink;
