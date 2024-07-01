import { useEffect, useId, useState } from 'react';

import SelectInput from '@/libs/components/Base/inputs/select-input';
import type { Namespace } from '@/libs/types/utils/withTranslation';

import type { SortFilter } from '../Builders/SortFilter';

function SortDropDownFilter({
  builder,
  namespace,
}: {
  builder: SortFilter;
  namespace: Namespace;
}) {
  const [sortBy, setSortBy] = useState('');
  const key = useId();

  useEffect(() => builder.subscribe(setSortBy), [builder]);
  return (
    <SelectInput
      key={key}
      name="sort"
      namespace={namespace}
      placeholder={'sortBy' as any}
      data-cy-input="sort-by"
      classNames={{
        input:
          'h-[var(--filter-manager-input-height-sm)]  sm:h-[var(--filter-manager-input-height)] ',
        label: 'sr-only',
      }}
      label={'sortBy' as any}
      value={sortBy}
      data={builder.options}
      onChange={option => {
        if (!option) return builder.clear();
        return builder.setSortBy(option);
      }}
    />
  );
}

export default SortDropDownFilter;
