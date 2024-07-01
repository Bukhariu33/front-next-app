import { Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import type { PropsWithChildren } from 'react';
import React from 'react';

import { cn } from '@/utils/cn';

interface KycTableRowProps extends PropsWithChildren {
  title?: any;
  value?: React.ReactNode;
  noTopBorder?: boolean;
}

export default function KycTableRow({
  title,
  value,
  noTopBorder,
  children,
}: KycTableRowProps) {
  const { t } = useTranslation('kyc');
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 border-2 border-solid border-black px-8 py-1',
        { 'border-t-0': noTopBorder },
      )}
    >
      {/* TITLE */}
      {title && (
        <Text className="text-xl" style={{ flex: value ? '2 1 0%' : '' }}>
          {t(title)}
        </Text>
      )}

      {/* VALUE */}
      {value && (
        <Text
          className={cn('text-right text-xl rtl:text-left')}
          style={{ flex: value ? '1 2 0%' : '' }}
        >
          {value}
        </Text>
      )}

      {/* CHILDREN */}
      {children}
    </div>
  );
}
