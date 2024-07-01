import type { ComponentProps } from 'react';

import Card from '@/libs/components/Base/Card';
import type { BaseFund } from '@/libs/types/interface/fund/base';
import { cn } from '@/utils/cn';
import { formatDate } from '@/utils/formatDate';

const createFundCard = <Fund extends BaseFund>(
  fund: Fund,
  orientation: ComponentProps<typeof Card>['orientation'],
  actions: ComponentProps<typeof Card>['body']['actions'],
  isDetailsPage?: boolean,
  className?: string,
  fundDetails?: ComponentProps<typeof Card>['body']['fundDetails'],
  actionWrapper?: string,
  status?: BaseFund['status'],
  investmentDetails?: {
    isInvested?: boolean;
    investmentValue?: number;
  },
) => {
  return (
    <Card
      orientation={isDetailsPage ? 'horizontal' : orientation}
      key={fund.id}
      data-testid="fund-card"
      image={{
        src: fund?.fundImages[0],
        tags: {
          time: new Date(fund.investmentStartingDate).toLocaleTimeString(),
          date: formatDate(fund.investmentEndingDate) as string,
        },
        footer: {
          coverage: fund.coverage,
          roi: fund.expectedRoi,
          durationInMonths: fund.durationInMonths,
        },
        className: cn({
          '[@media(min-width:1280px)]:h-auto': orientation === 'horizontal',
        }),
      }}
      variant={isDetailsPage ? 'gray' : 'white'}
      className={cn(
        {
          'shadow-none ': isDetailsPage,
        },
        className,
      )}
      overlayText={
        fund.status !== 'pendingApproval' && orientation === 'vertical'
          ? fund.status
          : undefined
      }
      body={{
        title: fund.name,
        subTitle: fund.fundManagerName,
        tags: [fund.type, fund.city ?? '', fund.status],
        fundDetails: fundDetails ?? [],
        actions,
        percentage: (fund.takenUnits / fund.units) * 100,
        price: fund.unitPrice,
        actionWrapper,
        status,
        isInvested: investmentDetails?.isInvested,
        investmentValue: investmentDetails?.investmentValue,
      }}
    />
  );
};
export default createFundCard;
