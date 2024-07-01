import { Portal } from '@mantine/core';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';

import CompanyInfoCard from '@/libs/admin/company-info-card';
import SubLayout from '@/libs/admin/components/fund-managers/sub-layout';
import NationalAddress from '@/libs/admin/national-address';
import PersonalInfoCard from '@/libs/admin/personal-info-card';
import Card, { CardSection } from '@/libs/admin/section-card';
import StatusChip from '@/libs/components/Base/status-chip/status-chip';
import { EPermission } from '@/libs/configs/appConfig';
import { acl } from '@/libs/packages/acl';
import { ProtectedView } from '@/libs/packages/acl/components/ProtectedView';
import { getSSRQuery } from '@/libs/packages/queryBuilder';
import investorDetailsQueryOptions from '@/libs/services/admin/investors/investor-details';
import type { AdminInvestorSingleItem } from '@/libs/types/investors';

const REQUIRE_PERMISSION: EPermission[] = [EPermission.ReadInvestors];

function InvestorPage({
  data: investorDetails,
  can,
}: {
  data: AdminInvestorSingleItem;
  can: Record<string, boolean>;
}) {
  const { t } = useTranslation('profile');
  const renderAddressComponent = () => (
    <NationalAddress
      unitNum={investorDetails?.unitNum}
      buildingNum={investorDetails?.buildingNum}
      streetNum={investorDetails?.streetNum}
      zone={investorDetails?.zone}
      city={investorDetails?.city}
      postalCode={investorDetails?.postalCode}
    />
  );

  return (
    <SubLayout>
      <ProtectedView can={can} required={[EPermission.ReadInvestors]}>
        <Portal target="#header-button">
          <StatusChip status={investorDetails?.status} />
        </Portal>

        {/* CORPORATE INVESTOR ONLY */}
        {investorDetails?.type === 'corporateInvestor' && (
          <Card>
            <CompanyInfoCard {...investorDetails?.corporate} />
            <CardSection title={t('NationalAddress')} className="gap-2">
              {renderAddressComponent()}
            </CardSection>
          </Card>
        )}

        {/* CORPORATE AND INDIVIDUAL INVESTORS */}
        <Card>
          <PersonalInfoCard
            email={investorDetails?.email}
            fullName={investorDetails?.fullName}
            gender={investorDetails?.gender!}
            jobTitle={investorDetails?.jobTitle}
            phoneNumber={investorDetails?.phone.toString()}
          />

          {/* INDIVIDUAL INVESTORS ONLY */}
          {investorDetails?.type === 'individualInvestor' && (
            <CardSection title={t('NationalAddress')} className="gap-2">
              {renderAddressComponent()}
            </CardSection>
          )}
        </Card>
      </ProtectedView>
    </SubLayout>
  );
}
export default InvestorPage;

export const getServerSideProps = (async context => {
  const accessToken = context.req.cookies.access_token;
  const investorID = context.query.investorID as string;

  if (!accessToken)
    return {
      props: {},
      redirect: { destination: '/admin/auth/sign-in', permanent: false },
    };
  const can = await acl.canAccessAll(accessToken, REQUIRE_PERMISSION);

  const queryOptions = investorDetailsQueryOptions.details(investorID);
  const { props: ssrProps, notFound } = await getSSRQuery(
    queryOptions,
    accessToken,
  );

  return {
    props: {
      ...ssrProps,
      investorID,
      can,
    },
    notFound,
  };
}) satisfies GetServerSideProps;
