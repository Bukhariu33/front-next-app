import type { ComponentPropsWithoutRef } from 'react';

const AcceptableRatingIcon = (props: ComponentPropsWithoutRef<'svg'>) => (
  <svg
    width="129"
    height="128"
    viewBox="0 0 129 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M128.5 64C128.5 99.3462 99.8462 128 64.5 128C29.1538 128 0.5 99.3462 0.5 64C0.5 28.6538 29.1538 0 64.5 0C99.8462 0 128.5 28.6538 128.5 64Z"
      fill="#FAF3D9"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M92.8324 43.8107C94.1449 44.817 94.3954 46.6957 93.3924 48.0108L63.9021 86.6766C62.9183 87.9666 61.427 88.7682 59.8109 88.8757C58.1948 88.9833 56.6109 88.3864 55.4656 87.238L35.9059 67.6268C34.7381 66.4558 34.7381 64.5606 35.9059 63.3897L39.6151 59.6708C40.7873 58.4955 42.6911 58.4955 43.8633 59.6708L58.8739 74.7209L84.4564 41.1786C85.463 39.8588 87.35 39.6072 88.6672 40.6171L92.8324 43.8107Z"
      fill="#DCAC00"
    />
  </svg>
);

export default AcceptableRatingIcon;
