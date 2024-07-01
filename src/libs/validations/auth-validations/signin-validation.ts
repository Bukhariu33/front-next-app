import * as Yup from 'yup';

import { emailRegex } from '../regex';

export const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required('EmailRequired' || '')
    .matches(emailRegex, 'EmailValid'),
  password: Yup.string().trim().required('PasswordRequired'),
  otp: Yup.string().trim().required(),
});

export type SigninSchemaType = Yup.InferType<typeof SigninSchema>;
