import { useEffect, useId, useState } from 'react';

import SearchIcon from '@/icons/search-icon';
import Input from '@/libs/components/Base/inputs/input';

import type { SearchFilter as SearchFilterBuilder } from '../Builders/Search-Filter';

function SearchFilter({ builder }: { builder: SearchFilterBuilder }) {
  const [keyword, setKeyword] = useState('');
  const key = useId();

  useEffect(() => builder.subscribe(setKeyword), [builder]);
  return (
    <Input
      key={key}
      namespace="common"
      placeholder="search"
      label="search"
      rightSection={<SearchIcon />}
      classNames={{
        input:
          'h-[var(--filter-manager-input-height-sm)]  sm:h-[var(--filter-manager-input-height)] min-w-[190px] max-w-[200px] ',
        label: 'hidden',
      }}
      type="search"
      value={keyword}
      onChange={ev => {
        const searchKey = ev.target.value.trim();
        if (searchKey === keyword) return;
        if (ev.target.value.length > 0) {
          builder.setKeyword(ev.target.value);
        } else {
          builder.clear();
        }
      }}
    />
  );
}

export default SearchFilter;
