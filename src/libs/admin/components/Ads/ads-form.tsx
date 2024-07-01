/* eslint-disable simple-import-sort/imports */
import { Card } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import Button from '@/libs/components/Base/Buttons/Button';
import Input from '@/libs/components/Base/inputs/input';
import { axiosInternal } from '@/libs/configs/axios';
import { useMutation } from '@/libs/hooks/use-mutation';
import { useForms } from '@/libs/hooks/useForms';
import listAdminAdsQueryOptions from '@/libs/services/admin/fund-managers/list-managers';
import AdsValidationSchema from '@/libs/validations/NetworkBuxx/ads-form-validations';

type AdsUserFormProps = {
  type: 'update' | 'create';
  data?: any;
};

const AdsFormBody: FC<AdsUserFormProps> = ({ data, type }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      if (type === 'update') {
        // eslint-disable-next-line no-underscore-dangle
        await axiosInternal.put(`/admin/Ads/${data?._id}`, values);
      } else {
        const requestData = {
          link: values.link,
          amount: values.amount,
          duration: values.duration,
        };
        await axiosInternal.post(`/admin/Ads/create-ads`, requestData);
      }
    },
    revalidateOnSettled: true,
    queryOptions: [listAdminAdsQueryOptions],
    onSuccess: () => {
      notifications.show({
        title: t('success'),
        message: t('successModalMessage'),
      });
      router.push('/admin/ads');
    },
  });

  const initialValues: any = {
    link: data ? data.link : '',
    duration: data ? data.duration : '',
    amount: data ? data.amount : '',
  };

  const formik = useForms({
    initialValues,
    validationSchema: AdsValidationSchema,
    enableReinitialize: true,
    onSubmit: mutateAsync,
  });

  return (
    <Card className="mt-[2rem] w-full rounded-2xl bg-white px-[1.5rem] py-[1.25rem] pb-[30px] shadow-sm">
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className=" grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            namespace="common"
            label="link"
            placeholder="link"
            {...formik.getFieldProps('link')}
            {...(formik.errors.link &&
              formik.touched.link && {
                errorMessage: formik.errors.link as any,
              })}
          />
          <Input
            namespace="common"
            label="amount"
            placeholder="amount"
            type="number"
            {...formik.getFieldProps('amount')}
            {...(formik.errors.amount &&
              formik.touched.amount && {
                errorMessage: formik.errors.amount as any,
              })}
          />
          <Input
            namespace="common"
            label="duration"
            placeholder="duration"
            type="number"
            {...formik.getFieldProps('duration')}
            {...(formik.errors.duration &&
              formik.touched.duration && {
                errorMessage: formik.errors.duration as any,
              })}
          />
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Button
            namespace="common"
            onClick={() => router.push('/admin/ads')}
            variant="outlined-black"
            text="cancel"
          />
          <Button
            namespace="admin-common"
            disabled={!formik.dirty}
            type="submit"
            text={type}
            loading={isLoading}
          />
        </div>
      </form>
    </Card>
  );
};

export default AdsFormBody;
