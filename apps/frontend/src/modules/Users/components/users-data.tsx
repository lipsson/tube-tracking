import { Card } from '@mui/material';
import { SamplesTable } from './users-table';
import { useUsersListQuery } from '../api/queries/use-get-users-query';

export const UsersData = () => {
  const { data: usersist, isLoading } = useUsersListQuery();

  return (
    <Card>
      <SamplesTable data={usersist} isLoading={isLoading} />
    </Card>
  );
}

