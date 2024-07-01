import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Header from '@/libs/admin/layout/Header';
import Button from '@/libs/components/Base/Buttons/Button';
import InvestorsList from '@/libs/components/funds/investors-list';
import { EPermission } from '@/libs/configs/appConfig';
import useDownloadKyc from '@/libs/hooks/admin/funds/use-download-kyc';
import DownloadIcon from '@/libs/icons/DownloadIcon';
import { acl } from '@/libs/packages/acl';
import { ProtectedView } from '@/libs/packages/acl/components/ProtectedView';
import { getSSRQuery } from '@/libs/packages/queryBuilder';
import adminListFundInvestorsQueryOptions from '@/libs/services/admin/funds/list-investors';

const REQUIRE_PERMISSION: EPermission[] = [
  EPermission.ReadFundManagers,
  EPermission.ReadFund,
];

const AdminFundInvestorsListPage = ({
  can,
}: {
  can: Record<string, boolean>;
}) => {
  const { t } = useTranslation('fund');
  const { downloadKyc } = useDownloadKyc();
  const { query } = useRouter();

  const { fundId, fundManagerID } = query as {
    fundManagerID: string;
    fundId: string;
  };
  const handleDownloadAllInvestorsKYCs = async () => {
    if (!fundId) return;
    await downloadKyc(fundId);
  };
  return (
    <ProtectedView
      can={can}
      required={[EPermission.ReadFund, EPermission.ReadFundManagers]}
    >
      <div>
        <Header
          backLink={`/admin/fund-managers/${fundManagerID}/funds/${fundId}`}
          title={t('listOfInvestors')}
        />
        <InvestorsList
          listInvestorsQueryOptions={adminListFundInvestorsQueryOptions}
          headerButton={
            <Button
              namespace="common"
              text="downloadAllInvestorsKYCs"
              leftSection={<DownloadIcon className="h-5 w-5 stroke-white" />}
              onClick={handleDownloadAllInvestorsKYCs}
            />
          }
        />
      </div>
    </ProtectedView>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const accessToken = context.req.cookies.access_token;
  if (!accessToken)
    return {
      props: {},
      redirect: { destination: '/admin/auth/sign-in', permanent: false },
    };
  const can = await acl.canAccessAll(accessToken, REQUIRE_PERMISSION);
  const fundId = context.params?.fundId;
  if (!fundId) return { notFound: true };
  const queryOptions = adminListFundInvestorsQueryOptions.details(
    {},
    undefined,
  );

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

export default AdminFundInvestorsListPage;
