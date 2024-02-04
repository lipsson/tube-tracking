import { useQuery } from '@tanstack/react-query';

import { LabWorkersDto } from '../dto/lab-workers.dto';
import { httpClient } from '@/api';
import { REFETCH_INTERVAL_TIME_FOR_LIST } from '@/common/query-client';

export const useLabWorkersListQuery = () => {
  return useQuery<LabWorkersDto[]>(
    ['lab-workers'],
    async () => {
      const { data } = await httpClient.get<LabWorkersDto[]>(
        '/lab-workers',
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
