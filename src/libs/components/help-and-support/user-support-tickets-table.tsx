import { Stack } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { useRef } from 'react';

import Table from '@/libs/packages/tables';
import { DateRangeFilter } from '@/libs/packages/tables/filters/Builders/DateRange';
import { StatusFilter } from '@/libs/packages/tables/filters/Builders/Status-Filter';
import listSupportQueryOptions from '@/libs/services/support/support-list';
import type { UserType } from '@/libs/types/auth';
import getSupportStatusOptions from '@/utils/get-support-status-options';

export default function UserSupportTicketsTable({
  userType,
}: {
  userType: UserType;
}) {
  const { t } = useTranslation(['common', 'support']);

  const filters = useRef({
    statusFilter: new StatusFilter(getSupportStatusOptions(t)),
    DateFilter: new DateRangeFilter(),
  }).current;

  return (
    <Stack className="mt-[-20px]">
      <Table
        namespace="support"
        headers={[
          'id',
          'mainTitle',
          'class',
          'sendingDate',
          'noMessages',
          'status',
        ]}
        cellsType={['link', 'text', 'text', 'date', 'text', 'status']}
        args={[userType]}
        queryOptions={listSupportQueryOptions.details}
        filters={filters}
      />
    </Stack>
  );
}
