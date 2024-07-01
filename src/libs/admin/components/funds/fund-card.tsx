import { Skeleton } from '@mantine/core';
import { useRouter } from 'next/router';
import type { ComponentProps, FC } from 'react';

import type Card from '@/libs/components/Base/Card';
import type { AdminFund } from '@/libs/types/interface/fund';
import type { BaseFund } from '@/libs/types/interface/fund/base';
import createFundCard from '@/utils/createFundCard';

const ALLOW_EDIT: BaseFund['status'][] = ['pendingApproval', 'fundRejected'];

interface AdminFundCardProps {
  fund?: AdminFund;
  isDetailsPage?: boolean;
  checkCanUpdate: () => boolean;
}

type CardAction = ComponentProps<typeof Card>['body']['actions'];

const AdminFundCard: FC<AdminFundCardProps> = ({
  fund,
  isDetailsPage,
  checkCanUpdate,
}) => {
  const cardOrientation = isDetailsPage ? 'horizontal' : 'vertical';
  const router = useRouter();
  if (!fund) return <Skeleton height={571} />;

  const updateFundAction: CardAction['primary'] = ALLOW_EDIT.includes(
    fund.status,
  )
    ? {
        as: 'button',
        text: 'updateFundDetails',
        onClick: () => {
          if (checkCanUpdate()) {
            router.push(`/admin/funds/${fund.id}/edit`);
          }
        },
        className: 'w-full',
      }
    : {
        as: 'button',
        text: 'updateFundDetails',
        disabled: !ALLOW_EDIT.includes(fund.status),
        onClick: () => {},
        className: 'w-full',
      };

  return createFundCard<AdminFund>(
    fund,
    cardOrientation,
    {
      primary: updateFundAction,
    },
    isDetailsPage,
    'gap-2',
    [
      {
        key: 'unitPrice',
        value: fund?.unitPrice,
        format: 'money',
      },
      {
        key: 'subscriptionFees',
        value: fund?.fees.subscription,
      },
      {
        key: 'minInvestment',
        value: fund?.minInvestment,
        format: 'money',
      },
      {
        key: 'startDateToReceiveInvestment',
        value: fund?.investmentStartingDate,
        format: 'date',
      },
      {
        key: 'deadlineForInvestment',
        value: fund?.investmentEndingDate,
        format: 'date',
      },
      {
        key: 'minimumCoverageAmount',
        value: fund?.minCoverage,
        format: 'money',
      },
      {
        key: 'distributionFees',
        value: fund?.fees.distribution,
        format: 'money',
      },
    ],
  );
};

export default AdminFundCard;
