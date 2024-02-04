import { httpClient } from '@/api';
import { useMutation } from '@tanstack/react-query';

export const useDeleteLabWorkersMutation = () =>
  useMutation(async ({ _id }: { _id: string }) => {
    await httpClient.delete(
      `/lab-workers/${_id}`,
    );
  });