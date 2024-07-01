import * as Yup from 'yup';

const FundPublishValidationSchema = Yup.object().shape({
  startDate: Yup.string().required('thisFieldIsRequired'),
  startTime: Yup.string().required('thisFieldIsRequired'),
});

export default FundPublishValidationSchema;
