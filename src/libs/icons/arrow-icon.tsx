import type { SVGProps } from 'react';

export default function ArrowIcon(props: SVGProps<any>) {
  return (
    <svg
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.5 14L12.0118 9.88384C12.6627 9.39773 12.6627 8.60227 12.0118 8.11616L6.5 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
