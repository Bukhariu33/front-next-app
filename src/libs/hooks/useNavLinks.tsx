// eslint-disable-next-line simple-import-sort/imports
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { URLPattern } from 'next/server';

import FundManagerIcon from '../icons/FundManagerIcon';
import DashboardIcon from '../icons/dashboard-icon';
import FundIssuanceIcon from '../icons/fund-issuance-icon';
import HelpAndSupportIcon from '../icons/help-and-support-icon';
import InvestmentIcon from '../icons/investment-icon';
import InvestorsIcon from '../icons/investors-icon';
import ProfileIcon from '../icons/profile-icon';
import useUser from './useUser';

export interface NavLinkListItem {
  id: number;
  label: string;
  href: string;
  /** used to show the link in the menu footer menu */
  isMobile?: boolean;
  Icon: React.ReactNode;
  bigIcon: React.ReactNode;

  isActive: boolean;
}

export function serializePattern(pattern: string, local: string): string {
  // the URL Pattern will not catch the index route. example: /admin will not be caught by /admin/*
  const serialized = pattern.replace(/\/\*$/, '{/*}?');
  if (local === 'ar') return `/${local}${serialized}`;
  return serialized;
}

/**
 *
 * @param pattern  the pattern to check if it is active ex: /admin/fund-managers/:paths
 * @param locale the locale to use in the pattern
 * @returns {boolean} true if the pattern is active
 */
export const isCurrentActivePath = (
  pattern: string,
  locale: string,
): boolean => {
  if (typeof window === 'undefined') return false;
  const url = new URL(window.location.href);
  const urlPattern = new URLPattern({
    ...url,
    pathname: serializePattern(pattern, locale || 'en'),
  });

  return urlPattern.test(url);
};

/**
 *
 * get the nav links based on user type
 * @returns {NavLinkListItem[]}
 * the `isMobile` property is used to show the link in the menu footer menu
 * otherwise it will be shown in the menu body
 */
