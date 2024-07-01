import { Stack } from '@mantine/core';
import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';

import Card from '@/libs/admin/section-card';
import Button from '@/libs/components/Base/Buttons/Button';
import PageHeader from '@/libs/components/Base/layout/PageHeader';
import UserSupportTicketsTable from '@/libs/components/help-and-support/user-support-tickets-table';
import { Meta } from '@/libs/components/seo/meta';
import { getSSRQuery } from '@/libs/packages/queryBuilder';
import listSupportQueryOptions from '@/libs/services/support/support-list';
import type { UserType } from '@/libs/types/auth';

export default function InvestorTicketsListPage({
  userType,
}: {
  userType: UserType;
}) {
  const { t } = useTranslation(['common', 'support']);

  return (
    <>
      <Meta title={t('helpAndSupport')} />
      <Stack className="mb-8">
        <PageHeader namespace="support" title="helpAndSupport" showBack>
          <Link href="/investor/support/new">
            <Button
              namespace="support"
              text="createNewTicket"
              data-cy-button="createNewTicket"
            />
          </Link>
        </PageHeader>

        <Card>
          <UserSupportTicketsTable userType={userType} />
        </Card>
      </Stack>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);
  const accessToken = context.req.cookies.access_token;

  const queryOptions = listSupportQueryOptions.details(
    {},
    undefined,
    session?.user?.type,
  );
  const { props: ssrProps, notFound } = await getSSRQuery(
    queryOptions,
    accessToken,
  );
  return {
    props: {
      ...ssrProps,
      userType: session?.user?.type,
    },
    notFound,
  };
};
