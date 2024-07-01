import Table from '@/libs/packages/tables';
import listUsersQueryOptions from '@/libs/services/user/list';

function Index() {
  return (
    <Table
      namespace="admin-common"
      headers={['id', 'name', 'email']}
      cellsType={['text', 'text']}
      queryOptions={listUsersQueryOptions.details}
      navigationPath="admin"
    />
  );
}

export default Index;
