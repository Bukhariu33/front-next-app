import type { FC } from 'react';

interface CalenderProps {
  width?: number;
  height?: number;
}

const Calender: FC<CalenderProps> = ({ height = 18, width = 18 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
        stroke="#DCAC00"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.6949 13.7002H15.7039M15.6949 16.7002H15.7039M11.9949 13.7002H12.0049M11.9949 16.7002H12.0049M8.29395 13.7002H8.30395M8.29395 16.7002H8.30395"
        stroke="#DCAC00"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Calender;
