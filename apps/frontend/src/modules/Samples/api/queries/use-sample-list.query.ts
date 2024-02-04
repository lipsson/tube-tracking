import { useQuery } from '@tanstack/react-query';

import { SamplesDto } from '../dto/samples.dto';
import { httpClient } from '@/api';
import { REFETCH_INTERVAL_TIME_FOR_LIST } from '@/common/query-client';

export const useSamplesListQuery = () => {
  return useQuery<SamplesDto[]>(
    ['samples'],
    async () => {
      const { data } = await httpClient.get<SamplesDto[]>(
        '/samples',
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
