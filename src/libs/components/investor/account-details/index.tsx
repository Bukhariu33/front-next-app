import { Skeleton } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';

import Card from '@/libs/admin/section-card';
import { getAdminInvestorAccountDetailsQueryOptions } from '@/libs/services/admin/investors/investor-account-details';

import InfoCard from '../../Base/Card/info-card';
import BankIcon from '../../fund-details/panels/fund-wallet/BankIcon';

interface AdminInvestorAccountProps {
  investorID: string;
}
const AdminInvestorAccountDetails = ({
  investorID,
}: AdminInvestorAccountProps) => {
  const { t } = useTranslation('admin-common');
  const { data: bankDetails, isLoading } = useQuery(
    getAdminInvestorAccountDetailsQueryOptions.details(investorID),
  );

  if (isLoading) return <Skeleton height="50vh" radius="xl" />;

  return (
    <Card>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <BankIcon />
        <InfoCard
          title={`${t('accountHolderName')}`}
          value={bankDetails?.name}
          withCopy
          titleClassName="font-medium text-brand-accent-500"
          valueClassName="text-brand-primary-main"
        />
        <InfoCard
          title={`${t('anbTransfer')}`}
          value={bankDetails?.iban}
          withCopy
          titleClassName="font-medium text-brand-accent-500"
          valueClassName="text-brand-primary-main"
        />
        <InfoCard
          title={`${t('transferFromDifferentBanks')}`}
          value={bankDetails?.iban}
          withCopy
          titleClassName="font-medium text-brand-accent-500"
          valueClassName="text-brand-primary-main"
        />
      </div>
    </Card>
  );
};

export default AdminInvestorAccountDetails;
