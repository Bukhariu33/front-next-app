import type { Resources } from 'i18next';

export type FooterLinks = {
  href: string;
  label: keyof Resources['footer'];
};

export const footerLinks: Record<string, FooterLinks[]> = {
  OwaisFinancialPolicies: [
    {
      href: '/owais-financial-policies/terms-and-conditions',
      label: 'TermsAndConditions',
    },
    {
      href: '/owais-financial-policies/privacy-policy',
      label: 'PrivacyPolicy',
    },
    {
      href: '/owais-financial-policies/credit-file',
      label: 'CreditFile',
    },
    {
      href: '/owais-financial-policies/adhere-to-sharia',
      label: 'AdhereToSharia',
    },
  ],
  KnowledgeCenter: [
    {
      href: '/knowledge-center/faqs',
      label: 'FAQs',
    },
    {
      href: '/knowledge-center/help-and-support',
      label: 'HelpAndSupport',
    },
    {
      href: '/knowledge-center/blog-and-news',
      label: 'BlogAndNews',
    },
  ],
  OurServices: [
    {
      href: '/our-services/investors',
      label: 'Investors',
    },
    {
      href: '/our-services/fund-managers',
      label: 'FundManagers',
    },
  ],
};
