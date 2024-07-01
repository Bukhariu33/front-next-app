import type { GetServerSideProps } from 'next';
import Link from 'next/link';
// import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRef } from 'react';

import Button from '@/libs/components/Base/Buttons/Button';
import { EPermission } from '@/libs/configs/appConfig';
import useLanguage from '@/libs/hooks/useLanguage';
import { acl } from '@/libs/packages/acl';
import { ProtectedView } from '@/libs/packages/acl/components/ProtectedView';
import useClientAcl from '@/libs/packages/acl/hooks/use-client-acl';
import { getSSRQuery } from '@/libs/packages/queryBuilder';
import Table from '@/libs/packages/tables';
import { DateRangeFilter } from '@/libs/packages/tables/filters/Builders/DateRange';
import { StatusFilter } from '@/libs/packages/tables/filters/Builders/Status-Filter';
import listFundsQueryOptions from '@/libs/services/admin/funds/list-funds';
import getIssuanceStatusOptions from '@/utils/get-issuance-status-options';

const REQUIRE_PERMISSION: EPermission[] = [
  EPermission.CreateFund,
  EPermission.ReadFund,
];

interface Props {
  can: Record<string, boolean>;
}
function Index({ can }: Props) {
  const { t } = useTranslation('common');
  const { language } = useLanguage(); // to invalidate query if the language not equal the current language request on server side
  const { checkOrThrow } = useClientAcl({ can });
  const filters = useRef({
    statusFilter: new StatusFilter(getIssuanceStatusOptions(t)),
    DateFilter: new DateRangeFilter(),
  }).current;

  return (
    <ProtectedView can={can} required={[EPermission.ReadFund]}>
      <Table
        namespace="admin-common"
        headers={[
          'fundId',
          'fundManagerName',
          'fundName',
          'fundCoverage',
          'creationDate',
          'status',
        ]}
        cellsType={['link', 'text', 'text', 'money', 'date', 'status']}
        queryOptions={listFundsQueryOptions.details}
        filters={filters}
        args={[language]}
        navigationPath="funds"
        headerButton={
          <Link
            href="funds/new"
            onClick={event => checkOrThrow(EPermission.CreateFund, event)}
          >
            <Button
              namespace="admin-common"
              text="createNewFund"
              data-cy-button="create-new-fund"
            />
          </Link>
        }
      />
    </ProtectedView>
  );
}

export default Index;

export const getServerSideProps = (async context => {
  const accessToken = context.req.cookies.access_token;

  if (!accessToken)
    return {
      props: {},
      redirect: { destination: '/admin/auth/sign-in', permanent: false },
    };
  const can = await acl.canAccessAll(accessToken, REQUIRE_PERMISSION);
  const { locale } = context;
  const queryOptions = listFundsQueryOptions.details({}, undefined, locale);

  const { props: ssrProps, notFound } = await getSSRQuery(
    queryOptions,
    accessToken,
  );
  return {
    props: {
      ...ssrProps,
      can,
    },
    notFound,
  };
}) satisfies GetServerSideProps;
