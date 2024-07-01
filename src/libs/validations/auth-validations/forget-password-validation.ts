import * as Yup from 'yup';

import { passwordRegex, phoneNumberRegex } from '../regex';

export const ForgetPasswordSchema = Yup.object().shape({
  mobile: Yup.string()
    .trim()
    .required('PhoneRequired')
    .matches(phoneNumberRegex, 'phoneNumberNotValid'),
  password: Yup.string()
    .required('PasswordRequired')
    .matches(passwordRegex, 'PasswordStrengthError'),

  confirmPassword: Yup.string()
    .required('ConfirmPasswordRequired')
    .matches(passwordRegex, 'PasswordStrengthError')
    .oneOf([Yup.ref('password'), ''], 'PasswordNotMatching'),
  otp: Yup.string().length(4).required('otpRequired'),
});

export type ForgetPasswordSchemaType = Yup.InferType<
  typeof ForgetPasswordSchema
>;
