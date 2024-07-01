import type { ValidationError } from 'yup';
// this utility function is used to create an API error object from a yup validation error
export function createYupAPIError(error: ValidationError) {
  return {
    message: error.message,
    errors: [
      {
        property: error.path,
        constraints: { [error.path as string]: error.errors[0] },
      },
    ],
    status: 422,
  } as APIError;
}
