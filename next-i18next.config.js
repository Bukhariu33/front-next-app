const path = require('path');
const I18NextHttpBackend = require('i18next-http-backend').default;

const ChainedBackend = require('i18next-chained-backend').default;
const LocalStorageBackend = require('i18next-localstorage-backend').default;

const isBrowser = typeof window !== 'undefined';

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  // debug: process.env.NODE_ENV === 'development',
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  backend: {
    backends: isBrowser
      ? [
          LocalStorageBackend, // primary
          I18NextHttpBackend, // fallback
        ]
      : [],
    backendOptions: [
      {
        // prefix for stored languages
        prefix: 'i18next_res_',
        expirationTime: 1 * 24 * 60 * 60 * 1000,

        // language versions
        versions: {
          en: 'v1.0.00',
          ar: 'v1.0.00',
        },

        store: typeof window !== 'undefined' ? window.localStorage : null,
      },
      {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
    ],
    fallbackLng: 'en',
    fallbackNS: 'common',
  },
  use: isBrowser ? [ChainedBackend] : [],
  serializeConfig: false,
  localePath:
    typeof window === 'undefined'
      ? path.resolve('./public/locales')
      : '/locales',
  defaultNS: 'common',
  fallbackNS: 'common',
  ns: [
    'common',
    'kyc',
    'footer',
    'error',
    'auth',
    'admin-common',
    'fund',
    'support',
    'admin-fund-managers',
    'support',
  ],
  detection: {
    order: ['path', 'htmlTag', 'localStorage', 'navigator'],
  },
};
