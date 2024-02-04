import { AlertContextType } from '@/common/alert';
import { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';
import { TFunction } from 'react-i18next';

export type ErrorsValidation = {
  param: string;
  message: string;
  type?: string;
};

export type ApiErrorDataType = {
  validationErrors?: Array<ErrorsValidation>;
  errors?: Array<ErrorsValidation>;
  message?: string;
};

export type ApiErrorType = AxiosError<ApiErrorDataType>;

export type HandleValidationErrorsParams = {
  errors: Array<ErrorsValidation>;
  setError: UseFormSetError<any>;
  translation: TFunction;
  onDifferentError: (error: unknown) => void;
  showAlert: AlertContextType['showAlert'];
  type?: string;
};

export type FormErrorType = {
  param: string;
  message: string;
  type: string;
};


