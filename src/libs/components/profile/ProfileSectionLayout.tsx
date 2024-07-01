import { SimpleGrid, Title } from '@mantine/core';
import type { Resources } from 'i18next';
import { useTranslation } from 'next-i18next';
import type { FC, ReactNode } from 'react';

import { cn } from '@/utils/cn';

interface ProfileSectionLayoutProps {
  children: ReactNode;
  title: keyof Resources['profile'];
  className?: string;
}

const ProfileSectionLayout: FC<ProfileSectionLayoutProps> = ({
  children,
  className,
  title,
}) => {
  const { t } = useTranslation('profile');
  return (
    <SimpleGrid className={cn('gap-[32px]', className)}>
      <Title className="text-2xl leading-[1.33333] tracking-[-0.48px]">
        {t(title)}
      </Title>
      {children}
    </SimpleGrid>
  );
};

export { ProfileSectionLayout };
