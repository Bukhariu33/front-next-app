import type { SVGProps } from 'react';

export default function ErrorIcon(props: SVGProps<any>) {
  return (
    <svg
      width="80"
      height="88"
      viewBox="0 0 80 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className="rtl:scale-x-[-1]"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40.4001 79.4461C62.2705 79.4461 80.0001 61.7166 80.0001 39.8461C80.0001 17.9756 62.2705 0.246094 40.4001 0.246094C18.5296 0.246094 0.800049 17.9756 0.800049 39.8461C0.800049 52.1606 6.42109 63.1623 15.2374 70.4253C15.2514 70.4369 15.2389 70.4594 15.2217 70.4535C15.2111 70.4499 15.2001 70.4577 15.2001 70.4689V83.7503C15.2001 86.7295 18.3403 88.6632 21.0006 87.3221L35.9085 79.8072C36.5719 79.4727 37.3151 79.3346 38.0569 79.3779C38.8321 79.4232 39.6134 79.4461 40.4001 79.4461Z"
        fill="#FEF2F2"
      />
      <path
        d="M26 53.7285L54.7285 25M26 25L54.7285 53.7285"
        stroke="#fa5252"
        strokeWidth="6.57307"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
