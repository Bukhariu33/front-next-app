/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import withBundleAnalyzer from '@next/bundle-analyzer';
import i18Config from './next-i18next.config.js';
import './src/libs/Env.mjs';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
export default bundleAnalyzer({
  eslint: {
    dirs: ['.'],
    ignoreDuringBuilds: process.env.APP_ENV !== 'production',
  },
  i18n: i18Config.i18n,
  typescript: {
    ignoreBuildErrors: process.env.APP_ENV !== 'production',
  },
  images: {
    domains: ['images.unsplash.com'],
  },
  poweredByHeader: false,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  /**
   *
   * @param {any} config
   * @returns
   */
  webpack: config => {
    // config.externals is needed to resolve the following errors:
    // Module not found: Can't resolve 'bufferutil'
    // Module not found: Can't resolve 'utf-8-validate'

    // eslint-disable-next-line no-param-reassign
    config.resolve.fallback = { fs: false };
    config.externals.push({
      bufferutil: 'bufferutil',
      'utf-8-validate': 'utf-8-validate',
      prettier: 'prettier',
    });

    return config;
  },
});
