import useLanguage from '@/libs/hooks/useLanguage';
import getLocalizedString from '@/utils/getLocalizedString';

function useLocalization<Data extends Record<string, any> | undefined>(
  data: Data,
) {
  const { language } = useLanguage();

  function getLocalizedValue(key: string) {
    if (!data) return undefined;
    return getLocalizedString(data, key, language);
  }

  return { getLocalizedValue };
}

export default useLocalization;
