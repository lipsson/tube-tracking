import { httpClient } from '@/api';
import { ApiErrorType } from '@/api/types/api-error.type';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { convertEmptyStringsToNull } from '@/common/utils/convert-empty-string-to-null';
import { AddUsersType } from '../../types/users.types';


export const useAddUsersMutation = (): UseMutationResult<
  AddUsersType,
  ApiErrorType,
  AddUsersType
> =>
  useMutation(async (body) => {
    const response = await httpClient.put<AddUsersType>(
      `/users`,
      convertEmptyStringsToNull(body),
    );
    return response.data;
  });
