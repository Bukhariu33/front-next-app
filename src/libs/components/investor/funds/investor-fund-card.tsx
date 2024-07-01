import { Skeleton } from '@mantine/core';
import { useRouter } from 'next/router';
import type { ComponentProps, FC } from 'react';

import type Card from '@/libs/components/Base/Card';
import type {
  Action as CardButtonAction,
  ButtonAction,
} from '@/libs/components/Base/Card';
import useUser from '@/libs/hooks/useUser';
import ChevronIcon from '@/libs/icons/chevron-icon';
import DownloadIcon from '@/libs/icons/download-icon';
import { openErrorModal } from '@/libs/packages/modals';
import type { FundMangerFund } from '@/libs/types/interface/fund';
import { cn } from '@/utils/cn';
import createFundCard from '@/utils/createFundCard';

const ALLOWED_ACTIONS = [
  'view',
  'download-invoice',
  'invest',
  'investment-details',
  'cancel-investment',
] as const;
type ActionType = (typeof ALLOWED_ACTIONS)[number];
type Variant = 'primary' | 'secondary';

type Action<T extends (typeof ALLOWED_ACTIONS)[number]> = {
  type: T;
  variant?: Variant;
  onClick?: () => void;
};

type BuiltInActions = Action<
  | 'view'
  | 'download-invoice'
  | 'invest'
  | 'investment-details'
  | 'cancel-investment'
>;
type AllowedActions = BuiltInActions;

interface InvestorFundCardProps {
  fund?: FundMangerFund;
  actions?: AllowedActions[];
  isDetailsPage?: boolean;
  isInvestmentCard?: boolean;
  investmentDetails?: {
    isInvested: boolean;
    investmentValue: number;
  };
}

type CardAction = ComponentProps<typeof Card>['body']['actions'];

type FundDetails = ComponentProps<typeof Card>['body']['fundDetails'];

const InvestorFundCard: FC<InvestorFundCardProps> = ({
  fund,
  actions,
  isDetailsPage,
  isInvestmentCard,
  investmentDetails,
}) => {
  const cardOrientation = isDetailsPage ? 'horizontal' : 'vertical';
  const { user } = useUser();
  const router = useRouter();
  const hasAction = (action: (typeof ALLOWED_ACTIONS)[number]) =>
    actions?.some(({ type }) => type === action);

  if (!fund) return <Skeleton height={200} />;

  const getVariant = (type: ActionType): Variant | undefined => {
    const action = actions?.find(({ type: actionType }) => actionType === type);
    if (!action) return undefined;

    if (typeof action.variant === 'undefined') {
      throw new Error(`Variant for action ${type} is undefined`);
    }

    return action.variant;
  };

  const actionOnClick = (type: ActionType) => {
    const action = actions?.find(({ type: actionType }) => actionType === type);
    if (!action) return undefined;
    if (!action.onClick) return undefined;

    return action.onClick();
  };

  const viewVariant = getVariant('view');
  const viewFundDetails: CardButtonAction | undefined = hasAction('view')
    ? {
        as: 'link',
        href: `/investor/funds/${fund?.id}`,
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

  const investmentDetailsAction: CardAction['primary'] = hasAction(
    'investment-details',
  )
    ? {
        as: 'link',
        href: `/investor/my-investments/${fund?.id}`,
        text: 'investmentDetails',
        'data-cy-button': 'investment-details',
      }
    : undefined;

  const hasCancelAction = hasAction('cancel-investment');
  const cancelInvestment: CardAction['secondary'] = hasCancelAction
    ? {
        as: 'button',
        onClick: () => {
          actionOnClick('cancel-investment');
        },
        text: 'cancelInvestment',
        variant: 'outlined-error',
        className: 'order-1',
        'data-cy-button': 'cancel-investment',
      }
    : undefined;

  const closedFundStatuses = ['funded', 'underRepayment', 'completed'];
  const fundIsClosed = closedFundStatuses.includes(fund?.status as string);

  const fundActions: ButtonAction =
    !investmentDetails?.isInvested && fundIsClosed
      ? {
          as: 'button',
          onClick: () => {},
          text: 'opportunityIsClosed',
          disabled: true,
        }
      : {
          as: 'button',
          onClick: () => {
            if (!user?.isKycComplete) {
              return openErrorModal({
                id: 'kyc-not-completed',
                namespace: 'kyc',
                translate: true,
                body: 'completeKycMsg',
                title: 'completeKycTitle',
                onTryAgain() {
                  return router.push('/investor/kyc/personal-information');
                },
                labels: {
                  tryAgain: 'completeKycButton',
                  cancel: 'cancel',
                },
              });
            }
            return router.push(`/investor/funds/${fund?.id}/invest`);
          },
          text: 'investNow',
        };

  const invest: CardAction['primary'] = hasAction('invest')
    ? fundActions
    : undefined;

  const fundDetails: FundDetails = isInvestmentCard
    ? [
        {
          key: 'unitPrice',
          value: fund.unitPrice,
        },
        {
          key: 'subscriptionFees',
          value: fund?.fees?.subscription,
        },
        {
          key: 'minimumInvestmentAmount',
          value: fund.minInvestment,
        },
        {
          key: 'startDateToReceiveInvestment',
          value: fund.investmentStartingDate,
          format: 'date',
        },
        {
          key: 'deadlineForInvestment',
          value: fund.investmentEndingDate,
          format: 'date',
        },
      ]
    : [
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
      ];

  const primaryAction =
    investmentDetailsAction ?? invest ?? downloadInvoice ?? viewFundDetails;
  return createFundCard<FundMangerFund>(
    fund,
    cardOrientation,
    {
      primary: primaryAction,
      secondary:
        viewVariant === 'secondary' ? viewFundDetails : cancelInvestment,
    },
    isDetailsPage,
    'gap-2',
    investmentDetails?.isInvested ? [] : fundDetails,
    hasCancelAction ? 'flex-row gap-2 flex' : '',
    undefined,
    {
      isInvested: investmentDetails?.isInvested,
      investmentValue: investmentDetails?.investmentValue,
    },
  );
};

export default InvestorFundCard;
