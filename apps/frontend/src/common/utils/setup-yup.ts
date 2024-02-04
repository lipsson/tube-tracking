import * as yup from 'yup';
import isEmail from 'validator/lib/isEmail';

declare module 'yup' {
  interface StringSchema {
    isValidEmail(message?: string): StringSchema;
    isValidPhone(message?: string): StringSchema;
  }
}

yup.addMethod<yup.StringSchema>(yup.string, 'isValidEmail', function (message: string) {
  return this.test('isValidEmail', message, function (value) {
    const { path, createError } = this;

    if (value && !isEmail(value)) {
      return createError({ path, message: message ?? 'Invalid email' });
    }

    return true;
  });
});

export { yup };
