import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { isCurrentActivePath } from '../useNavLinks';
import useUser from '../useUser';

function useSubNavLinks({
  fundManagerID,
  investorID,
}: {
  fundManagerID?: string;
  investorID?: string;
}) {
  const { user } = useUser();
  const { t } = useTranslation(['profile', 'admin-common']);
  const router = useRouter();

  const fundManagerPatterns = {
    generalInfo: isCurrentActivePath(
      `/admin/fund-managers/${fundManagerID}`,
      router.locale as string,
    ),
    fundsWallets: isCurrentActivePath(
      `/admin/fund-managers/${fundManagerID}/funds-wallets`,
      router.locale as string,
    ),
    funds: isCurrentActivePath(
      `/admin/fund-managers/${fundManagerID}/funds`,
      router.locale as string,
    ),
    helpSupport: isCurrentActivePath(
      `/admin/fund-managers/${fundManagerID}/support/*`,
      router.locale as string,
    ),
  };

  const investorPatterns = {
    generalInfo: isCurrentActivePath(
      `/admin/investors/${investorID}`,
      router.locale as string,
    ),
    kyc: isCurrentActivePath(
      `/admin/investors/${investorID}/kyc`,
      router.locale as string,
    ),
    helpSupport: isCurrentActivePath(
      `/admin/investors/${investorID}/support/*`,
      router.locale as string,
    ),
    investorTransactions: isCurrentActivePath(
      `/admin/investors/${investorID}/transactions/*`,
      router.locale as string,
    ),
    accountDetails: isCurrentActivePath(
      `/admin/investors/${investorID}/account-details/*`,
      router.locale as string,
    ),
  };

  switch (user?.type) {
    case 'admin': {
      if (fundManagerID) {
        return [
          {
            id: 1,
            href: `/admin/fund-managers/${fundManagerID}`,
            label: t('generalInfo'),
            isActive: fundManagerPatterns.generalInfo,
          },
          {
            id: 2,
            href: `/admin/fund-managers/${fundManagerID}/funds-wallets`,
            label: t('fundsWallets'),
            isActive: fundManagerPatterns.fundsWallets,
          },
          {
            id: 3,
            href: `/admin/fund-managers/${fundManagerID}/funds`,
            label: t('funds'),
            isActive: fundManagerPatterns.funds,
          },
          {
            id: 4,
            href: `/admin/fund-managers/${fundManagerID}/support`,
            label: t('helpAndSupport'),
            isActive: fundManagerPatterns.helpSupport,
          },
        ];
      }
      if (investorID) {
        return [
          {
            id: 1,
            href: `/admin/investors/${investorID}`,
            label: t('generalInfo'),
            isActive: investorPatterns.generalInfo,
          },
          {
            id: 2,
            href: `/admin/investors/${investorID}/kyc`,
            label: t('admin-common:kycInfo'),
            isActive: investorPatterns.kyc,
          },
          {
            id: 3,
            href: `/admin/investors/${investorID}/account-details`,
            label: t('admin-common:investorAccountDetails'),
            isActive: investorPatterns.accountDetails,
          },
          {
            id: 4,
            href: `/admin/investors/${investorID}/support`,
            label: t('helpAndSupport'),
            isActive: investorPatterns.helpSupport,
          },
          {
            id: 5,
            href: `/admin/investors/${investorID}/transactions`,
            label: t('admin-common:transactions'),
            isActive: investorPatterns.investorTransactions,
          },
        ];
      }
      return [];
    }
    default:
      return null;
  }
}
export default useSubNavLinks;
