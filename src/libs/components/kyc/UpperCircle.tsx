import { Box } from '@mantine/core';

export default function UpperCircle() {
  return (
    <Box className="fixed left-0 top-0 -z-10 overflow-hidden bg-white/70">
      <Box className="absolute inset-0 left-[-349px] right-[-4px] top-[-325px] h-[743px] w-[743px] rounded-full backdrop-blur-[91px] lg:left-[-154px] lg:right-auto lg:top-[-328px] lg:h-[1023px] lg:w-[1023px]" />
      <svg
        width="870"
        height="695"
        viewBox="0 0 870 695"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.8">
          <circle
            cx="377.832"
            cy="145.692"
            r="203.068"
            transform="rotate(90 377.832 145.692)"
            fill="#DCAC00"
          />
          <circle
            cx="182.27"
            cy="243.461"
            r="203.068"
            transform="rotate(90 182.27 243.461)"
            fill="#2A2522"
          />
          <circle
            cx="385.338"
            cy="313.013"
            r="203.068"
            transform="rotate(90 385.338 313.013)"
            fill="#DCAC00"
          />
          <g filter="url(#filter0_b_6_80662)">
            <circle
              cx="357.819"
              cy="183.388"
              r="511.388"
              transform="rotate(90 357.819 183.388)"
              fill="white"
              fillOpacity="0.79"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_b_6_80662"
            x="-335.527"
            y="-509.958"
            width="1386.69"
            height="1386.69"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="90.9792" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur_6_80662"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur_6_80662"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </Box>
  );
}
