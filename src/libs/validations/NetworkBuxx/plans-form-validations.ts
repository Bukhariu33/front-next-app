import * as Yup from 'yup';

const PlansValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required('Required'),
  planPrice: Yup.string().trim().required('Required'),
  validity: Yup.string().trim(),
  dailyLimit: Yup.string().trim().required('Required'),
  allowedReferrals: Yup.string().trim().required('Required'),
  ads: Yup.string().trim(),
});

export default PlansValidationSchema;
