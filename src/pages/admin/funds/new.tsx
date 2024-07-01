import type { GetServerSideProps } from 'next';

import FundForm from '@/libs/admin/components/funds/fund-form-elements/FundForm';
import { EPermission } from '@/libs/configs/appConfig';
import { acl } from '@/libs/packages/acl';
import { ProtectedView } from '@/libs/packages/acl/components/ProtectedView';

const REQUIRE_PERMISSION: EPermission[] = [EPermission.CreateFund];

export default function CreateNewFund({
  can,
}: {
  can: Record<string, boolean>;
}) {
  return (
    <ProtectedView can={can} required={[EPermission.CreateFund]}>
      <FundForm />
    </ProtectedView>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const accessToken = context.req.cookies.access_token;

  if (!accessToken)
    return {
      props: {},
      redirect: { destination: '/admin/auth/sign-in', permanent: false },
    };
  const can = await acl.canAccessAll(accessToken, REQUIRE_PERMISSION);

  return {
    props: {
      can,
    },
  };
};
