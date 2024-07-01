import { useRouter } from 'next/router';

import useLinkTabs from '@/libs/hooks/use-link-tabs/use-link-tabs';
import useUser from '@/libs/hooks/useUser';
import type { QueryOptionsReturnType } from '@/libs/packages/queryBuilder';
import type { TableQueryFunctionReturn } from '@/libs/packages/tables';
import type { FilterParams } from '@/libs/packages/tables/types';
import type { AdminFundReportListItem } from '@/libs/types/admin/funds/fund-report';
import type {
  APIResponseUploadReport,
  UploadProps,
} from '@/libs/types/base/uploadFundReport';
import type { FundReportListItem } from '@/libs/types/fund-managers/funds/fund-report';
import type { TranslationKey } from '@/libs/types/utils/withTranslation';

import FundReportPanel from './FundReportPanel';
import VotingOnFundDecisionsPanel from './VotingOnFundDecisionsPanel';

type MyFundProps = {
  fundReportQueryOptions: QueryOptionsReturnType<
    TableQueryFunctionReturn<
      'fund',
      FundReportListItem | AdminFundReportListItem
    >,
    [FilterParams | undefined, string | undefined, string | undefined, ...any[]]
  >;
  uploadReport: (payload: UploadProps) => Promise<APIResponseUploadReport>;
  withInvestorsPage?: boolean;
};

const MyFund = ({
  fundReportQueryOptions,
  uploadReport,
  withInvestorsPage,
}: MyFundProps) => {
  const router = useRouter();
  const { user } = useUser();
  const fundId = router.query.fundId as string;
  const fundManagerID = router.query.fundManagerID as string;
  const tabs = withInvestorsPage
    ? ['fundReport', 'listOfInvestors', 'votingOnFundDecisions']
    : ['fundReport', 'votingOnFundDecisions'];

  const investorsPageLink =
    user?.type === 'admin'
      ? `/admin/fund-managers/${fundManagerID}/funds/${fundId}/investors-list`
      : `/fund-manager/funds/${fundId}/investors-list`;
  const panels = withInvestorsPage
    ? {
        fundReport: (
          <FundReportPanel
            fundReportQueryOptions={fundReportQueryOptions}
            uploadReport={uploadReport}
          />
        ),
        listOfInvestors: () => router.push(investorsPageLink),
        votingOnFundDecisions: <VotingOnFundDecisionsPanel />,
      }
    : {
        fundReport: (
          <FundReportPanel
            fundReportQueryOptions={fundReportQueryOptions}
            uploadReport={uploadReport}
          />
        ),
        votingOnFundDecisions: <VotingOnFundDecisionsPanel />,
      };
  const View = useLinkTabs({
    namespace: 'common',
    tabs: tabs as TranslationKey<'common'>[],
    defaultTab: 'fundReport',
    type: 'side',
    panels: panels as Record<(typeof tabs)[number], React.ReactNode>,
  });
  return <div className="w-full @container">{View}</div>;
};

export default MyFund;
