import type { ClassValue } from 'clsx';

import ChevronIcon from './chevron-icon';

function BackIcon({ className }: { className?: ClassValue }) {
  return (
    <ChevronIcon
      className={`mr-3 h-8 w-8 rotate-90 stroke-black rtl:-rotate-90 ${className}`}
    />
  );
}

export default BackIcon;
