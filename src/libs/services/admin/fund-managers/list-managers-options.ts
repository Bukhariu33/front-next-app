import type { SelectInputOptions } from '@/libs/components/Base/inputs/select-input';
import { axiosInternal } from '@/libs/configs/axios';
import type { APIResponseAdminFundManagersList } from '@/libs/types/fund-managers';
import { createQKey, createQueryOptions } from '@/packages/queryBuilder';

const listFundManagersOptionsQueryOptions = createQueryOptions({
  key: createQKey('admin', 'FundManagers-list-options'),
  detail() {
    const queryFn = async () => {
      const { data } =
        await axiosInternal.get<APIResponseAdminFundManagersList>(
          `/admin/fund-managers`,
        );
      const options: SelectInputOptions = data.data
        .map(manager => ({
          label:
            manager.status === 'approved'
              ? manager.fullName
              : `${manager.fullName} (Pending)`,
          value: manager.id,
          disabled: manager.status !== 'approved',
        }))
        .sort(
          // pending at the end
          (a, b) => {
            if (a.disabled && !b.disabled) {
              return 1;
            }
            if (!a.disabled && b.disabled) {
              return -1;
            }
            return 0;
          },
        );
      return options;
    };

    return {
      queryFn,
    };
  },
});

export default listFundManagersOptionsQueryOptions;
