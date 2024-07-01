import { Skeleton } from '@mantine/core';
import type { ComponentProps, FC } from 'react';

import ChevronIcon from '@/libs/icons/chevron-icon';
import DownloadIcon from '@/libs/icons/download-icon';
import type { FundMangerFund } from '@/libs/types/interface/fund';
import { cn } from '@/utils/cn';
import createFundCard from '@/utils/createFundCard';

import type Card from '../../../Base/Card';

const ALLOWED_ACTIONS = [
  'view',
  'download-invoice',
  'approve',
  'reject',
] as const;

type Action<T extends (typeof ALLOWED_ACTIONS)[number]> = {
  type: T;
};

type FundApprovalAction = Action<'approve'> & {
  approve: (fundId: string) => void;
};

type FundRejectionAction = Action<'reject'> & {
  reject: (fundId: string) => void;
};

type BuiltInActions = Action<'view' | 'download-invoice'>;
export type AllowedActions =
  | BuiltInActions
  | FundApprovalAction
  | FundRejectionAction;

interface FundManagerFundCardProps {
  fund?: FundMangerFund;
  actions?: AllowedActions[];
  isDetailsPage?: boolean;
}

type CardAction = ComponentProps<typeof Card>['body']['actions'];

const FundManagerFundCard: FC<FundManagerFundCardProps> = ({
  fund,
  actions,
  isDetailsPage,
}) => {
  const cardOrientation = isDetailsPage ? 'horizontal' : 'vertical';

  const hasAction = (action: (typeof ALLOWED_ACTIONS)[number]) =>
    actions?.some(({ type }) => type === action);

  if (!fund) return <Skeleton height={200} />;
  const viewFundDetails: CardAction['secondary'] = hasAction('view')
    ? {
        as: 'link',
        href: `/fund-manager/funds/${fund?.id}`,
        text: 'viewDetails',
        className: 'w-full',
        'data-cy-button': 'view-details',
        icon: <ChevronIcon className="rotate-90  ltr:-rotate-90" />,
      }
    : undefined;

  const downloadInvoice: CardAction['primary'] = hasAction('download-invoice')
    ? {
        as: fund?.invoiceLink ? 'link' : 'button',
        disabled: !fund?.invoiceLink,
        className: 'bg-red',
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

  const approveFund: CardAction['primary'] = hasAction('approve')
    ? {
        as: 'button',
        text: 'approveFund',
        'data-cy-button': 'approve-fund',
        disabled: fund.status === 'contractRejected',
        onClick: () => {
          const approvalAction = actions?.find(
            action => action.type === 'approve',
          ) as FundApprovalAction;

          if (!approvalAction.approve)
            throw new Error('approve function is not defined');
          approvalAction.approve(fund?.id);
        },
      }
    : undefined;

  const rejectFund: CardAction['secondary'] = hasAction('reject')
    ? {
        as: 'button',
        text: 'rejectFund',
        'data-cy-button': 'reject-fund',
        variant: 'outlined-error',
        disabled: fund.status === 'contractRejected',
        onClick: () => {
          const rejectAction = actions?.find(
            action => action.type === 'reject',
          ) as FundRejectionAction;

          if (!rejectAction.reject)
            throw new Error('reject function is not defined');
          rejectAction.reject(fund?.id);
        },
      }
    : undefined;

  return createFundCard<FundMangerFund>(
    fund,
    cardOrientation,
    {
      primary: approveFund || downloadInvoice,
      secondary: viewFundDetails || rejectFund,
    },
    isDetailsPage,
    'gap-2',
    [
      {
        key: 'distributionFees',
        value: fund?.fees?.distribution,
        format: 'money',
      },
    ],
    isDetailsPage ? 'flex-row-reverse flex' : 'flex flex-col gap-4',
    isDetailsPage ? fund?.status : undefined,
  );
};

export default FundManagerFundCard;
