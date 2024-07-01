import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'next-i18next';

import Button from '@/libs/components/Base/Buttons/Button';
import DateInput from '@/libs/components/Base/inputs/date-input';
import TimeInput from '@/libs/components/Base/inputs/time-input';
import { axiosInternal } from '@/libs/configs/axios';
import { useMutation } from '@/libs/hooks/use-mutation';
import { useForms } from '@/libs/hooks/useForms';
import { getAdminFundDetailsQueryOptions } from '@/libs/services/admin/funds/fundDetails';
import listFundsQueryOptions from '@/libs/services/admin/funds/list-funds';
import type { PublishFundPayload } from '@/libs/types/interface/fund/base';
import FundPublishValidationSchema from '@/libs/validations/admin/fund-publish-form-validation';

interface FundPublishProps {
  fundId: string;
}

const FundPublish = ({ fundId }: FundPublishProps) => {
  const { t } = useTranslation(['common', 'fund']);
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (values: PublishFundPayload) => {
      await axiosInternal.patch(`/admin/funds/${fundId}/publish`, values);
    },
    revalidateOnSettled: true,
    queryOptions: [listFundsQueryOptions, getAdminFundDetailsQueryOptions],
    onSuccess: () => {
      notifications.show({
        title: t('success'),
        message: t('successModalMessage'),
      });
      modals.closeAll();
    },
  });

  const initialValues: PublishFundPayload = {
    startDate: '',
    startTime: '',
  };

  const formik = useForms({
    initialValues,
    validationSchema: FundPublishValidationSchema,
    onSubmit: mutateAsync,
  });

  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
      <div className=" grid grid-cols-1 gap-4 md:grid-cols-2">
        <DateInput
          namespace="fund"
          label="fundStartDate"
          placeholder="fundStartDate"
          {...formik.getFieldProps('startDate')}
          onChange={value => {
            return formik.setFieldValue('startDate', value);
          }}
          errorMessage={formik.errors.startDate as any}
        />
        <TimeInput
          namespace="fund"
          label="fundStartTime"
          placeholder="fundStartTime"
          {...formik.getFieldProps('startTime')}
          onChange={e => {
            const selectedTime = e.target.value;
            return formik.setFieldValue('startTime', selectedTime);
          }}
          {...(formik.errors.startTime &&
            formik.touched.startTime && {
              errorMessage: formik.errors.startTime as any,
            })}
        />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button
          namespace="common"
          onClick={() => modals.closeAll()}
          variant="outlined-black"
          text="cancel"
        />
        <Button
          namespace="fund"
          disabled={!formik.dirty}
          type="submit"
          text="publish"
          loading={isLoading}
        />
      </div>
    </form>
  );
};

export default FundPublish;
