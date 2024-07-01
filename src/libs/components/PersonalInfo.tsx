import { SimpleGrid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useTranslation } from 'next-i18next';
import type { ReactNode } from 'react';

import InfoCard from '@/libs/components/Base/Card/info-card';
import { cn } from '@/utils/cn';

interface PersonalInfoProps {
  namespace: any;
  data: {
    value: ReactNode;
    title: any;
  }[];
}

const PersonalInfo =  ({
  namespace,
  data,
}: PersonalInfoProps) => {
  const { t } = useTranslation(namespace);
  const isDesktop = useMediaQuery('(min-width:640px)');

  return (
    <SimpleGrid className="w-full sm:grid-cols-2 sm:gap-y-[1.5rem] md:grid-cols-[15.3125rem_1fr]">
      {data.map((info, index) => {
        const id = `INFO-${index}`;
        return (
          <InfoCard
            key={id}
            title={t(info.title as any)}
            value={info.value}
            wrapperClassName={cn('gap-0', {
              'ltr:md:pl-[1rem] rtl:md:pr-[1rem]': index % 2 === 1,
            })}
            withDivider={!isDesktop || index % 2 === 1}
            dividerOrientation={isDesktop ? undefined : 'horizontal'}
          />
        );
      })}
    </SimpleGrid>
  );
};

export default PersonalInfo;
