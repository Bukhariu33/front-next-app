import { List, ListItem, SimpleGrid } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import DateInput from '@/libs/components/Base/inputs/date-input';
import Input from '@/libs/components/Base/inputs/input';
import { ProfileSectionLayout } from '@/libs/components/profile/ProfileSectionLayout';
import type { CorporateInfo } from '@/libs/types/fund-managers';

import InfoCard from '../Base/Card/info-card';

interface EditCompanyInformationProps {
  corporateInfo?: CorporateInfo;
}

export default function EditCompanyInformation({
  corporateInfo,
}: EditCompanyInformationProps) {
  const { t } = useTranslation('profile');

  if (!corporateInfo) {
    return null;
  }

  const activities = corporateInfo?.activities?.map(activity => (
    <ListItem key={activity.id}>{activity.name}</ListItem>
  ));

  return (
    <ProfileSectionLayout title="companyInfo">
      <Input
        namespace="auth"
        label="companyName"
        name="companyName"
        value={corporateInfo.name}
        disabled
      />
      <SimpleGrid className="grid-cols-2 gap-x-[40px] max-sm:grid-cols-1">
        <Input
          namespace="common"
          label="CrNumber"
          name="crNumber"
          value={corporateInfo.crNumber}
          disabled
        />
        <Input
          namespace="common"
          label="City"
          name="city"
          value={corporateInfo.city}
          disabled
        />
      </SimpleGrid>
      <SimpleGrid className="grid-cols-2 gap-x-[40px] max-sm:grid-cols-1">
        <DateInput
          namespace="common"
          label="CrIssuanceDate"
          placeholder="EnterCrIssuanceDate"
          name="crIssuanceDate"
          value={new Date(corporateInfo.issuanceDate)}
          disabled
        />
        <DateInput
          namespace="common"
          placeholder="EnterCrExpiryDate"
          label="CrExpiryDate"
          name="crExpiryDate"
          value={new Date(corporateInfo.expiryDate)}
          disabled
        />
      </SimpleGrid>
      <InfoCard
        title={t('CrCommercialActivity')}
        value={activities ? <List>{activities}</List> : undefined}
        titleClassName="sm:text-lg font-medium leading-[1.33333] text-brand-accent-500"
      />
    </ProfileSectionLayout>
  );
}
