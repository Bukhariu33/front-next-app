import { Flex } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import InfoCard from '@/libs/components/Base/Card/info-card';
import { styleConfig } from '@/libs/components/profile/styleConfig';
import type { Profile } from '@/libs/types/profile';
import { cn } from '@/utils/cn';

const { infoCardClassNames } = styleConfig;

const NationalAddress: FC<
  Pick<Profile, 'address'> & { className?: string }
> = ({ address, className }) => {
  const { t } = useTranslation('profile');

  return (
    <InfoCard
      title={t('NationalAddress')}
      value={
        <Flex className="w-fit flex-wrap gap-[24px] rounded-[10px] bg-[#F5F7F9] p-[20px]">
          <InfoCard
            title={t('UnitNum')}
            value={address?.unitNum}
            titleClassName="sm:text-base leading-[1.25] text-brand-accent-500 font-medium"
            wrapperClassName={cn(infoCardClassNames.wrapperClassName, 'pr-0')}
            valueClassName={infoCardClassNames.valueClassName}
          />
          <InfoCard
            title={t('BuildingNum')}
            value={address?.buildingNum}
            titleClassName="sm:text-base leading-[1.25] text-brand-accent-500 font-medium"
            wrapperClassName={cn(infoCardClassNames.wrapperClassName, 'pr-0')}
            valueClassName={infoCardClassNames.valueClassName}
            withDivider
          />
          <InfoCard
            title={t('StreetNum')}
            value={address?.streetNum}
            titleClassName="sm:text-base leading-[1.25] text-brand-accent-500 font-medium"
            wrapperClassName={cn(infoCardClassNames.wrapperClassName, 'pr-0')}
            valueClassName={infoCardClassNames.valueClassName}
            withDivider
          />
          <InfoCard
            title={t('Zone')}
            value={address?.zone}
            titleClassName="sm:text-base leading-[1.25] text-brand-accent-500 font-medium"
            wrapperClassName={cn(infoCardClassNames.wrapperClassName, 'pr-0')}
            valueClassName={infoCardClassNames.valueClassName}
            withDivider
          />
          <InfoCard
            title={t('City')}
            value={address?.city}
            titleClassName="sm:text-base leading-[1.25] text-brand-accent-500 font-medium"
            wrapperClassName={cn(infoCardClassNames.wrapperClassName, 'pr-0')}
            valueClassName={infoCardClassNames.valueClassName}
            withDivider
          />
          <InfoCard
            title={t('PostalCode')}
            value={address?.postalCode}
            titleClassName="sm:text-base leading-[1.25] text-brand-accent-500 font-medium"
            wrapperClassName={cn(infoCardClassNames.wrapperClassName, 'pr-0')}
            valueClassName={infoCardClassNames.valueClassName}
            withDivider
          />
        </Flex>
      }
      titleClassName="sm:text-lg font-medium leading-[1.33333] text-brand-accent-500"
      wrapperClassName={cn(
        infoCardClassNames.wrapperClassName,
        'w-full gap-[20px]',
        className,
      )}
    />
  );
};

export { NationalAddress };
