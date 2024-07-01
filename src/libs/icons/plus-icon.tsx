import type { SVGProps } from 'react';

const PlusIcon = (props: SVGProps<any>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="7.5" y="0.5" width="2" height="15" rx="1" fill="white" />
    <rect
      x="15.5"
      y="6.5"
      width="2"
      height="15"
      rx="1"
      transform="rotate(90 15.5 6.5)"
      fill="white"
    />
  </svg>
);

export default PlusIcon;
