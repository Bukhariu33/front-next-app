import type { ComponentPropsWithoutRef } from 'react';

const NotAcceptableRatingIcon = (props: ComponentPropsWithoutRef<'svg'>) => (
  <svg
    width="129"
    height="128"
    viewBox="0 0 129 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      opacity="0.6"
      d="M128.5 64C128.5 99.3462 99.8462 128 64.5 128C29.1538 128 0.5 99.3462 0.5 64C0.5 28.6538 29.1538 0 64.5 0C99.8462 0 128.5 28.6538 128.5 64Z"
      fill="#D9D9D9"
    />
    <path
      d="M43.7715 85.5356L86.0356 43.2715M43.7715 43.2715L86.0356 85.5356"
      stroke="#64646C"
      strokeWidth="9.67"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default NotAcceptableRatingIcon;
