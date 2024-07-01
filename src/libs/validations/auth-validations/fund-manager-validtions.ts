import * as Yup from 'yup';

import { emailRegex, passwordRegex, phoneNumberRegex } from '../regex';

const FundManagerSignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .required('fullNameRequired' || ''),
  email: Yup.string()
    .trim()
    .required('EmailRequired' || '')
    .matches(emailRegex, 'EmailValid'),

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
  crNumber: Yup.string()
    .min(10, 'commercialRegNumberValidation')
    .max(10, 'commercialRegNumberValidation')
    .trim()
    .required('EnterCommercialNo'),
  confirmTermsAndConditions: Yup.boolean()
    .oneOf([true], 'continueAgreementTerms')
    .required(),
  agreeToPrivacyPolicy: Yup.boolean()
    .oneOf([true], 'privacyPolicyTerms')
    .required('privacyPolicyTerms'),
  otp: Yup.string().length(4).required('otpRequired'),
});

export type FundManagerSignupSchemaType = Yup.InferType<
  typeof FundManagerSignupSchema
>;

export { FundManagerSignupSchema };
