import adminCommon from '../../../../public/locales/en/admin-common.json';
import adminFundManagers from '../../../../public/locales/en/admin-fund-managers.json';
import auth from '../../../../public/locales/en/auth.json';
import common from '../../../../public/locales/en/common.json';
import error from '../../../../public/locales/en/error.json';
import footer from '../../../../public/locales/en/footer.json';
import fund from '../../../../public/locales/en/fund.json';
import kyc from '../../../../public/locales/en/kyc.json';
import profile from '../../../../public/locales/en/profile.json';
import support from '../../../../public/locales/en/support.json';

const resources = {
  common,
  kyc,
  footer,
  error,
  auth,
  'admin-common': adminCommon,
  profile,
  support,
  fund,
  'admin-fund-managers': adminFundManagers,
} as const;

export default resources;
