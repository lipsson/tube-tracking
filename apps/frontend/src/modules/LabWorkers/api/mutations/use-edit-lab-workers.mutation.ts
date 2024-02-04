import { httpClient } from '@/api';
import { ApiErrorType } from '@/api/types/api-error.type';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { convertEmptyStringsToNull } from '@/common/utils/convert-empty-string-to-null';
import { LabWorkersType, AddOrEditLabWorkersType } from '../../types/lab-workers.types';

export const useEditLabWorkersMutation = (): UseMutationResult<
  AddOrEditLabWorkersType,
  ApiErrorType,
  LabWorkersType
> =>
  useMutation(async (body) => {
    const { _id, ...restBody } = body;

    const response = await httpClient.put<AddOrEditLabWorkersType>(
      `/lab-workers/${_id}`,
      convertEmptyStringsToNull(restBody),
    );
    return response.data;
  });
