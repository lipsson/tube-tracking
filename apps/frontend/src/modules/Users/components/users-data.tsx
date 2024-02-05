import { Card } from '@mui/material';
import { UsersTable } from './users-table';
import { useUsersListQuery } from '../api/queries/use-get-users-query';

export const UsersData = () => {
  const { data: usersist, isLoading } = useUsersListQuery();

  return (
    <Card>
      <UsersTable data={usersist} isLoading={isLoading} />
    </Card>
  );
}

