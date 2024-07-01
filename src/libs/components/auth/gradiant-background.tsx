import { Box } from '@mantine/core';

export const GradientBg = () => {
  return (
    <div className="fixed inset-0 -z-50 blur-xl">
      <Box className=" fixed bottom-0 right-0 -z-50 hidden bg-white/70 opacity-60 blur-[100px]  md:block">
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
      <Box
        className=" fixed -left-[150px] -top-[200px] -z-50 bg-white/70
        opacity-60 blur-[91px] md:left-0 md:top-0"
      >
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
    </div>
  );
};
