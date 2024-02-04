import { httpClient } from '@/api';
import { ApiErrorType } from '@/api/types/api-error.type';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { convertEmptyStringsToNull } from '@/common/utils/convert-empty-string-to-null';
import { AddOrEditSamplesType, SamplesType } from '../../types/samples.types';


export const useAddSamplesMutation = (): UseMutationResult<
  AddOrEditSamplesType,
  ApiErrorType,
  SamplesType
> =>
  useMutation(async (body) => {
    const response = await httpClient.post<AddOrEditSamplesType>(
      `/samples`,
      convertEmptyStringsToNull(body),
    );
    return response.data;
  });
