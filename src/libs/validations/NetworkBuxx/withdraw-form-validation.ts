import * as Yup from 'yup';

const WithdrawValidationSchema = Yup.object().shape({
  gateway: Yup.string().trim(),
  accountNumber: Yup.string().trim(),
  amount: Yup.string().trim(),
  fullName: Yup.string().trim(),
  phone: Yup.string().trim(),
});

export default WithdrawValidationSchema;
