import { httpClient } from '@/api';
import { useMutation } from '@tanstack/react-query';

export const useDeleteSamplesMutation = () =>
  useMutation(async ({ _id }: { _id: string }) => {
    await httpClient.delete(
      `/samples/${_id}`,
    );
  });