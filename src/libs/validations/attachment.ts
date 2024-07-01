import * as Yup from 'yup';

export const AttachmentSchema = Yup.object().shape({
  name: Yup.string(),
  type: Yup.string(),
  size: Yup.number(),
  key: Yup.string(),
});
