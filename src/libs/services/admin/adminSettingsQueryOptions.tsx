import type { SelectInputOptions } from '@/libs/components/Base/inputs/select-input';
import { axiosInternal } from '@/libs/configs/axios';
import { createQKey, createQueryOptions } from '@/packages/queryBuilder';
import type { AdminSettings } from '@/pages/api/admin/settings';

const adminSettingsQueryOptions = createQueryOptions({
  key: createQKey('admin', 'admin-settings'),
  detail: () => ({
    queryFn: async () => {
      const { data } =
        await axiosInternal.get<AdminSettings>(`/admin/settings`);
      const keys = Object.keys(data) as (keyof AdminSettings)[];
      const options: Record<keyof AdminSettings, SelectInputOptions> =
        keys.reduce(
          (acc, key) => {
            const setting = data[key];
            const option: SelectInputOptions = setting
              ? setting.map(item => ({
                  label: item.label,
                  value: item.key,
                }))
              : [];
            return {
              ...acc,
              [key]: option,
            };
          },
          {} as Record<keyof AdminSettings, SelectInputOptions>,
        );

      return options;
    },
  }),
});

export { adminSettingsQueryOptions };
