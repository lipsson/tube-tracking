import { httpClient } from '@/api';
import { ApiErrorType } from '@/api/types/api-error.type';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { convertEmptyStringsToNull } from '@/common/utils/convert-empty-string-to-null';
import { AddOrEditSamplesType, SamplesType } from '../../types/samples.types';


export const useEditSamplesMutation = (): UseMutationResult<
  AddOrEditSamplesType,
  ApiErrorType,
  SamplesType
> =>
  useMutation(async (body) => {
    const { _id, ...restBody } = body;

    const response = await httpClient.put<AddOrEditSamplesType>(
      `/samples/${_id}`,
      convertEmptyStringsToNull(restBody),
    );
    return response.data;
  });
