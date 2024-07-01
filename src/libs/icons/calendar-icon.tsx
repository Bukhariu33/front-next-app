import type { SVGProps } from 'react';

export default function CalendarIcon(props: SVGProps<any>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.26676 7.33294V3.59961M15.7334 7.33294V3.59961M7.33343 11.0663H16.6668M5.46676 20.3996H18.5334C19.5644 20.3996 20.4001 19.5639 20.4001 18.5329V7.33294C20.4001 6.30201 19.5644 5.46628 18.5334 5.46628H5.46676C4.43583 5.46628 3.6001 6.30201 3.6001 7.33294V18.5329C3.6001 19.5639 4.43583 20.3996 5.46676 20.3996Z"
        stroke="#171717"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
