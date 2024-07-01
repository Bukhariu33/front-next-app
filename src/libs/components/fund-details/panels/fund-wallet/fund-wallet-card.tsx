import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { getWalletDetails } from '@/libs/services/fund-manager/funds/wallet-details';

import WalletCard from './wallet-card';

const FundWalletCard = () => {
  const { query } = useRouter();
  const fundId = query.fundId as string;
  const { data: walletDetails, isLoading } = useQuery(
    getWalletDetails.details(fundId),
  );

  return <WalletCard isLoading={isLoading} walletDetails={walletDetails} />;
};

export default FundWalletCard;
