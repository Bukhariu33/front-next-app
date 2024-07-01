import DepositFormBody from '@/libs/admin/components/Deposit/deposit-form';
import PageHeader from '@/libs/components/Base/layout/PageHeader';

const CreateDeposit = () => {
  return (
    <>
      <PageHeader namespace="admin-common" title="createdeposit" />
      <DepositFormBody type="create" />
    </>
  );
};

export default CreateDeposit;
