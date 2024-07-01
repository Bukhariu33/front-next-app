import { Flex, List, ListItem } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import InfoCard from '@/libs/components/Base/Card/info-card';
import { NationalAddress } from '@/libs/components/profile/NationalAddress';
import { ProfileSectionLayout } from '@/libs/components/profile/ProfileSectionLayout';
import { styleConfig } from '@/libs/components/profile/styleConfig';
import type { Profile } from '@/libs/types/profile';
import { cn } from '@/utils/cn';

const { infoCardClassNames } = styleConfig;

interface CompanyInformationProps
  extends Pick<Profile, 'corporate' | 'address'> {}

const CompanyInformation: FC<CompanyInformationProps> = information => {
  const { t } = useTranslation('profile');

  const activities = information?.corporate?.activities?.map(activity => (
    <ListItem key={activity.id}>{activity.name}</ListItem>
  ));
  return (
    <ProfileSectionLayout title="companyInfo">
      <Flex className="-mt-[2px] flex-wrap items-center justify-between gap-y-[32px]">
        <InfoCard
          title={t('companyName')}
          value={information?.corporate?.name}
          titleClassName="sm:text-lg font-medium leading-[1.33333] text-brand-accent-500"
          valueClassName={cn(
            infoCardClassNames.valueClassName,
            'max-w-[518px]',
          )}
          wrapperClassName={infoCardClassNames.wrapperClassName}
        />
        <Flex className="gap-[20px]" wrap="wrap">
          <InfoCard
            title={t('CrNumber')}
            value={information?.corporate?.crNumber}
            withCopy
            titleClassName="sm:text-base leading-[1.25] text-brand-accent-500 font-medium"
            wrapperClassName={cn(infoCardClassNames.wrapperClassName, 'pr-0')}
            valueClassName={infoCardClassNames.valueClassName}
          />
          <InfoCard
            title={t('City')}
            value={information?.corporate?.city}
            withDivider
            titleClassName="sm:text-base leading-[1.25] text-brand-accent-500 font-medium"
            wrapperClassName={infoCardClassNames.wrapperClassName}
            valueClassName={infoCardClassNames.valueClassName}
          />
          <InfoCard
            title={t('CrIssuanceDate')}
            value={information?.corporate?.issuanceDate}
            withDivider
            titleClassName="sm:text-base leading-[1.25] text-brand-accent-500 font-medium"
            wrapperClassName={infoCardClassNames.wrapperClassName}
            valueClassName={infoCardClassNames.valueClassName}
          />
          <InfoCard
            title={t('CrExpiryDate')}
            value={information?.corporate?.expiryDate}
            titleClassName="sm:text-base leading-[1.25] text-brand-accent-500 font-medium"
            wrapperClassName={infoCardClassNames.wrapperClassName}
            valueClassName={infoCardClassNames.valueClassName}
            withDivider
          />
        </Flex>
        <InfoCard
          title={t('CrCommercialActivity')}
          value={activities ? <List>{activities}</List> : undefined}
          titleClassName="sm:text-lg font-medium leading-[1.33333] text-brand-accent-500"
          valueClassName={infoCardClassNames.valueClassName}
          wrapperClassName={cn(infoCardClassNames.wrapperClassName, 'w-full')}
        />
        <NationalAddress address={information.address ?? {}} />
      </Flex>
    </ProfileSectionLayout>
  );
};

export { CompanyInformation };
