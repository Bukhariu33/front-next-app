import type { FC } from 'react';

import { cn } from '@/utils/cn';

interface SearchIconProps extends React.SVGProps<SVGSVGElement> {}

const SearchIcon: FC<SearchIconProps> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        'stroke-brand-primary-500 dark:stroke-brand-primary-400',
        className,
      )}
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
      <path d="M21 21l-6 -6" />
    </svg>
  );
};

export default SearchIcon;
