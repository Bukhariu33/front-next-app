import * as Yup from 'yup';

import { emailRegex, passwordRegex, phoneNumberRegex } from '../regex';

const IndividualInvestorSignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .required('fullNameRequired' || ''),
  email: Yup.string()
    .trim()
    .required('EmailRequired' || '')
    .matches(emailRegex, 'EmailValid'),
  nationalId: Yup.string()
    .trim()
    .min(8, 'nationalIDTooLong')
    .max(10, 'nationalIDTooLong')
    .required('NationalIdRequired'),

  birthDate: Yup.date()
    .required('DoBRequired')
    .test('is-greater', 'youngUser', value => {
      const birthDate = new Date(value);

      const comparisonDate = new Date(2005, 0, 2);

      return birthDate <= comparisonDate;
    }),

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

  confirmTermsAndConditions: Yup.boolean()
    .oneOf([true], 'continueAgreementTerms')
    .required(),
  agreeToPrivacyPolicy: Yup.boolean()
    .oneOf([true], 'privacyPolicyTerms')
    .required('privacyPolicyTerms'),
  otp: Yup.string().length(4).required('otpRequired'),
});

export type IndividualInvestorSignupSchemaType = Yup.InferType<
  typeof IndividualInvestorSignupSchema
>;

export { IndividualInvestorSignupSchema };
