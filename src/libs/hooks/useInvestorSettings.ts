import { useQuery } from '@tanstack/react-query';

import useLanguage from '@/libs/hooks/useLanguage';
import { investorSettingsQueryOptions } from '@/libs/services/investor/investorSettingsQueryOptions';

export default function useInvestorSettings() {
  const { language } = useLanguage();
  return useQuery({
    ...investorSettingsQueryOptions.details(language),
    cacheTime: Infinity,
    staleTime: Infinity,
  });
}
