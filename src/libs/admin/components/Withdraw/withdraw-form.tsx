/* eslint-disable simple-import-sort/imports */
import { Card } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import Button from '@/libs/components/Base/Buttons/Button';
import Input from '@/libs/components/Base/inputs/input';
import SelectInput from '@/libs/components/Base/inputs/select-input';
import { axiosInternal } from '@/libs/configs/axios';
import { useMutation } from '@/libs/hooks/use-mutation';
import { useForms } from '@/libs/hooks/useForms';
import { getStatsDetailsQueryOptions } from '@/libs/services/user/user-stats';
import listUserWithdrawQueryOptions from '@/libs/services/user/withdraw/list';
import WithdrawValidationSchema from '@/libs/validations/NetworkBuxx/withdraw-form-validation';
import { useQuery } from '@tanstack/react-query';

type WithdrawUserFormProps = {
  type: 'update' | 'create';
  data?: any;
};

const WithdrawFormBody: FC<WithdrawUserFormProps> = ({ data, type }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  // const { user } = useUser();
  const { data: userStats } = useQuery(getStatsDetailsQueryOptions.details());

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      if (userStats?.totalBalance <= 0) {
        notifications.show({
          title: 'Error',
          message: 'Your withdrawal amount is not greater than 0.',
        });
      } else if (userStats?.totalBalance < values.amount) {
        notifications.show({
          title: 'Error',
          message: 'Your balance is not enough to withdraw this amount',
        });
      } else {
        // Valid withdrawal, proceed with the request
        await axiosInternal.post(`/user/withdraw/create-withdraw`, values);
      }
    },
    revalidateOnSettled: true,
    queryOptions: [listUserWithdrawQueryOptions],
    onSuccess: () => {
      notifications.show({
        title: t('success'),
        message: t('successModalMessage'),
      });
      router.push('/user/withdraw');
    },
  });

  const initialValues: any = {
    gateway: data ? data.gateway : '',
    amount: data ? data.amount : '',
    accountNumber: data ? data.accountNumber : '',
    fullName: data ? data.fullName : '',
    phone: data ? data.phone : '',
  };

  const formik = useForms({
    initialValues,
    validationSchema: WithdrawValidationSchema,
    enableReinitialize: true,
    onSubmit: mutateAsync,
  });

  return (
    <Card className="mt-[2rem] w-full rounded-2xl bg-white px-[1.5rem] py-[1.25rem] pb-[30px] shadow-sm">
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className=" grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            namespace="admin-common"
            label="fullName"
            placeholder="fullName"
            {...formik.getFieldProps('fullName')}
            {...(formik.errors.fullName &&
              formik.touched.fullName && {
                errorMessage: formik.errors.fullName as any,
              })}
          />
          <Input
            namespace="admin-common"
            label="phone"
            placeholder="phone"
            {...formik.getFieldProps('phone')}
            {...(formik.errors.phone &&
              formik.touched.phone && {
                errorMessage: formik.errors.phone as any,
              })}
          />
          <Input
            namespace="admin-common"
            label="accountNumber"
            placeholder="accountNumber"
            {...formik.getFieldProps('accountNumber')}
            {...(formik.errors.accountNumber &&
              formik.touched.accountNumber && {
                errorMessage: formik.errors.accountNumber as any,
              })}
          />
          <Input
            namespace="admin-common"
            label="amount"
            placeholder="amount"
            type="number"
            {...formik.getFieldProps('amount')}
            {...(formik.errors.amount &&
              formik.touched.amount && {
                errorMessage: formik.errors.amount as any,
              })}
          />
          <SelectInput
            data={[
              { label: 'Easypaisa', value: 'Easypaisa' },
              { label: 'Jazzcash', value: 'Jazzcash' },
              { label: 'HBL', value: 'HBL' },
            ]}
            namespace="admin-common"
            label="gateway"
            data-cy-input="gateway"
            placeholder="gateway"
            {...formik.getFieldProps('gateway')}
            onChange={value => {
              return formik.setFieldValue('gateway', value);
            }}
            className="min-w-[300px] flex-1"
            errorMessage={
              (formik?.touched?.gateway && formik?.errors.gateway) as string
            }
          />
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Button
            namespace="common"
            onClick={() => router.push('/user/withdraw')}
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

export default WithdrawFormBody;
