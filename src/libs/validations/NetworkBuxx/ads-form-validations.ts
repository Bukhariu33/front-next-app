import * as Yup from 'yup';

const AdsValidationSchema = Yup.object().shape({
  link: Yup.string().trim(),
  amount: Yup.string().trim(),
  duration: Yup.string().trim(),
});

export default AdsValidationSchema;
