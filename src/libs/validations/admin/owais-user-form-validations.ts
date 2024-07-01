import * as Yup from 'yup';

import { emailRegex, passwordRegex, phoneNumberRegex } from '../regex';

const OwaisUserValidationSchema = Yup.object().shape({
  fullName: Yup.string().trim(),
  email: Yup.string().trim().matches(emailRegex, 'EmailValid'),
  mobile: Yup.string().trim().matches(phoneNumberRegex, 'phoneNumberNotValid'),
  role: Yup.string(),
  status: Yup.string().oneOf(['active'], 'Invalid status'),
  password: Yup.string().matches(passwordRegex, 'PasswordStrengthError'),
});

export default OwaisUserValidationSchema;
