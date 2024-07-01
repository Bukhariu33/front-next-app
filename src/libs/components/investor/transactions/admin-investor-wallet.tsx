import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import WalletCard from '@/libs/components/fund-details/panels/fund-wallet/wallet-card';
import { getInvestorWalletDetails } from '@/libs/services/admin/investors/fund-wallet/investor-wallet.details';

const AdminInvestorWalletCard = () => {
  const { query } = useRouter();
  const investorId = query.investorID as string;
  const { data: walletDetails, isLoading } = useQuery(
    getInvestorWalletDetails.details(investorId),
  );

  return <WalletCard isLoading={isLoading} walletDetails={walletDetails} />;
};

export default AdminInvestorWalletCard;
