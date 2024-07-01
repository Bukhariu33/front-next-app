import type { FC } from 'react';

import useUser from '@/libs/hooks/useUser';
import type { UserType } from '@/libs/types/auth/user';
import type { BaseFund } from '@/libs/types/interface/fund/base';

import AdminFundDetailsLayout from './layout/admin';
import FundManagerFundDetailsLayout from './layout/fund-manager';
import GuestFundDetailsLayout from './layout/guest';

export interface FundDetailsProps {
  fund?: BaseFund;
  withInvestorsPage?: boolean;
}

const renderView = (
  userType?: UserType | 'Guest',
  fund?: BaseFund,
  withInvestorsPage?: boolean,
) => {
  switch (userType) {
    case 'admin':
      return (
        <AdminFundDetailsLayout
          fund={fund}
          withInvestorsPage={withInvestorsPage}
        />
      );
    case 'fundManager':
      return (
        <FundManagerFundDetailsLayout
          fund={fund}
          withInvestorsPage={withInvestorsPage}
        />
      );

    default:
      return <GuestFundDetailsLayout fund={fund} />;
  }
};

const FundDetails: FC<FundDetailsProps> = ({ fund, withInvestorsPage }) => {
  const { status, user } = useUser();
  const isAuthenticated = status === 'authenticated';
  const userType = user?.type;

  return (
    <div className="w-full @container">
      {fund?.status === 'fundApproved' || !isAuthenticated
        ? renderView('Guest', fund, withInvestorsPage)
        : renderView(userType, fund, withInvestorsPage)}
    </div>
  );
};

export default FundDetails;
