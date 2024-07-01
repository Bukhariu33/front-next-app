import WithdrawFormBody from '@/libs/admin/components/Withdraw/withdraw-form';
import PageHeader from '@/libs/components/Base/layout/PageHeader';

const createWithdraw = () => {
  return (
    <>
      <PageHeader namespace="admin-common" title="createWithdraw" />
      <WithdrawFormBody type="create" />
    </>
  );
};

export default createWithdraw;
