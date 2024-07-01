import { Title } from '@mantine/core';
import type { FC } from 'react';

import { cn } from '@/utils/cn';

interface MainTitleProps {
  className?: string;
  order?: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}

/**
 * Title - H2
 * used in page headings
 */
const MainTitle: FC<MainTitleProps> = ({ className, text, order }) => {
  return (
    <Title
      className={cn(
        'prose text-[32px] leading-10 tracking-[-0.64px] text-brand-black-dark',
        className,
      )}
      order={order || 2}
    >
      {text}
    </Title>
  );
};

export default MainTitle;
