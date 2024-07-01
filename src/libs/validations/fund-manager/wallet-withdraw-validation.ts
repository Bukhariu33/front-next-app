import * as Yup from 'yup';

export const WalletWithdrawRequestSchema = Yup.object().shape({
  amount: Yup.number()
    .positive('amountMustBePositive')
    .required('amountFieldIsRequired'),
});

export type WalletWithdrawRequestSchemaType = Yup.InferType<
  typeof WalletWithdrawRequestSchema
>;
