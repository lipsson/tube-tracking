import { useQuery } from '@tanstack/react-query';

import { SamplesDto } from '../dto/samples.dto';
import { httpClient } from '@/api';

export const useSampleDetailsQuery = (_id: string) => {
  return useQuery<SamplesDto>(
    ['sample-details'],
    async () => {
      const { data } = await httpClient.get<SamplesDto>(
        `/samples/${_id}`,
      );
      return data;
    },
  );
};
