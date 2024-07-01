import * as Yup from 'yup';

import { passwordRegex } from '../regex';

const PasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required('PasswordRequired')
    .matches(passwordRegex, 'PasswordStrengthError'),

  confirmPassword: Yup.string()
    .required('ConfirmPasswordRequired')
    .matches(passwordRegex, 'PasswordStrengthError')
    .oneOf([Yup.ref('password'), ''], 'PasswordNotMatching'),
});

export default PasswordValidationSchema;
