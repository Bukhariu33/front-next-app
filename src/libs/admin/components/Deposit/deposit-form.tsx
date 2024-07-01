/* eslint-disable simple-import-sort/imports */
import { Card, Text } from '@mantine/core';
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
import listUserDepositQueryOptions from '@/libs/services/user/deposit/list';
import DepositValidationSchema from '@/libs/validations/NetworkBuxx/deposit-form-validations';

type DepositsUserFormProps = {
  type: 'update' | 'create';
  data?: any;
};

const DepositFormBody: FC<DepositsUserFormProps> = ({ data, type }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      if (type === 'update') {
        // eslint-disable-next-line no-underscore-dangle
        await axiosInternal.put(`/user/deposits/${data?._id}`, values);
      } else {
        await axiosInternal.post(`/user/deposits/create-deposit`, values);
      }
    },
    revalidateOnSettled: true,
    queryOptions: [listUserDepositQueryOptions],
    onSuccess: () => {
      notifications.show({
        title: t('success'),
        message: t('successModalMessage'),
      });
      router.push('/user/deposit');
    },
  });

  const initialValues: any = {
    gateway: data ? data.gateway : '',
    amount: data ? data.amount : '',
    transactionId: data ? data.transactionId : '',
    fullName: data ? data.fullName : '',
    phone: data ? data.phone : '',
  };

  const formik = useForms({
    initialValues,
    validationSchema: DepositValidationSchema,
    enableReinitialize: true,
    onSubmit: mutateAsync,
  });

  return (
    <Card className="mt-[2rem] w-full rounded-2xl bg-white px-[1.5rem] py-[1.25rem] pb-[30px] shadow-sm">
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="col-span-1">
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
              label="transactionId"
              placeholder="transactionId"
              {...formik.getFieldProps('transactionId')}
              {...(formik.errors.transactionId &&
                formik.touched.transactionId && {
                  errorMessage: formik.errors.transactionId as any,
                })}
            />
          </div>
          <div className="col-span-1">
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
          </div>
          <div className="col-span-1">
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
          <div
            className="col-span-1"
            style={{
              background: '#ffa9a9',
              padding: '20px',
              borderRadius: '9px',
              color: '#000',
              cursor: 'pointer',
            }}
          >
            <Text>Deposit To:</Text>
            <Text>Account Name: Hafiza Tahira</Text>
            <Text>Bank: HBL</Text>
            <Text>Account Number: 23597000441603</Text>
            <Text>Easypaisa: 03049067323</Text>
            <Text>Jazzcash: 03049067323</Text>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Button
            namespace="common"
            onClick={() => router.push('/user/deposit')}
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

export default DepositFormBody;
