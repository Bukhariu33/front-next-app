import { useQuery } from '@tanstack/react-query';

import { getSupportTicketOptionsQueryOptions } from '@/libs/services/support/support-ticket-category-options';

import useLanguage from '../useLanguage';

function useSupportCategories(): { value: string; label: string }[] {
  const { language } = useLanguage();
  const { data } = useQuery(
    getSupportTicketOptionsQueryOptions.details(language),
  );

  return data!;
}

export default useSupportCategories;
