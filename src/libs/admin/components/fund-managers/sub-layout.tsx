import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Header from '../../layout/Header';
import SubNav from '../../layout/SubNav';

type SubLayoutProps = {
  children: React.ReactNode;
};
const SubLayout = ({ children }: SubLayoutProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { fundManagerID, investorID } = router.query as {
    fundManagerID?: string;
    investorID?: string;
  };

  return (
    <div className="h-full">
      <Header
        backLink={fundManagerID ? '/admin/fund-managers' : '/admin/investors'}
        title={fundManagerID ? t('FundManager') : t('Investor')}
      />
      <div className="flex h-full w-full gap-4">
        <div>
          <SubNav investorID={investorID} fundManagerID={fundManagerID} />
        </div>
        <div className="flex flex-1 flex-col gap-4 ">{children}</div>
      </div>
    </div>
  );
};

export default SubLayout;
