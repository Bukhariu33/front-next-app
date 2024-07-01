import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Button from '@/libs/components/Base/Buttons/Button';
import BackLink from '@/libs/components/funds/back-link';
import InvestorsList from '@/libs/components/funds/investors-list';
import DownloadIcon from '@/libs/icons/download-icon';
import listInvestorsQueryOptions from '@/libs/services/fund-manager/list-investors';

function InvestorsListPage() {
  const router = useRouter();
  const { fundId } = router.query;
  const { t } = useTranslation('common');

  return (
    <div className="py-8">
      <BackLink
        to={`/fund-manager/funds/${fundId}`}
        label={t('listOfInvestors')}
      />
      <p className="my-8 font-medium leading-5">
        {t('startingFrom')} 30/06/2023
      </p>
      <InvestorsList
        listInvestorsQueryOptions={listInvestorsQueryOptions}
        headerButton={
          <Button
            namespace="common"
            text="downloadKyc"
            leftSection={<DownloadIcon className="h-5 w-5 stroke-white" />}
          />
        }
      />
    </div>
  );
}

export default InvestorsListPage;
