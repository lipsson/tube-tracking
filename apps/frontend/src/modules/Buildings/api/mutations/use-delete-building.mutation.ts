import { httpClient } from '@/api';
import { useMutation } from '@tanstack/react-query';

export const useDeleteBuildingMutation = () =>
  useMutation(async ({ _id }: { _id: string }) => {
    await httpClient.delete(
      `/buildings/${_id}`,
    );
  });