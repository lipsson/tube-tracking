import { TFunction } from 'react-i18next';
import { yup } from 'common/utils/setup-yup';
import { ApiErrorType, ErrorsValidation, FormErrorType, HandleValidationErrorsParams } from '../types/api-error.type';


export const isValidValidationError = (unknownError: unknown): unknownError is ErrorsValidation => {
  if (unknownError !== null && typeof unknownError === 'object') {
    return 'param' in unknownError && 'message' in unknownError;
  }

  return false;
};

const errorsDictionary: Record<string, string> = {
  'Unique database error': 'errors.validation.unique',
  'Invalid value': 'errors.validation.invalid_value',
  'User with given data already exists': 'errors.validation.unique',
};

const errorsValidationSchema = yup.array(
  yup.object({
    param: yup.string().required(),
    message: yup.string().required(),
    type: yup.string(),
  }),
);


export const generateErrorMessage = (error: ErrorsValidation, translation: TFunction): string => {
  const errorMessageFromDictionary = errorsDictionary[error.message];
  return errorMessageFromDictionary
    ? translation(errorMessageFromDictionary, {
      field: translation(`form.${error.param}`),
    })
    : translation(error.message);
};

export const generateGeneralErrorMessage = (error: ApiErrorType, fallbackErrorMessage: string): string => {
  return error?.response?.data.message ? `api_response.error.${error?.response?.data.message}` : fallbackErrorMessage;
};

export const convertApiErrorsToFormErrors = (
  errors: Array<ErrorsValidation>,
  translation: TFunction,
): FormErrorType[] => {
  return errors.map((error) => {
    const type = error?.type || 'manual';

    return { param: error.param, message: generateErrorMessage(error, translation), type };
  });
};

export const handleValidationErrors = async (params: HandleValidationErrorsParams) => {
  try {
    const isValidSchema = await errorsValidationSchema.isValid(params.errors);

    if (isValidSchema) {
      const formErrors = convertApiErrorsToFormErrors(params.errors, params.translation);

      formErrors.forEach(({ param, type, message }) => {
        params.setError(param, { message, type });
      });

      return;
    }

    params.onDifferentError(params.errors);
  } catch (e: unknown) {
    params.onDifferentError(e);
  }
};
