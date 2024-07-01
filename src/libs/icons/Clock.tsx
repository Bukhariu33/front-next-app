import type { FC } from 'react';

interface ClockProps {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

const Clock: FC<ClockProps> = ({ height = 18, width = 18, style }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 18 18"
      style={style}
    >
      <path
        stroke="#171717"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.474"
        d="M9.104 6.248v2.751l2.063 2.064m4.127-2.064a6.19 6.19 0 11-12.38 0 6.19 6.19 0 0112.38 0z"
      />
    </svg>
  );
};

export default Clock;
