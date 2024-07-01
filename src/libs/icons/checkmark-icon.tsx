import type { ThemeIconProps } from '@mantine/core';
import { ThemeIcon } from '@mantine/core';

const CheckMarkIcon = (props: Omit<ThemeIconProps, 'children'>) => (
  <ThemeIcon {...props} bg="none">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.5481 6.35147C21.0168 6.8201 21.0168 7.5799 20.5481 8.04853L10.9481 17.6485C10.4795 18.1172 9.71971 18.1172 9.25108 17.6485L4.45108 12.8485C3.98245 12.3799 3.98245 11.6201 4.45108 11.1515C4.91971 10.6828 5.67951 10.6828 6.14814 11.1515L10.0996 15.1029L18.8511 6.35147C19.3197 5.88284 20.0795 5.88284 20.5481 6.35147Z"
        fill="white"
      />
    </svg>
  </ThemeIcon>
);

export default CheckMarkIcon;
