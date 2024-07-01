import * as Yup from 'yup';

import { AttachmentSchema } from '../attachment';

const HelpAndSupportSchema = Yup.object().shape({
  title: Yup.string()
    .required('thisFieldIsRequired')
    .min(10, 'fieldLengthError'),
  category: Yup.string().required('thisFieldIsRequired'),
  message: Yup.string().required('thisFieldIsRequired'),
  attachments: Yup.array().required().of(AttachmentSchema),
});

const HelpAndSupportMessageSchema = Yup.object().shape({
  message: Yup.string().required('thisFieldIsRequired'),
  attachments: Yup.array().of(AttachmentSchema).nullable(),
});
export { HelpAndSupportMessageSchema, HelpAndSupportSchema };
