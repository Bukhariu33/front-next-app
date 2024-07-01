import { useEffect, useId, useState } from 'react';

import SelectInput from '@/libs/components/Base/inputs/select-input';

import type { Type, TypeFilter } from '../Builders/Type-Filter';

interface TypeFilterProps {
  builder: TypeFilter;
}

const TypeFilterUI = ({ builder }: TypeFilterProps) => {
  const [type, setType] = useState<Type>();
  const key = useId();

  useEffect(() => builder.subscribe(setType), [builder]);
  return (
    <SelectInput
      key={key}
      namespace="common"
      placeholder="type"
      classNames={{
        input:
          'h-[var(--filter-manager-input-height-sm)]  sm:h-[var(--filter-manager-input-height)] ',
        label: 'sr-only',
      }}
      label="type"
      value={type}
      data={builder.options}
      onChange={option => {
        if (!option) return builder.clear();
        return builder.setType(option);
      }}
    />
  );
};

export default TypeFilterUI;
