import PlanFormBody from '@/libs/admin/components/plans/plans-form';
import AdminIndexLayout from '@/libs/admin/layout/index-layout';

const CreatePlan = () => {
  return (
    <AdminIndexLayout>
      <PlanFormBody type="create" />
    </AdminIndexLayout>
  );
};

export default CreatePlan;
