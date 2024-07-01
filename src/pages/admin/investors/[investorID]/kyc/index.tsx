import { Loader, Portal, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';

import SubLayout from '@/libs/admin/components/fund-managers/sub-layout';
import { CorporateKYCTable } from '@/libs/admin/components/investors/kyc/corporate-kyc-table';
import { IndividualKYCTable } from '@/libs/admin/components/investors/kyc/individual-kyc-table';
import StatusChip from '@/libs/components/Base/status-chip/status-chip';
import { EPermission } from '@/libs/configs/appConfig';
import { axiosInternal } from '@/libs/configs/axios';
import { useMutation } from '@/libs/hooks/use-mutation';
import { acl } from '@/libs/packages/acl';
import { ProtectedView } from '@/libs/packages/acl/components/ProtectedView';
import useClientAcl from '@/libs/packages/acl/hooks/use-client-acl';
import { openSuccessModal } from '@/libs/packages/modals';
import { getSSRQuery } from '@/libs/packages/queryBuilder';
import investorDetailsQueryOptions from '@/libs/services/admin/investors/investor-details';
import investorKycQueryOptions from '@/libs/services/admin/investors/investor-kyc-info';
import type { AdminInvestorSingleItem } from '@/libs/types/investors';
import type { CorporateKyc } from '@/libs/types/kyc/corporate-kyc';
import type { IndividualKyc } from '@/libs/types/kyc/individual-kyc';
import type { Status } from '@/libs/types/status';

const REQUIRE_PERMISSION: EPermission[] = [
  EPermission.ReadInvestors,
  EPermission.ManageInvestors,
];

function AdminInvestorKYC({
  investorID,
  notFound,
  can,
}: {
  investorID: string;
  notFound: boolean;
  can: Record<string, boolean>;
}) {
  const { t } = useTranslation('kyc');
  const { data: investorDetails, isLoading } =
    useQuery<AdminInvestorSingleItem>(
      investorDetailsQueryOptions.details(investorID),
    );
  const { data: investorKYC, isLoading: isLoadingKYC } = useQuery<
    IndividualKyc | CorporateKyc
  >({
    ...investorKycQueryOptions.details(investorID),
  });

  const { mutateAsync, isLoading: isMutating } = useMutation({
    mutationFn: async (status: Status) => {
      const { data } = await axiosInternal.patch(
        `/admin/investors/${investorID}`,
        {
          status,
        },
      );
      return data.data;
    },
    onSuccess: () => {
      openSuccessModal({
        namespace: 'admin-common',
        id: 'updateInvestorStatus',
        body: 'investorStatusUpdatedSuccessfully',
      });
    },
    revalidateOnSettled: true,
    queryOptions: investorDetailsQueryOptions,
  });

  const { checkOrThrow } = useClientAcl({ can });

  return (
    <SubLayout>
      <ProtectedView can={can} required={[EPermission.ReadInvestors]}>
        <Portal target="#header-button">
          <StatusChip
            loading={isLoading || isMutating}
            status={investorDetails?.status!}
            editable={
              investorDetails?.type === 'corporateInvestor' &&
              investorDetails?.status === 'pending'
            }
            options={[
              {
                status: 'approved',
                label: 'approved',
              },
              {
                status: 'pending',
                label: 'pending',
              },
            ]}
            onChange={status => {
              if (checkOrThrow(EPermission.ManageInvestors)) {
                mutateAsync(status);
              }
            }}
          />
        </Portal>
        {isLoading || isLoadingKYC ? (
          <div className="flex w-full justify-center py-6">
            <Loader size="50px" />
          </div>
        ) : (
          <>
            {notFound && (
              <div className="flex flex-col items-center justify-center">
                <Text className="text-2xl font-extrabold">
                  {t('kycNotFound')}
                </Text>
              </div>
            )}

            {!notFound &&
              investorDetails?.type &&
              (investorDetails?.type === 'individualInvestor' ? (
                <IndividualKYCTable
                  investorDetails={investorDetails}
                  investorKYC={investorKYC!}
                />
              ) : (
                <CorporateKYCTable
                  investorDetails={investorDetails}
                  investorKYC={investorKYC as CorporateKyc}
                />
              ))}
          </>
        )}
      </ProtectedView>
    </SubLayout>
  );
}

export default AdminInvestorKYC;

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
  const KycQueryOptions = investorKycQueryOptions.details(investorID);

  const { props: ssrProps } = await getSSRQuery(queryOptions, accessToken);
  const { props: KycSsrProps, notFound } = await getSSRQuery(
    KycQueryOptions,
    accessToken,
  );

  return {
    props: {
      investorDetails: ssrProps?.data,
      investorKYC: KycSsrProps?.data ?? {},
      investorID,
      notFound: notFound ?? false,
      can,
    },
  };
}) satisfies GetServerSideProps;
