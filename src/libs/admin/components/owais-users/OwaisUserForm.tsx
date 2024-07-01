import { Card } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import Button from '@/libs/components/Base/Buttons/Button';
import Input from '@/libs/components/Base/inputs/input';
import PasswordInput from '@/libs/components/Base/inputs/password-input';
import PhoneNumberInput from '@/libs/components/Base/inputs/phone-number-input';
import SelectInput from '@/libs/components/Base/inputs/select-input';
import { axiosInternal } from '@/libs/configs/axios';
import { useMutation } from '@/libs/hooks/use-mutation';
import { useForms } from '@/libs/hooks/useForms';
import listOwaisUsersQueryOptions from '@/libs/services/admin/owais-users/list-owais-users';
import { getAdminUserRolesQueryOptions } from '@/libs/services/admin/roles/list-user-roles';
import type {
  OwaisUser,
  OwaisUserForm,
} from '@/libs/types/owais-users/owais-user';
import OwaisUserValidationSchema from '@/libs/validations/admin/owais-user-form-validations';

type OwaisUserFormProps = {
  type: 'update' | 'create';
  data?: OwaisUser;
};

const OwaisUserFormBody: FC<OwaisUserFormProps> = ({ data, type }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { data: aclRoles } = useQuery(getAdminUserRolesQueryOptions.details());
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (values: OwaisUserForm) => {
      if (type === 'update') {
        await axiosInternal.patch(
          `/admin/owais-users/${data?.id}/edit`,
          values,
        );
      } else {
        const requestData = {
          fullName: values.fullName,
          email: values.email,
          mobile: values.mobile,
          role: values.role,
          status: values.status,
          password: values.password,
        };

        await axiosInternal.post(`/admin/owais-users/create-user`, requestData);
      }
    },
    revalidateOnSettled: true,
    queryOptions: [listOwaisUsersQueryOptions],
    onSuccess: () => {
      notifications.show({
        title: t('success'),
        message: t('successModalMessage'),
      });
      router.push('/admin/owais-users');
    },
  });

  const initialValues: OwaisUserForm = {
    fullName: data ? data.fullName : '',
    email: data ? data.email : '',
    mobile: data ? data.mobile : '',
    role: data?.role ?? undefined,
    status: data?.status?.value ?? '',
    password: undefined,
  };

  const formik = useForms({
    initialValues,
    validationSchema: OwaisUserValidationSchema,
    enableReinitialize: true,
    onSubmit: mutateAsync,
  });

  return (
    <Card className="mt-[2rem] w-full rounded-2xl bg-white px-[1.5rem] py-[1.25rem] pb-[30px] shadow-sm">
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className=" grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            namespace="auth"
            label="fullName"
            placeholder="enterFullName"
            {...formik.getFieldProps('fullName')}
            {...(formik.errors.fullName &&
              formik.touched.fullName && {
                errorMessage: formik.errors.fullName as any,
              })}
          />
          <Input
            namespace="auth"
            label="email"
            placeholder="enterEmail"
            type="email"
            {...formik.getFieldProps('email')}
            {...(formik.errors.email &&
              formik.touched.email && {
                errorMessage: formik.errors.email as any,
              })}
          />
          <PhoneNumberInput
            namespace="auth"
            label="phoneNumber"
            placeholder="phoneNumberFormat"
            name="mobile"
            onChange={(value) => {
              formik.setFieldValue('mobile', value);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.mobile}
            {...(formik.errors.mobile &&
              formik.touched.mobile && {
                errorMessage: formik.errors.mobile as any,
              })}
          />

          <PasswordInput
            namespace="auth"
            label="password"
            placeholder="enterPassword"
            {...formik.getFieldProps('password')}
            {...(formik.errors.password &&
              formik.touched.password && {
                errorMessage: formik.errors.password as any,
              })}
          />
          <SelectInput
            namespace="admin-common"
            label="assignRole"
            placeholder="assignRole"
            data={aclRoles}
            classNames={{
              input: 'bg-white',
            }}
            name="role"
            onChange={e => {
              formik.setFieldValue('role', e);
            }}
            onBlur={_ => {
              formik.setFieldTouched('role', true);
            }}
            value={formik.values.role}
            {...(formik.errors.role &&
              formik.touched.role && {
                errorMessage: formik.errors.role as any,
              })}
          />
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <Button
            namespace="common"
            onClick={() => router.push('/admin/owais-users')}
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

export default OwaisUserFormBody;
