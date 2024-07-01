import { useQuery } from '@tanstack/react-query';

import { adminSettingsQueryOptions } from '@/libs/services/admin/adminSettingsQueryOptions';

export default function useAdminSettings() {
  return useQuery({
    ...adminSettingsQueryOptions.details(),
    cacheTime: Infinity,
    staleTime: Infinity,
  });
}
