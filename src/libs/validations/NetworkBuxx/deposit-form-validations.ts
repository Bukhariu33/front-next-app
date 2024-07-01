import * as Yup from 'yup';

const DepositValidationSchema = Yup.object().shape({
  gateway: Yup.string().trim(),
  transactionId: Yup.string().trim(),
  amount: Yup.string().trim(),
    fullName: Yup.string().trim(),
  phone: Yup.string().trim(),
});

export default DepositValidationSchema;