function useNavLinks(): NavLinkListItem[] {
  const { user } = useUser();
  const { t } = useTranslation(['common', 'footer', 'admin-common']);
  const router = useRouter();
  const adminPatterns = {
    dashboard: isCurrentActivePath('/admin', router.locale as string),
    fundManagers: isCurrentActivePath(
      '/admin/fund-managers/*',
      router.locale as string,
    ),
    users: isCurrentActivePath('/admin/owais-users/*', router.locale as string),
    ads: isCurrentActivePath('/admin/ads/*', router.locale as string),
    plans: isCurrentActivePath('/admin/plans/*', router.locale as string),
    deposits: isCurrentActivePath('/admin/deposits/*', router.locale as string),
    withdraw: isCurrentActivePath('/admin/withdraw/*', router.locale as string),
    funds: isCurrentActivePath('/admin/funds/*', router.locale as string),
    changePassword: isCurrentActivePath(
      '/admin/change-password/*',
      router.locale as string,
    ),
    investors: isCurrentActivePath(
      '/admin/investors/*',
      router.locale as string,
    ),
  };
  const fundManagerPatterns = {
    dashboard: isCurrentActivePath('/fund-manager', router.locale as string),
    support: isCurrentActivePath(
      '/fund-manager/support',
      router.locale as string,
    ),
    profile: isCurrentActivePath(
      '/fund-manager/profile',
      router.locale as string,
    ),
  };
  const investorPatterns = {
    dashboard: isCurrentActivePath('/investor', router.locale as string),
    support: isCurrentActivePath('/investor/support', router.locale as string),
    profile: isCurrentActivePath('/investor/profile', router.locale as string),
    investments: isCurrentActivePath(
      '/investor/my-investments/*',
      router.locale as string,
    ),
    user: isCurrentActivePath('/user/plans/*', router.locale as string),
    ads: isCurrentActivePath('/user/ads/*', router.locale as string),
    deposit: isCurrentActivePath('/user/deposit/*', router.locale as string),
    withdraw: isCurrentActivePath('/user/withdraw/*', router.locale as string),
    changePassword: isCurrentActivePath(
      '/user/change-password/*',
      router.locale as string,
    ),
    refferedUsers: isCurrentActivePath(
      '/user/reffered-users/*',
      router.locale as string,
    ),
  };

  switch (user?.role) {
    case 'admin': {
      return [
        {
          Icon: <DashboardIcon active={adminPatterns.dashboard} />,
          bigIcon: (
            <DashboardIcon active={adminPatterns.dashboard} variant="large" />
          ),
          id: 1,
          href: '/admin',
          label: t('dashboard'),
          isActive: adminPatterns.dashboard,
        },
        {
          Icon: <FundManagerIcon active={adminPatterns.ads} />,
          bigIcon: (
            <FundManagerIcon active={adminPatterns.ads} variant="large" />
          ),
          isActive: adminPatterns.ads,
          id: 2,
          href: '/admin/ads',
          label: 'Ads',
        },
        {
          Icon: <FundIssuanceIcon active={adminPatterns.plans} />,
          bigIcon: (
            <FundIssuanceIcon active={adminPatterns.plans} variant="large" />
          ),
          isActive: adminPatterns.plans,
          id: 3,
          href: '/admin/plans',
          label: 'Plans',
        },
        {
          Icon: <FundIssuanceIcon active={adminPatterns.deposits} />,
          bigIcon: (
            <FundIssuanceIcon active={adminPatterns.deposits} variant="large" />
          ),
          isActive: adminPatterns.deposits,
          id: 3,
          href: '/admin/deposits',
          label: 'Deposits',
        },
        {
          Icon: <FundIssuanceIcon active={adminPatterns.withdraw} />,
          bigIcon: (
            <FundIssuanceIcon active={adminPatterns.withdraw} variant="large" />
          ),
          isActive: adminPatterns.withdraw,
          id: 3,
          href: '/admin/withdraw',
          label: 'withdraw',
        },
        {
          Icon: <InvestorsIcon active={adminPatterns.changePassword} />,
          bigIcon: (
            <InvestorsIcon
              active={adminPatterns.changePassword}
              variant="large"
            />
          ),
          isActive: adminPatterns.changePassword,
          id: 4,
          href: '/admin/change-password',
          label: 'Change Password',
        },
      ];
    }
    case 'fundManager':
      return [
        {
          Icon: <DashboardIcon active={fundManagerPatterns.dashboard} />,
          bigIcon: (
            <DashboardIcon
              active={fundManagerPatterns.dashboard}
              variant="large"
            />
          ),
          id: 1,
          href: '/fund-manager',
          label: t('dashboard'),
          isActive: fundManagerPatterns.dashboard,
        },
        {
          Icon: <ProfileIcon />,
          bigIcon: <ProfileIcon />,
          id: 2,
          href: '/fund-manager/profile',
          label: t('profile'),
          isActive: fundManagerPatterns.profile,
        },
        {
          Icon: <HelpAndSupportIcon />,
          bigIcon: <HelpAndSupportIcon />,
          id: 2,
          href: '/fund-manager/support',
          label: t('helpAndSupport'),
          isActive: fundManagerPatterns.support,
        },
      ];
    case 'corporateInvestor':
    case 'individualInvestor':
      return [
        {
          Icon: <DashboardIcon active={investorPatterns.dashboard} />,
          bigIcon: (
            <DashboardIcon
              active={investorPatterns.dashboard}
              variant="large"
            />
          ),
          id: 1,
          href: '/user',
          label: t('dashboard'),
          isActive: investorPatterns.dashboard,
        },
        {
          Icon: <ProfileIcon />,
          bigIcon: <ProfileIcon />,
          id: 2,
          href: '/user/plans',
          label: 'Plans',
          isActive: investorPatterns.user,
        },
        {
          Icon: <ProfileIcon />,
          bigIcon: <ProfileIcon />,
          id: 2,
          href: '/user/ads',
          label: 'Ads',
          isActive: investorPatterns.ads,
        },
        {
          Icon: <InvestmentIcon />,
          bigIcon: <InvestmentIcon />,
          id: 2,
          href: '/user/deposit',
          label: 'Deposit',
          isActive: investorPatterns.deposit,
        },
        {
          Icon: <InvestmentIcon />,
          bigIcon: <InvestmentIcon />,
          id: 3,
          href: '/user/withdraw',
          label: 'Withdraw',
          isActive: investorPatterns.withdraw,
        },
        {
          Icon: <InvestmentIcon />,
          bigIcon: <InvestmentIcon />,
          id: 3,
          href: '/user/reffered-users',
          label: 'Reffered Users',
          isActive: investorPatterns.refferedUsers,
        },
        {
          Icon: <InvestmentIcon />,
          bigIcon: <InvestmentIcon />,
          id: 3,
          href: '/user/change-password',
          label: 'Change Password',
          isActive: investorPatterns.changePassword,
        },
      ];
    default:
      return [] as NavLinkListItem[];
  }
}

export default useNavLinks;
