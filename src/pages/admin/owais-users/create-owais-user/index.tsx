import OwaisUserFormBody from '@/libs/admin/components/owais-users/OwaisUserForm';
import AdminIndexLayout from '@/libs/admin/layout/index-layout';

const CreateOwaisUser = () => {
  return (
    <AdminIndexLayout>
      <OwaisUserFormBody type="create" />
    </AdminIndexLayout>
  );
};

export default CreateOwaisUser;
