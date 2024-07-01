import { useQuery } from '@tanstack/react-query';

import listFundManagersOptionsQueryOptions from '@/libs/services/admin/fund-managers/list-managers-options';

function useFundManagersListOptions() {
  return useQuery(listFundManagersOptionsQueryOptions.details());
}

export default useFundManagersListOptions;
