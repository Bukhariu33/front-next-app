import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getServerSession } from 'next-auth';

import { nextAuthOptions } from '@/pages/api/auth/[...nextauth]';

import { corporateKycQueryOptions } from '../../../hooks/kyc/useCorporateKyc';
import { individualKycQueryOptions } from '../../../hooks/kyc/useIndividualKyc';
import { getSSRQuery } from '../../../packages/queryBuilder';

export const withKycQueries = () => {
  return async (
    context: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<any>> => {
    const accessToken = context.req.cookies.access_token;
    const session = await getServerSession(
      context.req,
      context.res,
      nextAuthOptions,
    );

    // CORPORATE
    if (session?.user?.type === 'corporateInvestor') {
      const corporateQueryOptions = corporateKycQueryOptions.details(
        session?.user?.id,
      );
      const { props: corporateSsrProps } = await getSSRQuery(
        corporateQueryOptions,
        accessToken,
      );
      return {
        props: { corporateKyc: corporateSsrProps?.data ?? null },
      };
    }

    // INDIVIDUAL
    if (session?.user?.type === 'individualInvestor') {
      const individualQueryOptions = individualKycQueryOptions.details(
        session?.user?.id,
      );
      const { props: individualSsrProps } = await getSSRQuery(
        individualQueryOptions,
        accessToken,
      );
      return {
        props: { individualKyc: individualSsrProps?.data ?? null },
      };
    }
    return {
      props: {},
    };
  };
};
