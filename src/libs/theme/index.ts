import type { MantineColorsTuple, MantineThemeOverride } from '@mantine/core';
import { createTheme } from '@mantine/core';
import { Tajawal } from 'next/font/google';

import styleConfig from '../configs/styleConfig';
import inputOverrides from './override/Input';

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  variable: '--brand-font',
  display: 'block',
  preload: true,
});
const primaryColor = Object.values(styleConfig.colors.primary).slice(
  0,
  10,
) as any as MantineColorsTuple;

const theme: MantineThemeOverride = createTheme({
  fontFamily: tajawal.style.fontFamily,
  fontFamilyMonospace: tajawal.style.fontFamily,

  headings: {
    fontFamily: tajawal.style.fontFamily,
  },
  colors: {
    primary: primaryColor,
  },
  components: {
    Input: inputOverrides,
  },
  primaryColor: 'primary',
  primaryShade: 6, // primary.500
  black: styleConfig.colors.black.dark,
  defaultRadius: '8px',
});

export default theme;
