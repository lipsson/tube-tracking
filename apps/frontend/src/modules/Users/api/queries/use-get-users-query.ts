/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery } from '@tanstack/react-query';
import { httpClient } from '@/api';
import { UsersDto } from '../dto/users.dto';
import { REFETCH_INTERVAL_TIME_FOR_LIST } from '@/common/query-client';

export const useUsersListQuery = () => {
  return useQuery<UsersDto[]>(
    ['users'],
    async () => {
      const { data } = await httpClient
        .get<UsersDto[]>(
          `/users`,
        );

      return data;
    },
    {
      keepPreviousData: true,
      refetchInterval: REFETCH_INTERVAL_TIME_FOR_LIST,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
    },
  );
};
