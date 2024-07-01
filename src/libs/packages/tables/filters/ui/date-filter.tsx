import { useId } from '@mantine/hooks';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import Calender from '@/icons/Calender';
import DateInput from '@/libs/components/Base/inputs/date-input';

import type { DateFilter, DateRangeFilter } from '../Builders/DateRange';

function DateFilterRangeUI({ builder }: { builder: DateRangeFilter }) {
  const [date, setDate] = useState<DateFilter>({
    startDate: builder.startDateValue ?? '',
    endDate: builder.endDateValue ?? '',
  });

  const key = useId();

  useEffect(() => builder.subscribe(setDate), [builder]);
  const startDate = date.startDate ? new Date(date.startDate) : null;
  const endDate = date.endDate ? new Date(date.endDate) : null;

  const inputProps = {
    classNames: {
      input:
        'h-[var(--filter-manager-input-height-sm)]  sm:h-[var(--filter-manager-input-height)] min-w-[190px] max-w-[200px] ',
    },
    rightSection: <Calender height={22} width={22} />,
    clearable: true,
  };
  return (
    <React.Fragment key={key}>
      <DateInput
        namespace="common"
        {...inputProps}
        maxDate={dayjs(endDate ?? endDate ?? new Date()).toDate()}
        placeholder="selectDateFrom"
        data-cy-input="date-filter-from"
        onChange={value => {
          if (value) {
            builder.setStartDate(value);
          } else {
            builder.clear('startDate');
          }
        }}
      />
      <DateInput
        namespace="common"
        {...inputProps}
        value={endDate}
        minDate={dayjs(startDate ?? startDate ?? new Date()).toDate()}
        placeholder="selectDateTo"
        data-cy-input="date-filter-to"
        onChange={value => {
          if (value) {
            builder.setEndDate(value);
          } else {
            builder.clear('endDate');
          }
        }}
      />
    </React.Fragment>
  );
}

export default DateFilterRangeUI;
