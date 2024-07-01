import type { InferType } from 'yup';
import * as yup from 'yup';

import { passwordRegex } from '@/libs/validations/regex';

export const UpdateProfileSchema = yup.object({
  fullName: yup.string().required('thisFieldIsRequired'),
  jobTitle: yup.string().required('thisFieldIsRequired'),
  phoneNumber: yup.string().required('thisFieldIsRequired'),
  gender: yup.string().required('thisFieldIsRequired'),
  oldPassword: yup.string().matches(passwordRegex, 'PasswordStrengthError'),
  password: yup.string().when('oldPassword', {
    is: (oldPassword: string | null) => Boolean(oldPassword),
    then: schema =>
      schema
        .required('PasswordRequired')
        .matches(passwordRegex, 'PasswordStrengthError')
        .test(
          'not-same-as-old',
          'oldPasswordNotSameAsNew',
          (value, context) => {
            const { oldPassword } = context.parent;
            return oldPassword !== value;
          },
        ),
    otherwise: schema => schema.notRequired(),
  }),
  confirmPassword: yup.string().when('password', {
    is: (password: string | null) => Boolean(password),
    then: schema =>
      schema
        .required('ConfirmPasswordRequired')
        .matches(passwordRegex, 'PasswordStrengthError')
        .oneOf([yup.ref('password'), ''], 'PasswordNotMatching'),
    otherwise: schema => schema.notRequired(),
  }),
});

export type UpdateProfileSchemaType = InferType<typeof UpdateProfileSchema>;
