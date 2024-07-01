import { useQuery } from '@tanstack/react-query';

import useUser from '@/libs/hooks/useUser';
import { getInvestorFundDetails } from '@/libs/services/investor/funds/fundDetails';

import InvestorFundCard from './investor-fund-card';
import InvestorWalletCard from './InvestorWalletCard';

interface InvestorInvestmentDetailsProps {
  children: React.ReactNode;
  showWallet?: boolean;
  fundId: string;
}
const InvestorInvestmentDetailsLayout = ({
  children,
  showWallet,
  fundId,
}: InvestorInvestmentDetailsProps) => {
  const { user } = useUser();
  const { data: fund } = useQuery(
    getInvestorFundDetails.details(fundId, user?.id!),
  );

  return (
    <div className="grid-flow-auto grid grid-cols-12 gap-4">
      <div className="col-span-8">{children}</div>
      <div className="col-span-4 flex flex-col gap-4">
        {showWallet && <InvestorWalletCard />}
        <InvestorFundCard key={fund?.id} fund={fund} />
      </div>
    </div>
  );
};

export default InvestorInvestmentDetailsLayout;
