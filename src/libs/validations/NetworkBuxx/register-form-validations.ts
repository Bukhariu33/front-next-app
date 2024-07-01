import * as Yup from 'yup';

import { passwordRegex } from '../regex';

const UserValidationSchema = Yup.object().shape({
  name: Yup.string().trim(),
  email: Yup.string().trim(),
  role: Yup.string().trim(),
  password: Yup.string()
    .required('PasswordRequired')
    .matches(passwordRegex, 'PasswordStrengthError'),

  confirmPassword: Yup.string()
    .required('ConfirmPasswordRequired')
    .matches(passwordRegex, 'PasswordStrengthError')
    .oneOf([Yup.ref('password'), ''], 'PasswordNotMatching'),
});

export default UserValidationSchema;
