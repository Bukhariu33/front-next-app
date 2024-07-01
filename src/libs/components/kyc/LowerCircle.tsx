import { Box } from '@mantine/core';

export default function LowerCircle() {
  return (
    <Box className="fixed bottom-0 right-0 -z-20 overflow-hidden bg-white/70">
      <Box className="absolute bottom-[-276px] right-[-296px] h-[921px] w-[921px] rounded-full backdrop-blur-[82px]" />
      <svg
        width="626"
        height="645"
        viewBox="0 0 626 645"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.8">
          <circle
            cx="478.973"
            cy="426.574"
            r="182.869"
            transform="rotate(90 478.973 426.574)"
            fill="#004A91"
          />
          <circle
            cx="302.863"
            cy="514.618"
            r="182.869"
            transform="rotate(90 302.863 514.618)"
            fill="#2A2522"
          />
          <circle
            cx="485.732"
            cy="577.251"
            r="182.869"
            transform="rotate(90 485.732 577.251)"
            fill="#004A91"
          />
          <g filter="url(#filter0_b_6_80663)">
            <circle
              cx="460.95"
              cy="460.521"
              r="460.521"
              transform="rotate(90 460.95 460.521)"
              fill="white"
              fillOpacity="0.79"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_b_6_80663"
            x="-163.429"
            y="-163.859"
            width="1248.76"
            height="1248.76"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="81.9296" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur_6_80663"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur_6_80663"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </Box>
  );
}
