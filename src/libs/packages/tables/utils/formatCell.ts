import Router from 'next/router';

import { formatToMoney } from '@/libs/hooks/useFormatToMoney';

import type { CellType } from '../types';

const formatCell = (
  type: Omit<CellType<any>, 'status'>,
  value?: string | number | null,
) => {
  const lang = Router.locale || 'en';
  switch (type) {
    case 'date':
      if (!value) return '---/--/--';
      return new Date(value).toLocaleDateString('en-ca');
    case 'money':
      return formatToMoney(Number(value) || 0, lang as 'en' | 'ar');
    case 'number':
      return Number(value) || 0;
    default:
      return value || 'N/A';
  }
};

export { formatCell };
