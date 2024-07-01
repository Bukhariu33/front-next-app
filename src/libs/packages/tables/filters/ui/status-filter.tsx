import { useEffect, useId, useState } from 'react';

import SelectInput from '@/libs/components/Base/inputs/select-input';
import type { Status } from '@/libs/types/status';

import type { StatusFilter } from '../Builders/Status-Filter';

interface StatusFilterProps {
  builder: StatusFilter;
}

const StatusFilterUI = ({ builder }: StatusFilterProps) => {
  const [status, setStatus] = useState<Status>();
  useEffect(() => builder.subscribe(setStatus), [builder]);
  const key = useId();

  return (
    <SelectInput
      key={key}
      namespace="common"
      placeholder="status"
      classNames={{
        input:
          'h-[var(--filter-manager-input-height-sm)]  sm:h-[var(--filter-manager-input-height)] ',
        label: 'sr-only',
      }}
      label="status"
      value={status}
      data={builder.options}
      onChange={option => {
        if (!option) return builder.clear();
        return builder.setStatus(option as any);
      }}
    />
  );
};

export default StatusFilterUI;
