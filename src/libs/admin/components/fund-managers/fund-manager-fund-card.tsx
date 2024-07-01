import { Skeleton } from '@mantine/core';
import { useRouter } from 'next/router';
import type { ComponentProps, FC } from 'react';

import type Card from '@/libs/components/Base/Card';
import ChevronIcon from '@/libs/icons/chevron-icon';
import DownloadIcon from '@/libs/icons/download-icon';
import type { FundMangerFund } from '@/libs/types/interface/fund';
import { cn } from '@/utils/cn';
import createFundCard from '@/utils/createFundCard';

const ALLOWED_ACTIONS = ['view', 'download-invoice'] as const;

type Action<T extends (typeof ALLOWED_ACTIONS)[number]> = {
  type: T;
};

type BuiltInActions = Action<'view' | 'download-invoice'>;
type AllowedActions = BuiltInActions;

interface AdminFundManagerFundCardProps {
  fund?: FundMangerFund;
  actions?: AllowedActions[];
  isDetailsPage?: boolean;
  withoutDetails?: boolean;
}

type CardAction = ComponentProps<typeof Card>['body']['actions'];
type FundDetails = ComponentProps<typeof Card>['body']['fundDetails'];
const AdminFundManagerFundCard: FC<AdminFundManagerFundCardProps> = ({
  fund,
  actions,
  isDetailsPage,
  withoutDetails,
}) => {
  const {
    query: { fundManagerID },
  } = useRouter();
  const cardOrientation = isDetailsPage ? 'horizontal' : 'vertical';

  const hasAction = (action: (typeof ALLOWED_ACTIONS)[number]) =>
    actions?.some(({ type }) => type === action);

  if (!fund) return <Skeleton height={200} />;
  const viewFundDetails: CardAction['secondary'] = hasAction('view')
    ? {
        as: 'link',
        href: `/admin/fund-managers/${fundManagerID}/funds/${fund?.id}`,
        text: 'viewDetails',
        'data-cy-button': 'view-details',
        className: 'mb-2',
        icon: <ChevronIcon className="rotate-90  ltr:-rotate-90" />,
      }
    : undefined;

  const downloadInvoice: CardAction['primary'] = hasAction('download-invoice')
    ? {
        as: fund?.invoiceLink ? 'link' : 'button',
        disabled: !fund?.invoiceLink,
        onClick: () => {},
        href: fund?.invoiceLink ?? '',
        text: 'downloadVATInvoice',
        icon: (
          <DownloadIcon
            className={cn('h-4 w-4', {
              'text-gray-500': !fund?.invoiceLink,
              'text-white': fund?.invoiceLink,
            })}
          />
        ),
      }
    : undefined;

  const fundDetails: FundDetails = !withoutDetails
    ? [
        {
          key: 'deadlineForInvestment',
          value: fund?.investmentEndingDate,
          format: 'date',
        },
        {
          key: 'minInvestment',
          value: fund?.minInvestment,
          format: 'money',
        },
      ]
    : [];
  return createFundCard<FundMangerFund>(
    fund,
    cardOrientation,
    {
      primary: downloadInvoice,
      secondary: viewFundDetails,
    },
    isDetailsPage,
    'gap-2',
    fundDetails,
  );
};

export default AdminFundManagerFundCard;
