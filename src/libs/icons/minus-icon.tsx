import type { SVGProps } from 'react';

const MinusIcon = (props: SVGProps<any>) => (
  <svg
    width="16"
    height="2"
    viewBox="0 0 16 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="15.5"
      width="2"
      height="15"
      rx="1"
      transform="rotate(90 15.5 0)"
      fill="#DCAC00"
    />
  </svg>
);

export default MinusIcon;
