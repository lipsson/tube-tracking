import { httpClient } from '@/api';
import { ApiErrorType } from '@/api/types/api-error.type';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { convertEmptyStringsToNull } from '@/common/utils/convert-empty-string-to-null';
import { AddOrEditBuildingType, BuildingType } from '../../types/buildings.types';

export const useAddBuildingMutation = (): UseMutationResult<
  AddOrEditBuildingType,
  ApiErrorType,
  BuildingType
> =>
  useMutation(async (body) => {
    const response = await httpClient.put<AddOrEditBuildingType>(
      `/buildings`,
      convertEmptyStringsToNull(body),
    );
    return response.data;
  });
