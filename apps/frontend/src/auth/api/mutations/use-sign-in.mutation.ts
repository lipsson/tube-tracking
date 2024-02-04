import { httpClient } from '@/api';
import { LoginCredentials } from '@/auth/types/auth.types';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { LoginUser } from '../dto/auth.dto';

export const useSignInMutation = (): UseMutationResult<LoginUser, Error, LoginCredentials> =>
  useMutation(async (body) => {
    const response = await httpClient.post<LoginUser>('/auth/login', body);

    return response.data;
  });
