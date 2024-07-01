import { Flex, SimpleGrid } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import InfoCard from '@/libs/components/Base/Card/info-card';
import { ProfileSectionLayout } from '@/libs/components/profile/ProfileSectionLayout';
import { styleConfig } from '@/libs/components/profile/styleConfig';
import type { Profile } from '@/libs/types/profile';
import { cn } from '@/utils/cn';

const { infoCardClassNames } = styleConfig;

interface CorporatePersonalInformationProps extends Omit<Profile, 'corporate'> {
  corporate?: {
    email: string;
  };
}

const CorporatePersonalInformation = (
  information: CorporatePersonalInformationProps,
) => {
  const { t } = useTranslation('profile');
  return (
    <ProfileSectionLayout title="PersonalInformation" className="mt-[60px]">
      <Flex className="gap-x-[20px]">
        <InfoCard
          title={t('Fullname')}
          value={information?.fullName}
          titleClassName="sm:text-base leading-[1.25] text-brand-accent-500 font-medium"
          wrapperClassName={cn(
            infoCardClassNames.wrapperClassName,
            'pr-0 w-[245px]',
          )}
          valueClassName={infoCardClassNames.valueClassName}
        />
        <InfoCard
          title={t('JobTitle')}
          value={information?.jobTitle}
          titleClassName="sm:text-base leading-[1.25] text-brand-accent-500 font-medium"
          wrapperClassName={cn(
            infoCardClassNames.wrapperClassName,
            'pr-0 w-[178px]',
          )}
          valueClassName={infoCardClassNames.valueClassName}
          withDivider
        />
        <InfoCard
          title={t('Gender')}
          value={information?.gender}
          titleClassName="sm:text-base leading-[1.25] text-brand-accent-500 font-medium"
          wrapperClassName={cn(infoCardClassNames.wrapperClassName, 'pr-0')}
          valueClassName={infoCardClassNames.valueClassName}
          withDivider
        />
      </Flex>
      <Flex className="flex-wrap gap-[20px]">
        <InfoCard
          title={t('Email')}
          value={information?.corporate?.email}
          titleClassName="sm:text-base leading-[1.25] text-brand-accent-500 font-medium"
          wrapperClassName={cn(
            infoCardClassNames.wrapperClassName,
            'pr-0 sm:w-[245px] max-sm:w-full',
          )}
          valueClassName={infoCardClassNames.valueClassName}
        />
        <InfoCard
          title={t('MobileNumberRegisteredWithAbsher')}
          value={information?.mobile}
          titleClassName="sm:text-base leading-[1.25] text-brand-accent-500 font-medium"
          wrapperClassName={cn(
            infoCardClassNames.wrapperClassName,
            'pr-0 max-sm:w-full',
          )}
          valueClassName={infoCardClassNames.valueClassName}
          withDivider
        />
      </Flex>
    </ProfileSectionLayout>
  );
};

interface IndividualOrFundManagerPersonalInformationProps
  extends Omit<Profile, 'corporate'> {}

const IndividualOrFundManagerPersonalInformation: FC<
  IndividualOrFundManagerPersonalInformationProps
> = information => {
  const { t } = useTranslation('profile');

  return (
    <ProfileSectionLayout title="PersonalInformation">
      <Flex className="flex-wrap gap-x-[42px] gap-y-[30px]">
        <SimpleGrid className="w-[213px] gap-y-[30px]">
          <InfoCard
            title={t('Fullname')}
            value={information?.fullName}
            titleClassName="sm:text-base leading-[1.25] text-brand-accent-500 font-medium"
            wrapperClassName={cn(infoCardClassNames.wrapperClassName)}
            valueClassName={infoCardClassNames.valueClassName}
          />
          <InfoCard
            title={t('MobileNumberRegisteredWithAbsher')}
            value={information?.mobile}
            titleClassName="sm:text-base leading-[1.25] text-brand-accent-500 font-medium"
            wrapperClassName={cn(
              infoCardClassNames.wrapperClassName,
              'row-start-2',
            )}
            valueClassName={infoCardClassNames.valueClassName}
          />
        </SimpleGrid>
        <SimpleGrid className="w-[192px] gap-y-[30px]">
          <InfoCard
            title={t('Email')}
            value={information?.email}
            titleClassName="sm:text-base leading-[1.25] text-brand-accent-500 font-medium"
            wrapperClassName={infoCardClassNames.wrapperClassName}
            valueClassName={infoCardClassNames.valueClassName}
            withDivider
          />
        </SimpleGrid>
      </Flex>
    </ProfileSectionLayout>
  );
};

const PersonalInformation: FC<Profile> = information => {
  if (information?.type === 'corporateInvestor')
    return (
      <CorporatePersonalInformation
        {...information}
        corporate={{ email: information.email ?? '' }}
      />
    );
  if (
    information?.type === 'individualInvestor' ||
    information?.type === 'fundManager'
  )
    return <IndividualOrFundManagerPersonalInformation {...information} />;
  throw new Error('Wrong user type');
};

export { PersonalInformation };
