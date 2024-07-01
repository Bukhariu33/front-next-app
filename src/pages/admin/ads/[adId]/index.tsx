import { Loader, Portal } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import type { ComponentPropsWithoutRef } from 'react';

import CompanyInfoCard from '@/libs/admin/company-info-card';
import SubLayout from '@/libs/admin/components/fund-managers/sub-layout';
import NationalAddress from '@/libs/admin/national-address';
import PersonalInfoCard from '@/libs/admin/personal-info-card';
import Card, { CardSection } from '@/libs/admin/section-card';
import StatusChip from '@/libs/components/Base/status-chip/status-chip';
import { EPermission } from '@/libs/configs/appConfig';
import useUpdateFundManagerStatus from '@/libs/hooks/admin/use-update-fund-manager-status';
import useLanguage from '@/libs/hooks/useLanguage';
import { acl } from '@/libs/packages/acl';
import { ProtectedView } from '@/libs/packages/acl/components/ProtectedView';
import useClientAcl from '@/libs/packages/acl/hooks/use-client-acl';
import { getSSRQuery } from '@/libs/packages/queryBuilder';
import { fundManagerQueryOptions } from '@/libs/services/admin/fund-managers/fund-manager-details';
import type { BaseFundManager } from '@/libs/types/fund-managers';
import type { Status } from '@/libs/types/status';

interface FundManagerDetailsPageProps {
  fundManagerId: string;
  can: Record<string, boolean>;
}

const REQUIRE_PERMISSION: EPermission[] = [
  EPermission.ManageFundManagers,
  EPermission.ReadFundManagers,
];

function FundManagerPage({ fundManagerId, can }: FundManagerDetailsPageProps) {
  const { t } = useTranslation('profile');
  const { language } = useLanguage(); // to invalidate query if the language not equal the current language request on server side
  const { checkOrThrow } = useClientAcl({ can });

  const { data: fundManagerDetails, isLoading } = useQuery(
    fundManagerQueryOptions.details(fundManagerId, language),
  );

  const { updateFundManagerStatus } = useUpdateFundManagerStatus(fundManagerId);

  const statusOptions = [
    {
      status: 'pending',
      label: 'pending',
    },
    {
      status: 'approved',
      label: 'approved',
    },
    {
      status: 'rejected',
      label: 'rejected',
    },
  ];

  const statusChipProps: ComponentPropsWithoutRef<typeof StatusChip> =
    fundManagerDetails?.status === 'pending'
      ? {
          editable: true,
          status: fundManagerDetails?.status,
          loading: isLoading,
          options: statusOptions as any,
          onChange: (fundManagerStatus: Status) => {
            if (checkOrThrow(EPermission.ManageFundManagers))
              updateFundManagerStatus(
                fundManagerStatus as BaseFundManager['status'],
              );
          },
        }
      : {
          status: fundManagerDetails?.status ?? 'pending',
        };

  if (!fundManagerId) return null;

  if (!fundManagerDetails && !isLoading)
    return (
      <SubLayout>
        <div className="flex items-center justify-center">
          <p className="text-2xl text-gray-500">
            {t('notApplicable', { ns: 'common' })}
          </p>
        </div>
      </SubLayout>
    );

  return (
    <SubLayout>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader size={80} color="black" />
        </div>
      ) : (
        <>
          <Portal target="#header-button">
            <StatusChip {...statusChipProps} />
          </Portal>

          <ProtectedView can={can} required={[EPermission.ReadFundManagers]}>
            <Card>
              <CompanyInfoCard {...fundManagerDetails?.corporate} />
              <CardSection title={t('NationalAddress')} className="gap-2">
                <NationalAddress
                  unitNum="25"
                  buildingNum="8"
                  streetNum="87"
                  zone="MOCKED_Ar Rabwah"
                  city="Riyadh"
                  postalCode="12813"
                />
              </CardSection>
            </Card>
            <Card>
              <PersonalInfoCard
                email={fundManagerDetails?.email}
                fullName={fundManagerDetails?.fullName}
                gender={fundManagerDetails?.gender ?? ''}
                jobTitle="MOCKED_Co.Founder"
                phoneNumber={fundManagerDetails?.mobile}
              />
            </Card>
          </ProtectedView>
        </>
      )}
    </SubLayout>
  );
}
export default FundManagerPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const accessToken = context.req.cookies.access_token;

  if (!accessToken)
    return {
      props: {},
      redirect: { destination: '/admin/auth/sign-in', permanent: false },
    };
  const can = await acl.canAccessAll(accessToken, REQUIRE_PERMISSION);

  const { locale } = context as any;

  const fundManagerId = context.params?.fundManagerID;
  if (!fundManagerId) return { notFound: true };
  const queryOptions = fundManagerQueryOptions.details(
    fundManagerId as string,
    locale,
  );

  const { props: ssrProps, notFound } = await getSSRQuery(
    queryOptions,
    accessToken,
  );
  return {
    props: {
      ...ssrProps,
      fundManagerId,
      can,
    },
    notFound,
  };
};
