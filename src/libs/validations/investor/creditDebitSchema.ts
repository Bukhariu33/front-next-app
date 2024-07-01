import * as Yup from 'yup';

const CreditAndDebitSchema = Yup.object().shape({
  transactionType: Yup.string().required('thisFieldIsRequired'),
  amount: Yup.number().required('thisFieldIsRequired'),
  note: Yup.string().optional(),
});

export { CreditAndDebitSchema };
