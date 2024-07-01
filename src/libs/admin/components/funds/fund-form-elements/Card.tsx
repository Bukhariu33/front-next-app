import { Box, Flex, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import type { FC, ReactNode } from 'react';

import { cn } from '@/utils/cn';

type CardStylesNames = 'root' | 'actions';

interface CardProps {
  title?: any;
  children: ReactNode;
  actions?: ReactNode;
  classNames?: Partial<Record<CardStylesNames, string>>;
}

const Card: FC<CardProps> = ({ title, children, actions, classNames }) => {
  const { t } = useTranslation('fund');
  return (
    <Box
      className={cn(
        'w-full rounded-2xl bg-white px-[1.5rem] py-[1.25rem] pb-[30px] shadow-sm',
        classNames?.root,
      )}
    >
      {title && (
        <>
          <Flex
            className={cn(
              'flex-wrap items-center gap-[16px]',
              classNames?.actions,
            )}
          >
            <Text className="py-[1.25rem] text-2xl font-bold leading-[1.33333] tracking-[-0.48px] text-brand-accent-500">
              {t(title)}
            </Text>
            {actions}
          </Flex>
          <Flex className="mb-[30px] h-[1px] w-full bg-gray-300" />
        </>
      )}
      {children}
    </Box>
  );
};

export default Card;
