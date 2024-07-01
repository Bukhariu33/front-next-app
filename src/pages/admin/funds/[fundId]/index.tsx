import { Stack } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useQuery } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import type { ComponentPropsWithoutRef } from 'react';

import AdminFundCard from '@/libs/admin/components/funds/fund-card';
import FundPublish from '@/libs/admin/components/funds/fund-publish';
import Header from '@/libs/admin/layout/Header';
import Button from '@/libs/components/Base/Buttons/Button';
import StatusChip from '@/libs/components/Base/status-chip/status-chip';
import FundDetails from '@/libs/components/fund-details/FundDetails';
import { EPermission } from '@/libs/configs/appConfig';
import useUpdateAdminFundStatus from '@/libs/hooks/admin/funds/use-update-fund-status';
import useLanguage from '@/libs/hooks/useLanguage';
import { acl } from '@/libs/packages/acl';
import { ProtectedView } from '@/libs/packages/acl/components/ProtectedView';
import useClientAcl from '@/libs/packages/acl/hooks/use-client-acl';
import { getSSRQuery } from '@/libs/packages/queryBuilder';
import { getAdminFundDetailsQueryOptions } from '@/libs/services/admin/funds/fundDetails';
import type { BaseFund } from '@/libs/types/interface/fund/base';

const REQUIRE_PERMISSION: EPermission[] = [
  EPermission.ReadFund,
  EPermission.UpdateFund,
  EPermission.ManageFund,
];

interface FundDetailsPageProps {
  fundId: string;
  can: Record<string, boolean>;
}
export default function FundDetailsPage({ fundId, can }: FundDetailsPageProps) {
  const { t } = useTranslation(['common', 'fund']);
  const { language } = useLanguage(); // to invalidate query if the language not equal the current language request on server side
  const { data: fundDetails, isLoading } = useQuery(
    getAdminFundDetailsQueryOptions.details(fundId, language),
  );

  const { updateFundStatus } = useUpdateAdminFundStatus(fundId);
  const { checkOrThrow } = useClientAcl({ can });
  const statusChipProps: ComponentPropsWithoutRef<typeof StatusChip> =
    fundDetails?.status === 'pendingApproval'
      ? {
          editable: true,
          status: fundDetails?.status,
          loading: isLoading,
          options: [
            {
              status: 'pendingApproval',
              label: 'pendingApproval',
            },
            {
              status: 'fundApproved',
              label: 'fundApproved',
            },
            {
              status: 'fundRejected',
              label: 'fundRejected',
            },
          ],
          onChange: fundStatus => {
            if (!fundStatus) return;
            if (checkOrThrow(EPermission.UpdateFund)) {
              updateFundStatus(fundStatus as BaseFund['status']);
            }
          },
        }
      : {
          status: fundDetails?.status ?? 'pendingApproval',
          loading: isLoading,
        };

  const fundPublish = () => {
    modals.open({
      modalId: 'fundPublish',
      size: '880px',
      title: t('fund:publishFund'),
      children: <FundPublish fundId={fundId} />,
      centered: true,
      withCloseButton: false,
      classNames: {
        title: 'text-2xl font-bold',
      },
    });
  };

  return (
    <ProtectedView can={can} required={[EPermission.ReadFund]}>
      <Stack>
        <Header backLink="/admin/funds" title={t('fund:fundDetails')}>
          {fundDetails?.status === 'contractApproved' ? (
            <Button
              namespace="fund"
              text="publish"
              onClick={e => {
                if (checkOrThrow(EPermission.ManageFund, e)) {
                  fundPublish();
                }
              }}
            />
          ) : (
            <StatusChip {...statusChipProps} />
          )}
        </Header>
        <AdminFundCard
          isDetailsPage
          fund={fundDetails}
          checkCanUpdate={() => checkOrThrow(EPermission.UpdateFund)}
        />
        <FundDetails fund={fundDetails} />
      </Stack>
    </ProtectedView>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const accessToken = context.req.cookies.access_token;
  const { locale } = context as any;

  const fundId = context.params?.fundId;
  if (!fundId) return { notFound: true };
  const queryOptions = getAdminFundDetailsQueryOptions.details(
    fundId as string,
    locale,
  );
  if (!accessToken)
    return {
      props: {},
      redirect: { destination: '/admin/auth/sign-in', permanent: false },
    };
  const can = await acl.canAccessAll(accessToken, REQUIRE_PERMISSION);
  const { props: ssrProps, notFound } = await getSSRQuery(
    queryOptions,
    accessToken,
  );
  return {
    props: {
      ...ssrProps,
      fundId,
      can,
    },
    notFound,
  };
};
