import { useDirection } from '@mantine/core';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useCallback } from 'react';

type UseLanguage = () => {
  language: 'ar' | 'en';
  changeLanguage: (language: 'ar' | 'en') => void;
};

const useLanguage: UseLanguage = () => {
  const {
    pathname,
    asPath,
    query,
    replace: routerReplace,
    locale: currentLocale,
  } = useRouter();
  const { i18n } = useTranslation();
  const { toggleDirection } = useDirection();
  const changeLanguage = useCallback(
    (locale: 'ar' | 'en') => {
      if (currentLocale === locale) return;
      routerReplace({ pathname, query }, asPath, { locale });
      toggleDirection();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentLocale, pathname, query, asPath],
  );

  return {
    language: (i18n.language as 'ar' | 'en') || 'ar',
    changeLanguage,
  };
};

export default useLanguage;
