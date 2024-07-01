import { useMediaQuery } from '@mantine/hooks';
import type { FC, ReactNode } from 'react';

import type { TranslationKey } from '@/libs/types/utils/withTranslation';
import { cn } from '@/utils/cn';

import type { Variants } from '../Buttons/Button';
import CardBody from './body';
import Header from './Header';

interface BaseAction {
  as: 'link' | 'button';
  text: TranslationKey<'common'>;
  'data-cy-button'?: string;
  className?: string;
}

export interface ButtonAction extends BaseAction {
  onClick: () => void;
  as: 'button';
  icon?: React.ReactNode;
  disabled?: boolean;
  variant?: Variants;
}
interface LinkAction extends BaseAction {
  as: 'link';
  href: string;
  icon?: React.ReactNode;
}
export type Action = ButtonAction | LinkAction;

interface Image extends ImageSrc {
  tags: {
    date: string;
    time: string;
  };
  footer: {
    coverage: number;
    roi: number;
    durationInMonths: number;
  };
  className?: string;
}
export interface BaseCardProps {
  orientation?: 'vertical' | 'horizontal';
  image: Image;
  className?: string;
  body: {
    title: string;
    subTitle: string;
    tags: [string, string, string];
    price: number;
    percentage: number;
    fundDetails: Array<{
      key: TranslationKey<'fund'>;
      format?: 'money' | 'date';
      value: string | number | ReactNode;
      icon?: ReactNode;
    }>;
    actions: {
      primary?: Action;
      secondary?: Action;
    };
    actionWrapper?: string;
    status?: string;
    isInvested?: boolean;
    investmentValue?: number;
  };

  overlayText?: TranslationKey<'common'>;

  variant?: 'gray' | 'white';

  'data-testid'?: string;
}

const Card: FC<BaseCardProps> = ({
  className,
  body,
  image,
  variant,
  orientation: _orientation = 'horizontal',
  overlayText,
  'data-testid': dataTestId,
}) => {
  const isSmallScreen = useMediaQuery('(max-width: 1280px)');
  const orientation = isSmallScreen ? 'vertical' : _orientation;
  const isVertical = orientation === 'vertical';
  return (
    <div
      className={cn(
        'flex rounded-2xl bg-white p-6 shadow-sm',
        {
          'bg-gray-100': variant === 'gray',
          'gap-11': !isVertical,
          'flex-col gap-2 p-0': isVertical,
        },
        className,
      )}
      data-testid={dataTestId}
    >
      <Header
        {...image}
        orientation={orientation}
        overlayText={overlayText}
        isInvested={body.isInvested}
      />
      <CardBody
        {...body}
        orientation={orientation}
        isInvested={body.isInvested}
      />
    </div>
  );
};

export default Card;
