import { useTranslation } from 'next-i18next';

import auth from '../../../public/locales/en/auth.json';
import common from '../../../public/locales/en/common.json';
import error from '../../../public/locales/en/error.json';

export const mockUseTranslation = () => {
  (useTranslation as jest.Mock).mockImplementation(
    (namespace: string | string[]) => {
      let translations: Record<string, string> = {};

      // Convert the namespace to an array if it's a single string
      const namespaces = Array.isArray(namespace) ? namespace : [namespace];

      // Iterate over namespaces array to merge all translations
      namespaces.forEach(ns => {
        switch (ns) {
          case 'auth':
            translations = { ...translations, ...auth };
            break;
          case 'common':
            translations = { ...translations, ...common };
            break;
          case 'error':
            translations = { ...translations, ...error };
            break;
          default:
            break;
        }
      });

      return {
        t: (key: string) => {
          return translations[key] || key;
        },
      };
    },
  );
};
