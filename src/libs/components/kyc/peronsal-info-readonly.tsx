import { Box, SimpleGrid, Text } from '@mantine/core';
import { useTranslation } from 'next-i18next';

import { KycReadOnly } from '@/libs/components/kyc/KycReadOnly';
import { KycCardHeader } from '@/libs/components/kyc/layout/kyc-card-header';
import useUser from '@/libs/hooks/useUser';

function InvestorKycReadOnlyInfo() {
  const { user } = useUser();
  const { t } = useTranslation('kyc');

  if (!user) return null;

  const nationalAddress = `${user.streetNum}, ${user.zone}, ${user.city} `;

  return (
    <SimpleGrid cols={2} verticalSpacing={15} spacing={66} mt={16}>
      <KycReadOnly label={t('fullName')} value={user?.fullName} />
      <KycReadOnly label={t('DoB')} value={user.birthDate} />
      <KycReadOnly label={t('nationalAddress')} value={nationalAddress} />
      <KycReadOnly label={t('nationalId')} value={user.nationalId} />
      <KycReadOnly label={t('email')} value={user.email} />
      <KycReadOnly label={t('nationality')} value={user.nationality} />
      <KycReadOnly
        label={t('mobile')}
        value={
          <Text dir="ltr" className="w-fit">
            {user.mobile}
          </Text>
        }
      />
      <KycReadOnly label={t('gender')} value={user.gender} />
    </SimpleGrid>
  );
}

function CorporateInvestorKycReadonly() {
  const { user } = useUser();
  const { t } = useTranslation('kyc');

  if (!user) return null;

  const nationalAddress = `${user.streetNum}, ${user.zone}, ${user.city} `;

  return (
    <Box>
      <SimpleGrid
        cols={2}
        verticalSpacing={15}
        spacing={66}
        className="mt-[16px]"
      >
        <KycReadOnly
          label={t('companyName')}
          value={user.corporate?.companyName}
        />
        <KycReadOnly
          label={t('companyRegistrationNumber')}
          value={user?.corporate?.crNumber}
        />
        <KycReadOnly label={t('nationalAddress')} value={nationalAddress} />
        <KycReadOnly
          label={t('registrationCity')}
          value={user?.corporate?.city}
        />
        <KycReadOnly
          label={t('releaseDate')}
          value={user?.corporate?.crIssuanceDate}
        />
        <KycReadOnly
          label={t('expiryDate')}
          value={user?.corporate?.crExpiryDate}
        />
      </SimpleGrid>
      <KycCardHeader className="lg:px-0 lg:pb-[15px] lg:pt-[25px]">
        {t('contactInfo')}
      </KycCardHeader>
      <SimpleGrid cols={2} verticalSpacing={15} spacing={66}>
        <KycReadOnly label={t('fullName')} value={user?.fullName} />
        <KycReadOnly
          label={t('mobile')}
          value={
            <Text dir="ltr" className="w-fit">
              {user.mobile}
            </Text>
          }
        />
        <KycReadOnly label={t('email')} value={user.email} />
      </SimpleGrid>
    </Box>
  );
}

export { CorporateInvestorKycReadonly, InvestorKycReadOnlyInfo };
