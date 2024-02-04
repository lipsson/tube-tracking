import { httpClient } from '@/api';
import { useMutation } from '@tanstack/react-query';

export const useDeleteUserMutation = () =>
  useMutation(async ({ _id }: { _id: string }) => {
    await httpClient.delete(
      `/users/${_id}`,
    );
  });