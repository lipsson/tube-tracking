import { useQuery } from '@tanstack/react-query';

import { BuildingDto } from '../dto/building.dto';
import { httpClient } from '@/api';
import { REFETCH_INTERVAL_TIME_FOR_LIST } from '@/common/query-client';

export const useBuildingListQuery = () => {
  return useQuery<BuildingDto[]>(
    ['building'],
    async () => {
      const { data } = await httpClient.get<BuildingDto[]>(
        '/buildings',
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
