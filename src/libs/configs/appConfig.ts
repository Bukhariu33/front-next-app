import type { DefaultSeoProps } from 'next-seo';


import type { User } from '../types/auth/next-auth';

export const AppConfig = {
  site_name: 'NetworkBuxx',
  title: 'NetworkBuxx',
  description: 'Grow Your Ads with NetworkBuxx.',
  locale: 'en',
};

export const socialLinks = {
  twitter: 'https://www.twitter.com',
  linkedin: 'https://www.linkedin.com',
  appStore: 'https://store.apple.com',
  playStore: 'https://store.google.com',
};

export const SeoConfig: DefaultSeoProps = {
  title: undefined,
  titleTemplate: '%s | NetworkBuxx',
  defaultTitle: AppConfig.title,
  description: AppConfig.description,
  canonical: 'http://localhost:4000',
  openGraph: {
    type: 'website',
    locale: AppConfig.locale,
    url: 'http://localhost:4000',
    siteName: AppConfig.site_name,
    title: AppConfig.title,
    description: AppConfig.description,
    images: [
      {
        url: `http://localhost:4000/seo-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Eads Logo',
      },
    ],
  },
  twitter: {
    handle: '@YourTwitterHandle', // Make sure to replace this with your Twitter handle
    site: '@YourTwitterHandle',
    cardType: 'summary_large_image',
  },
};

export const PATH_SEGMENTS: Record<User['type'], string> = {
  admin: 'admin',
  fundManager: 'fund-manager',
  individualInvestor: 'user',
  corporateInvestor: 'investor',
};

export enum EPermission {
  ReadPermissions = 'readPermissions',
  CreateRoles = 'createRoles',
  CreatePermissions = 'createPermissions',
  CreateAdmins = 'createAdmins',
  ManageRoles = 'manageRoles',
  UpdatePermissions = 'updatePermissions',
  UpdateRoles = 'updateRoles',
  ReadRoles = 'readRoles',
  DeleteRoles = 'deleteRoles',
  DeletePermissions = 'deletePermissions',
  ReadAdmins = 'readAdmins',
  UpdateAdmins = 'updateAdmins',
  DeleteAdmins = 'deleteAdmins',
  ManageAdmins = 'manageAdmins',
  ReadInvestors = 'readInvestors',
  ReadFundManagers = 'readFundManagers',
  ManageFundManagers = 'manageFundManagers',
  ManageInvestors = 'manageInvestors',
  ReadFund = 'readFund',
  CreateFund = 'createFund',
  UpdateFund = 'updateFund',
  DeleteFund = 'deleteFund',
  ManageFund = 'manageFund',
}
