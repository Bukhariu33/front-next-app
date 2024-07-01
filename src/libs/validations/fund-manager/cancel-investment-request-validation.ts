import * as Yup from 'yup';

export const CancelInvestmentRequestSchema = Yup.object().shape({
  reasonOfCancellation: Yup.string().required('ReasonOfCancellationRequired'),
  reason: Yup.string().required('ReasonRequired'),
  quickResponse: Yup.string().optional(),
});

export type CancelInvestmentRequestSchemaType = Yup.InferType<
  typeof CancelInvestmentRequestSchema
>;
